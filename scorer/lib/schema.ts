import { z } from "zod";

// ---------- Statute input ----------

export const StatuteInputSchema = z.object({
  id: z.string(),
  law: z.string(),
  jurisdiction: z.enum(["federal", "provincial", "municipal"]),
  citation: z.string().optional(),
  preamble: z.string().optional(),
  purpose_clause: z.string().optional(),
  short_title: z.string().optional(),
  text: z.string().describe("Full statute text or excerpt including operative provisions"),
});
export type StatuteInput = z.infer<typeof StatuteInputSchema>;

// ---------- Gemini extraction output ----------
// This is what Gemini returns — the structured facts, not the score.

export const ExtractionSchema = z.object({
  purposes: z.array(z.string()).min(1),
  provisions: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
    .min(1),
  serves_matrix: z.array(z.array(z.number().int().min(0).max(1))),
  notes: z.string().optional(),
});
export type Extraction = z.infer<typeof ExtractionSchema>;

// ---------- MTM-L score output ----------

export const MTMLResultSchema = z.object({
  law_id: z.string(),
  law: z.string(),
  tier: z.literal("MTM-L"),
  mtm_l: z.number().min(0).max(100),
  faithfulness: z.number().min(0).max(1),
  excess: z.number().min(0).max(1),
  alpha: z.number(),
  beta: z.number(),
  purposes: z.array(z.string()),
  provisions: z.array(z.object({ id: z.string(), text: z.string() })),
  serves_matrix: z.array(z.array(z.number().int().min(0).max(1))),
  derivation: z.string(),
  scored_at: z.string(),
  model: z.string(),
  version: z.literal("v1.0"),
});
export type MTMLResult = z.infer<typeof MTMLResultSchema>;

// ---------- Ground-truth ----------

export const GroundTruthRecordSchema = z.object({
  case_name: z.string(),
  citation: z.string(),
  statute: z.string(),
  provision: z.string(),
  disposition: z.enum(["struck", "read_down", "declared_invalid", "upheld", "upheld_on_appeal"]),
  year: z.number().int(),
  include_in_calibration: z.boolean().default(true),
  canlii_url: z.string().optional(),
  canlii_verified: z.boolean().optional(),
});
export type GroundTruthRecord = z.infer<typeof GroundTruthRecordSchema>;

// Map disposition to numeric outcome for calibration
export function dispositionToOutcome(d: GroundTruthRecord["disposition"]): number {
  switch (d) {
    case "struck":
    case "declared_invalid":
      return 1.0;
    case "read_down":
      return 0.5;
    case "upheld":
    case "upheld_on_appeal":
      return 0.0;
  }
}

// ---------- Gemini JSON schema (flat, no $ref — Gemini is picky) ----------

export const GEMINI_EXTRACTION_SCHEMA = {
  type: "object",
  properties: {
    purposes: {
      type: "array",
      items: { type: "string" },
      description:
        "Discrete purpose claims extracted from the preamble, purpose clause, or short title — verbatim where possible.",
    },
    provisions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string", description: "Section identifier, e.g. 's.5(1)' or 's.210'" },
          text: { type: "string", description: "Operative text of the provision, concise" },
        },
        required: ["id", "text"],
      },
      description:
        "Operative provisions (sections creating offences, duties, powers, rights). Exclude definitions, interpretation, coming-into-force, and amendments-to-other-acts.",
    },
    serves_matrix: {
      type: "array",
      items: {
        type: "array",
        items: { type: "integer", minimum: 0, maximum: 1 },
      },
      description:
        "Matrix[j][i] = 1 if provisions[j] plausibly advances purposes[i] on a plain reading; else 0. Rows = provisions, cols = purposes.",
    },
    notes: { type: "string", description: "Brief extraction notes if any" },
  },
  required: ["purposes", "provisions", "serves_matrix"],
};
