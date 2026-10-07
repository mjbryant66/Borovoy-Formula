#!/usr/bin/env bun
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { Command } from "commander";
import { ExtractionSchema, GEMINI_EXTRACTION_SCHEMA } from "./lib/schema.ts";
import { callGeminiJSON, MTM_L_EXTRACTION_PROMPT, stripCaseLaw, DEFAULT_MODEL } from "./lib/gemini.ts";
import { computeMTMLiteral, toResult } from "./lib/math.ts";
import { repoPath, guardPublished } from "./lib/paths.ts";
import { corpusRowToInput, buildUserPrompt, groundProvisions } from "./lib/corpus.ts";

const program = new Command();
program
  .option("-c, --corpus <path>", "corpus JSON", repoPath("corpus", "corpus.json"))
  .option("-o, --out <dir>", "output dir (fresh runs; the published record is scored/)", repoPath("runs", "scored"))
  .option("--alpha <n>", "alpha", "0.5")
  .option("--beta <n>", "beta", "0.5")
  .option("--model <name>", "Gemini model", DEFAULT_MODEL)
  .option("--skip-existing", "skip laws already scored", false)
  .option("--allow-no-text", "score laws that lack corpus/statute-text/<id>.txt from the evidence quotes (unreliable)", false)
  .option("--overwrite-published", "allow --out to point into scored/ or calibration/", false);
program.parse();
const opts = program.opts();

async function main() {
  const corpus = JSON.parse(readFileSync(resolve(opts.corpus), "utf8"));
  const laws: any[] = corpus.laws ?? corpus;
  const outDir = resolve(opts.out);
  guardPublished(outDir, opts.overwritePublished);
  mkdirSync(outDir, { recursive: true });
  const alpha = parseFloat(opts.alpha);
  const beta = parseFloat(opts.beta);

  const summary: { id: string; law: string; mtm_l: number; F: number; X: number; m: number; n: number }[] = [];

  for (const row of laws) {
    const outPath = `${outDir}/${row.id}.json`;
    if (opts.skipExisting && existsSync(outPath)) {
      const cached = JSON.parse(readFileSync(outPath, "utf8"));
      summary.push({
        id: cached.law_id,
        law: cached.law,
        mtm_l: cached.mtm_l,
        F: cached.faithfulness,
        X: cached.excess,
        m: cached.purposes.length,
        n: cached.provisions.length,
      });
      console.error(`[score-corpus] SKIP ${row.id} (cached: MTM-L=${cached.mtm_l})`);
      continue;
    }

    let prepared;
    try {
      prepared = corpusRowToInput(row, opts.allowNoText);
    } catch (err) {
      console.error(`[score-corpus]   SKIP ${row.id}: ${(err as Error).message}`);
      continue;
    }
    const { input, source, statute } = prepared;

    console.error(`[score-corpus] scoring ${input.id} — ${input.law}`);
    const text = stripCaseLaw(input.text);
    const userPrompt = buildUserPrompt(input, text);

    try {
      const raw = await callGeminiJSON({
        systemPrompt: MTM_L_EXTRACTION_PROMPT,
        userPrompt,
        responseSchema: GEMINI_EXTRACTION_SCHEMA,
        model: opts.model,
      });
      const extraction = ExtractionSchema.parse(raw);
      const comp = computeMTMLiteral(extraction, alpha, beta);
      const result = {
        ...toResult(input, extraction, comp, alpha, beta, opts.model),
        input_source: source,
        ...(statute ? { statute_text_sha256: statute.sha256, statute_text_source_url: statute.sourceUrl } : {}),
        grounding: groundProvisions(extraction.provisions, input.text),
      };
      if (result.grounding.not_found) console.error(`[score-corpus]   WARN ${input.id}: not in text: ${result.grounding.not_found_ids.join(", ")}`);
      writeFileSync(outPath, JSON.stringify(result, null, 2));
      summary.push({
        id: input.id,
        law: input.law,
        mtm_l: result.mtm_l,
        F: result.faithfulness,
        X: result.excess,
        m: extraction.purposes.length,
        n: extraction.provisions.length,
      });
      console.error(`[score-corpus]   → MTM-L=${result.mtm_l}  F=${result.faithfulness}  X=${result.excess}  m=${extraction.purposes.length} n=${extraction.provisions.length}`);
    } catch (err) {
      console.error(`[score-corpus]   ERROR on ${input.id}: ${(err as Error).message}`);
    }
  }

  writeFileSync(`${outDir}/_summary.json`, JSON.stringify(summary, null, 2));
  console.error(`\n[score-corpus] scored ${summary.length}/${laws.length}; summary at ${outDir}/_summary.json`);
  for (const r of summary) console.log(`  ${r.id.padEnd(8)} MTM-L=${String(r.mtm_l).padStart(6)}  F=${r.F.toFixed(3)}  X=${r.X.toFixed(3)}  ${r.law}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
