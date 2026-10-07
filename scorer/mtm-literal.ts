#!/usr/bin/env bun
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { Command } from "commander";
import { StatuteInputSchema, ExtractionSchema, GEMINI_EXTRACTION_SCHEMA, type MTMLResult, type StatuteInput } from "./lib/schema.ts";
import { callGeminiJSON, MTM_L_EXTRACTION_PROMPT, stripCaseLaw, DEFAULT_MODEL } from "./lib/gemini.ts";
import { computeMTMLiteral, toResult } from "./lib/math.ts";
import { guardPublished } from "./lib/paths.ts";
import { corpusRowToInput, buildUserPrompt, groundProvisions, type InputSource, type StatuteText } from "./lib/corpus.ts";

const program = new Command();
program
  .name("mtm-literal")
  .description("Score a Canadian statute on the MTM-Literal tier")
  .option("-i, --input <path>", "path to statute input JSON")
  .option("-c, --corpus <path>", "path to corpus JSON (array); requires --id")
  .option("--id <id>", "law id within corpus to score")
  .option("--alpha <n>", "alpha weight", "0.5")
  .option("--beta <n>", "beta weight", "0.5")
  .option("--model <name>", "Gemini model", DEFAULT_MODEL)
  .option("-o, --out <path>", "write result JSON to file (else stdout)")
  .option("--no-strip", "disable case-law stripping")
  .option("--allow-no-text", "score a corpus law without corpus/statute-text/<id>.txt (model recalls sections; unreliable)", false)
  .option("--overwrite-published", "allow --out to point into scored/ or calibration/", false);

program.parse();
const opts = program.opts();

async function main() {
  if (opts.out) guardPublished(opts.out, opts.overwritePublished);
  let input: StatuteInput | undefined;
  let source: InputSource | "input_file" = "input_file";
  let statute: StatuteText | null = null;
  if (opts.input) {
    const raw = JSON.parse(readFileSync(resolve(opts.input), "utf8"));
    input = StatuteInputSchema.parse(raw);
  } else if (opts.corpus && opts.id) {
    const corpus = JSON.parse(readFileSync(resolve(opts.corpus), "utf8"));
    const laws = corpus.laws ?? corpus;
    const row = (laws as any[]).find((l) => l.id === opts.id);
    if (!row) throw new Error(`no law with id=${opts.id} in ${opts.corpus}`);
    ({ input, source, statute } = corpusRowToInput(row, opts.allowNoText));
  }
  if (!input) return program.error("Must provide --input PATH or --corpus PATH --id ID");

  const alpha = parseFloat(opts.alpha);
  const beta = parseFloat(opts.beta);

  const text = opts.strip === false ? input.text : stripCaseLaw(input.text);

  const userPrompt = buildUserPrompt(input, text);

  console.error(`[mtm-literal] scoring ${input.id} — ${input.law}`);
  const extraction = await callGeminiJSON({
    systemPrompt: MTM_L_EXTRACTION_PROMPT,
    userPrompt,
    responseSchema: GEMINI_EXTRACTION_SCHEMA,
    model: opts.model,
  });
  const parsed = ExtractionSchema.parse(extraction);

  const comp = computeMTMLiteral(parsed, alpha, beta);
  const result: MTMLResult = {
    ...toResult(input, parsed, comp, alpha, beta, opts.model),
    input_source: source,
    ...(statute ? { statute_text_sha256: statute.sha256, statute_text_source_url: statute.sourceUrl } : {}),
    grounding: groundProvisions(parsed.provisions, input.text),
  };
  if (result.grounding!.not_found) {
    console.error(`[mtm-literal] WARN ${result.grounding!.not_found} provision(s) not found in the input text: ${result.grounding!.not_found_ids.join(", ")}`);
  }

  const json = JSON.stringify(result, null, 2);
  if (opts.out) {
    mkdirSync(dirname(resolve(opts.out)), { recursive: true });
    writeFileSync(resolve(opts.out), json);
    console.error(`[mtm-literal] wrote ${opts.out}`);
    console.error(`[mtm-literal] MTM-L = ${result.mtm_l}  (F=${result.faithfulness}, X=${result.excess})`);
  } else {
    process.stdout.write(json + "\n");
  }
}

main().catch((err) => {
  console.error(`[mtm-literal] ERROR: ${(err as Error).message}`);
  process.exit(1);
});
