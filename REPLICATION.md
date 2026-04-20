# Replication Instructions

**How to score a new law with the Borovoy Coefficient (MTM-L, v1.0).**

This document describes the reproducibility protocol for the shipped tier of the instrument, MTM-L (Missing-The-Mark — Literal). MTM-F (Functional) and MTM-C (Contextual) are not yet implemented; see `README.md` for the three-tier roadmap.

---

## 1. What you will need

| Requirement | Why |
|---|---|
| **Bun** (v1.1+) | Runtime for the scorer CLI (`scorer/mtm-literal.ts`, `scorer/calibrate.ts`) |
| **A Google AI Studio API key** | Gemini does the structured extraction step (purposes, provisions, serves_matrix). The scoring math does not require an LLM. |
| **The statute text** | Preferably an authoritative source — CanLII, justice.gc.ca, CanLII federal office consolidations, legislation.gov.uk, or an official US code repository. Include the preamble, purpose clause (if present), and the operative provisions. Exclude schedules unless they contain operative duties, definitions unless they constitute offences, and coming-into-force provisions. |

Environment variable expected by the scorer:

```bash
export GOOGLE_API_KEY="<your key>"
# or place it in ~/.claude/.env — the scorer reads from both
```

---

## 2. Authoring a `corpus.json` entry

The scorer reads statutes from `corpus/corpus.json`. Append a new entry that validates against the `StatuteInputSchema` in `scorer/lib/schema.ts`:

```json
{
  "id": "fed-06",
  "law": "Hypothetical Act, SC 2026, c X",
  "jurisdiction": "federal",
  "citation": "SC 2026, c X",
  "short_title": "Hypothetical Act",
  "preamble": "WHEREAS Parliament is committed to … ; WHEREAS there is a need to … ;",
  "purpose_clause": "The purpose of this Act is to …",
  "text": "<full statute text or excerpt including the operative provisions>"
}
```

Rules:
- `id` must be unique and follow the convention `<jurisdiction>-<nn>` (e.g., `fed-06`, `prov-06`, `muni-06`, or `us-01`, `uk-01` if you're extending beyond Canada).
- `jurisdiction` must be one of `federal`, `provincial`, `municipal` in v1.0 (the US and UK enumeration is planned for v1.1).
- `text` is the field the extractor reads; it must include both the purposes (via preamble / purpose clause / short title) and the operative provisions.

---

## 3. Running the scorer on a single law

```bash
cd scorer
bun install   # first time only

bun mtm-literal.ts \
  --corpus ../corpus/corpus.json \
  --id fed-06 \
  --out ../scored/fed-06.json
```

Optional flags:

```bash
--alpha 0.5    # weight on (1 − F), Faithfulness penalty
--beta  0.5    # weight on X, Excess penalty
--model gemini-2.5-pro   # override the default extraction model
--temperature 0          # default; deterministic extraction
```

The output (`scored/fed-06.json`) is an `MTMLResult` per `scorer/lib/schema.ts`:

```json
{
  "law_id": "fed-06",
  "law": "Hypothetical Act, SC 2026, c X",
  "tier": "MTM-L",
  "mtm_l": 16.67,
  "faithfulness": 1.0,
  "excess": 0.3333,
  "alpha": 0.5,
  "beta": 0.5,
  "purposes": ["Purpose 1 extracted from preamble …", "Purpose 2 …"],
  "provisions": [{ "id": "s.2", "text": "…" }, { "id": "s.3", "text": "…" }],
  "serves_matrix": [[1, 0], [0, 1], [0, 0]],
  "derivation": "MTM-Literal derivation\n  m = |purposes| = 2\n  n = |provisions| = 3\n  …",
  "scored_at": "2026-04-19T11:00:00Z",
  "model": "gemini-2.5-pro",
  "version": "v1.0"
}
```

The `derivation` string is human-readable and reproduces the arithmetic step by step. Audit that string before reporting the score anywhere.

---

## 4. Running the whole corpus + calibration

```bash
cd scorer

# Score all laws in corpus/corpus.json → scored/*.json
bun score-corpus.ts

# Run retrospective calibration against corpus/ground-truth.json
bun calibrate.ts
```

The calibration pass:
1. Loads every `scored/*.json`.
2. Joins to the ground-truth disposition for each law (if present in `ground-truth.json`).
3. Maps disposition to numeric outcome: `struck | declared_invalid = 1.0`; `read_down = 0.5`; `upheld | upheld_on_appeal = 0.0`.
4. Computes AUC (binary `outcome ≥ 0.5` against continuous `MTM-L / 100`) and Brier score.
5. Fits α and β via gradient descent with L2 regularization; reports bootstrapped 95% CIs.
6. Writes `calibration/report.json` with the full reliability diagram and per-row detail.

Output (current v1.0 run, n = 15):

```
AUC  = 0.537
Brier = 0.2307
Fitted α = 0.4979 [95% CI 0.4931, 0.5005]
Fitted β = 0.5021 [95% CI 0.4995, 0.5069]
13/15 laws at MTM-L = 0 (floor)
```

This null result is reported openly in the paper (§V) and dashboard.

---

## 5. Sensitivity analysis — varying α, β

Because the scorer exposes α and β, you can run the same corpus under alternative weightings to check robustness. For example:

```bash
# Faithfulness-only (α = 1, β = 0) — penalize only un-served purposes
bun mtm-literal.ts --id fed-04 --alpha 1 --beta 0

# Excess-only (α = 0, β = 1) — penalize only provisions that track no purpose
bun mtm-literal.ts --id fed-04 --alpha 0 --beta 1
```

Under the default corpus, neither extreme yields signal distinguishable from chance — the literal pathology is simply not the dominant failure mode. MTM-F and MTM-C will change this picture.

---

## 6. Scoring a law via Anthropic API (optional)

If you want to avoid the Gemini dependency and use the Anthropic API instead, the extraction step can be reproduced via a structured tool call. The scoring math (`computeMTMLiteral` in `scorer/lib/math.ts`) is unchanged:

```ts
import Anthropic from "@anthropic-ai/sdk";
import { computeMTMLiteral } from "./lib/math";
import { ExtractionSchema } from "./lib/schema";

const client = new Anthropic();

const result = await client.messages.create({
  model: "claude-opus-4-7",
  max_tokens: 4096,
  system: `
You extract the structure of a statute for MTM-Literal scoring.
Return a JSON object with fields:
  purposes: string[]        (discrete purpose claims from preamble / purpose clause / short title)
  provisions: {id: string, text: string}[]  (operative sections only)
  serves_matrix: number[][]  (matrix[j][i] = 1 if provisions[j] plausibly advances purposes[i], else 0)
Row count = provisions.length; col count = purposes.length.
`,
  messages: [{ role: "user", content: statuteText }],
  tools: [/* structured extraction tool */]
});

const extraction = ExtractionSchema.parse(extractionFromToolCall);
const score = computeMTMLiteral(extraction, 0.5, 0.5);
console.log(score.derivation);
```

Weights (`alpha`, `beta`) stay client-side — the API is the extractor; your code is the math authority.

---

## 7. Adding a case to the ground-truth set

The calibration set lives in `corpus/ground-truth.json` and validates against `GroundTruthRecordSchema`. To add:

```json
{
  "case_name": "R v NewCase",
  "citation": "2026 SCC 12",
  "statute": "Hypothetical Act",
  "provision": "s.5",
  "disposition": "struck",
  "year": 2026,
  "include_in_calibration": true,
  "canlii_url": "https://canlii.ca/t/xxxxx",
  "canlii_verified": true
}
```

Dispositions are enumerated: `struck | read_down | declared_invalid | upheld | upheld_on_appeal`. The numeric outcome mapping lives in `dispositionToOutcome` in `scorer/lib/schema.ts`.

Run the ground-truth validator:

```bash
bun run scorer/ground-truth.ts
```

Then rerun calibration to see the impact:

```bash
bun run scorer/calibrate.ts
```

Commit the updated `calibration/report.json` alongside the data change so reviewers can see the diff.

---

## 8. Reproducibility checklist (for reviewers / citers)

Before quoting any MTM-L number in a publication:

- [ ] Confirm the exact statute text used (`corpus.json` entry hash, or attach the text to the publication's supplementary materials)
- [ ] Record the model version used for extraction (e.g., `gemini-2.5-pro-2025-05`)
- [ ] Record α and β (even if defaults — explicit is better than implicit)
- [ ] Record the `scored_at` timestamp
- [ ] Attach the `derivation` string — this is the paper trail
- [ ] If citing the calibration, quote the `calibration/report.json` version and n (= 15 at v1.0)

---

## 9. What MTM-L deliberately does not do

- **Predict strike-down.** AUC = 0.54 on the v1.0 calibration set makes clear that MTM-L alone is a poor predictor of Charter outcomes. It flags a narrow pathology (textual misalignment) that is not the dominant mechanism of Charter invalidation.
- **Model deference or presumption of constitutionality.** The instrument is bench-invariant by construction. A statute can score MTM-L = 100 and still be upheld under *Oakes* / rational basis / *Bank Mellat*. Conversely, a statute can score MTM-L = 0 and still be struck down on grounds the literal tier does not reach.
- **Assess s. 1 justification** (or its US / UK cognates). That is the job of MTM-C once it ships.
- **Declare a law "unconstitutional."** Only courts can do that. The bands in the paper (§V) describe *specification-failure severity*, not constitutional validity.

---

## 10. Questions / contact

- Issues: GitHub Issues (this repo)
- Paper: `paper/PAPER_v1.5.md`
- Live dashboard: **https://justack.ai/borovoy**
- Author: Michael Bryant — founder, justack.ai; former General Counsel and Executive Director, CCLA (2018–2022)
