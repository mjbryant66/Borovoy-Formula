#!/usr/bin/env bun
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { Command } from "commander";
import { ExtractionSchema, GEMINI_EXTRACTION_SCHEMA, StatuteInputSchema } from "./lib/schema.ts";
import { callGeminiJSON, MTM_L_EXTRACTION_PROMPT, stripCaseLaw, DEFAULT_MODEL } from "./lib/gemini.ts";
import { computeMTMLiteral, toResult } from "./lib/math.ts";

const program = new Command();
program
  .option("-c, --corpus <path>", "corpus JSON", "../corpus/corpus.json")
  .option("-o, --out <dir>", "output dir", "../scored")
  .option("--alpha <n>", "alpha", "0.5")
  .option("--beta <n>", "beta", "0.5")
  .option("--model <name>", "Gemini model", DEFAULT_MODEL)
  .option("--skip-existing", "skip laws already scored", false);
program.parse();
const opts = program.opts();

async function main() {
  const corpus = JSON.parse(readFileSync(resolve(opts.corpus), "utf8"));
  const laws: any[] = corpus.laws ?? corpus;
  const outDir = resolve(opts.out);
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

    const input = StatuteInputSchema.parse({
      id: row.id,
      law: row.law,
      jurisdiction: row.jurisdiction,
      citation: row.law,
      purpose_clause: row.purpose_stated,
      text: row.evidence
        ? row.evidence.map((e: any) => e.quote).join("\n\n")
        : (row.purpose_stated ?? row.law),
    });

    console.error(`[score-corpus] scoring ${input.id} — ${input.law}`);
    const text = stripCaseLaw(input.text);
    const userPrompt = buildPrompt(input, text);

    try {
      const raw = await callGeminiJSON({
        systemPrompt: MTM_L_EXTRACTION_PROMPT,
        userPrompt,
        responseSchema: GEMINI_EXTRACTION_SCHEMA,
        model: opts.model,
      });
      const extraction = ExtractionSchema.parse(raw);
      const comp = computeMTMLiteral(extraction, alpha, beta);
      const result = toResult(input, extraction, comp, alpha, beta, opts.model);
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

function buildPrompt(input: any, text: string): string {
  return [
    `LAW: ${input.law}`,
    `JURISDICTION: ${input.jurisdiction}`,
    input.purpose_clause ? `STATED PURPOSE:\n${input.purpose_clause}` : "",
    `AVAILABLE TEXT:\n${text}`,
    `Extract purposes, operative provisions (from training data if input is thin), and serves_matrix. Return JSON only.`,
  ].filter(Boolean).join("\n\n");
}

main().catch((err) => { console.error(err); process.exit(1); });
