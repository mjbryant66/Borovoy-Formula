# scorer — Missing the Mark CLI (v1.0)

Bun TypeScript scorer for MTM-Literal. Calls Gemini 2.5 Pro at temperature 0 with a structured response schema, then computes the published formula in TypeScript (no LLM-in-the-loop for math).

## Setup

```bash
bun install
```

Requires `GOOGLE_API_KEY` in `~/.claude/.env`.

## Commands

```bash
# Score a single law from corpus
bun mtm-literal.ts --corpus ../corpus/corpus.json --id fed-04 --out ../scored/fed-04.json

# Score a single law from a StatuteInput JSON file
bun mtm-literal.ts --input my-law.json

# Score all laws in the corpus (skips already-scored with --skip-existing)
bun score-corpus.ts
bun score-corpus.ts --skip-existing

# Generate canonical ground-truth.json (23 strikes + 11 upheld)
bun ground-truth.ts

# Retrospective calibration — AUC, Brier, fitted weights, HTML report
bun calibrate.ts
```

## Outputs

- `scored/{id}.json` — individual MTM-L scores with derivation
- `scored/_summary.json` — summary across corpus
- `calibration/report.json` — metrics + rows + interpretation
- `calibration/index.html` — single-file HTML report with SVG reliability diagram

## Formula

```
MTM-L = 100 · [ α · (1 − F) + β · X ]     α + β = 1, default α = β = 0.5

F = (1/m) · Σᵢ 𝟙[∃j: serves(sⱼ, pᵢ) = 1]        — Faithfulness
X = (1/n) · Σⱼ 𝟙[∀i: serves(sⱼ, pᵢ) = 0]        — Excess
```

See `../spec/MTM_FORMULAS.md` for full spec.

## License

MPL-2.0.
