import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { repoPath } from "./paths.ts";
import { StatuteInputSchema, type StatuteInput } from "./schema.ts";

// Each corpus law reads its operative text from corpus/statute-text/<id>.txt, pulled from an
// official source at the point in time the corpus entry names. The file opens with a
// SOURCE_URL / VERSION / RETRIEVED / SCOPE / GAPS header, ended by a line holding only "---".
// Without the text the model recalls sections from memory, which is how v1.6 came to cite
// sections that say something else or do not exist.

export interface StatuteText {
  path: string;
  body: string;
  sourceUrl: string | null;
  sha256: string;
}

export function statuteTextPath(id: string): string {
  return repoPath("corpus", "statute-text", `${id}.txt`);
}

export function loadStatuteText(id: string): StatuteText | null {
  const path = statuteTextPath(id);
  if (!existsSync(path)) return null;
  const raw = readFileSync(path, "utf8").replace(/\r\n?/g, "\n");
  const end = raw.indexOf("\n---\n");
  const header = end >= 0 ? raw.slice(0, end) : "";
  const body = (end >= 0 ? raw.slice(end + 5) : raw).trim();
  if (!body) return null; // a header-only or empty file is not statute text
  const sourceUrl = header.match(/^SOURCE_URL:\s*(\S+)/m)?.[1] ?? null;
  return { path, body, sourceUrl, sha256: createHash("sha256").update(body).digest("hex") };
}

export type InputSource = "statute_text" | "evidence_quotes";

/**
 * Turns a corpus.json row into a StatuteInput. Uses the statute text when it exists; otherwise
 * refuses, unless allowNoText is set, in which case it falls back to the critics' evidence quotes
 * (the v1.6 behaviour) and the result is marked input_source = "evidence_quotes".
 */
export function corpusRowToInput(
  row: any,
  allowNoText: boolean,
): { input: StatuteInput; source: InputSource; statute: StatuteText | null } {
  const statute = loadStatuteText(row.id);
  if (!statute && !allowNoText) {
    throw new Error(
      `no statute text for ${row.id} at corpus/statute-text/${row.id}.txt. ` +
        `Add the operative text, or pass --allow-no-text to score from the evidence quotes ` +
        `(the model will then supply sections from memory, which is not reliable).`,
    );
  }
  const text = statute
    ? statute.body
    : row.evidence
      ? row.evidence.map((e: any) => e.quote).join("\n\n")
      : (row.purpose_stated ?? row.law);
  const input = StatuteInputSchema.parse({
    id: row.id,
    law: row.law,
    jurisdiction: row.jurisdiction,
    purpose_clause: row.purpose_stated,
    text,
  });
  return { input, source: statute ? "statute_text" : "evidence_quotes", statute };
}

export function buildUserPrompt(input: StatuteInput, text: string): string {
  return [
    `LAW: ${input.law}`,
    input.citation ? `CITATION: ${input.citation}` : "",
    `JURISDICTION: ${input.jurisdiction}`,
    input.short_title ? `SHORT TITLE: ${input.short_title}` : "",
    input.preamble ? `PREAMBLE:\n${input.preamble}` : "",
    input.purpose_clause ? `PURPOSE CLAUSE:\n${input.purpose_clause}` : "",
    `STATUTE TEXT:\n${text}`,
    `Extract purposes, operative provisions, and serves_matrix per the rules. Return JSON only.`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

export interface Grounding {
  verbatim: number;
  section_in_text: number;
  not_found: number;
  not_found_ids: string[];
}

const squash = (s: string) => s.toLowerCase().replace(/[^a-z0-9àâçéèêëîïôûùüÿœæ]+/g, "");

/**
 * Checks each extracted provision against the supplied text: its opening words appear verbatim,
 * or only its section number appears (a paraphrase), or neither (a likely invention). A provision
 * in not_found_ids should be read against the source before the score is relied on.
 */
export function groundProvisions(provisions: { id: string; text: string }[], body: string): Grounding {
  const sq = squash(body);
  const g: Grounding = { verbatim: 0, section_in_text: 0, not_found: 0, not_found_ids: [] };
  for (const p of provisions) {
    const probe = squash(p.text.replace(/\(from training data\)/i, "").replace(/\.\.\.|…/g, " ")).slice(0, 60);
    if (probe.length >= 20 && sq.includes(probe)) {
      g.verbatim++;
      continue;
    }
    // The section number must open a line (as section headings do) and must not run on into
    // more digits or a sub-number, so "30 days" cannot vouch for s.30 and "2.1" cannot vouch for s.2.
    const num = p.id.match(/[0-9]+(\.[0-9]+)*[A-Z]?/)?.[0];
    const esc = num?.replace(/\./g, "\\.");
    if (esc && new RegExp(`^\\s*(?:s\\.?\\s*|section\\s+|art\\.?\\s*|article\\s+|§\\s*)?${esc}(?![0-9]|\\.[0-9])`, "mi").test(body)) {
      g.section_in_text++;
    } else {
      g.not_found++;
      g.not_found_ids.push(p.id);
    }
  }
  return g;
}
