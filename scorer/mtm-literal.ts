#!/usr/bin/env bun
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { Command } from "commander";
import { StatuteInputSchema, ExtractionSchema, GEMINI_EXTRACTION_SCHEMA, type MTMLResult } from "./lib/schema.ts";
import { callGeminiJSON, MTM_L_EXTRACTION_PROMPT, stripCaseLaw, DEFAULT_MODEL } from "./lib/gemini.ts";
import { computeMTMLiteral, toResult } from "./lib/math.ts";

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
  .option("--no-strip", "disable case-law stripping");

program.parse();
const opts = program.opts();

async function main() {
  let input;
  if (opts.input) {
    const raw = JSON.parse(readFileSync(resolve(opts.input), "utf8"));
    input = StatuteInputSchema.parse(raw);
  } else if (opts.corpus && opts.id) {
    const corpus = JSON.parse(readFileSync(resolve(opts.corpus), "utf8"));
    const laws = corpus.laws ?? corpus;
    const row = (laws as any[]).find((l) => l.id === opts.id);
    if (!row) throw new Error(`no law with id=${opts.id} in ${opts.corpus}`);
    // Corpus format has purpose_stated, law name, etc. — coerce to StatuteInput
    input = StatuteInputSchema.parse({
      id: row.id,
      law: row.law,
      jurisdiction: row.jurisdiction,
      purpose_clause: row.purpose_stated,
      text: row.evidence
        ? row.evidence.map((e: any) => e.quote).join("\n\n")
        : (row.purpose_stated ?? row.law),
    });
  } else {
    program.error("Must provide --input PATH or --corpus PATH --id ID");
  }

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
  const result: MTMLResult = toResult(input, parsed, comp, alpha, beta, opts.model);

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

function buildUserPrompt(input: typeof StatuteInputSchema._type, text: string): string {
  const parts = [
    `LAW: ${input.law}`,
    input.citation ? `CITATION: ${input.citation}` : "",
    `JURISDICTION: ${input.jurisdiction}`,
    input.short_title ? `SHORT TITLE: ${input.short_title}` : "",
    input.preamble ? `PREAMBLE:\n${input.preamble}` : "",
    input.purpose_clause ? `PURPOSE CLAUSE:\n${input.purpose_clause}` : "",
    `STATUTE TEXT:\n${text}`,
    `Extract purposes, operative provisions, and serves_matrix per the rules. Return JSON only.`,
  ].filter(Boolean);
  return parts.join("\n\n");
}

main().catch((err) => {
  console.error(`[mtm-literal] ERROR: ${(err as Error).message}`);
  process.exit(1);
});
