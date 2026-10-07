# scorer — Missing the Mark CLI (v1.0)

Bun TypeScript scorer for MTM-Literal. Calls Gemini 3.8 Flash at temperature 1.0 with a structured response schema, then computes the published formula in TypeScript (no LLM-in-the-loop for math).

## Setup

```bash
bun install
```

Set `GOOGLE_API_KEY` in your shell (`export GOOGLE_API_KEY="<your key>"`); the scorer also reads `~/.claude/.env` if it exists.

## Commands

```bash
# Score a single law from corpus
bun mtm-literal.ts --corpus ../corpus/corpus.json --id fed-04 --out ../runs/fed-04.json

# Score a single law from a StatuteInput JSON file
bun mtm-literal.ts --input my-law.json

# Score all laws in the corpus into runs/scored/ (skips already-scored with --skip-existing)
bun score-corpus.ts
bun score-corpus.ts --skip-existing

# Validate and write ground-truth.json (rewritten only if the records change)
bun ground-truth.ts

# Retrospective calibration of the published extractions — AUC, Brier, fitted weights, HTML report
bun calibrate.ts
# ... or of a fresh run
bun calibrate.ts --scored ../runs/scored
```

## Outputs

- `runs/scored/{id}.json` — individual MTM-L scores with derivation
- `runs/scored/_summary.json` — summary across corpus
- `runs/calibration/report.json` — metrics + rows + interpretation
- `runs/calibration/index.html` — single-file HTML report with SVG reliability diagram

`scored/` and `calibration/` at the repository root hold the published v1.6 record. The scripts refuse to write there unless you pass `--overwrite-published`. Default paths are anchored to the repository, so the commands work from `scorer/` or from the root.

## Formula

```
MTM-L = 100 · [ α · (1 − F) + β · X ]     α + β = 1, default α = β = 0.5

F = (1/m) · Σᵢ 𝟙[∃j: serves(sⱼ, pᵢ) = 1]        — Faithfulness
X = (1/n) · Σⱼ 𝟙[∀i: serves(sⱼ, pᵢ) = 0]        — Excess
```

See `../spec/MTM_FORMULAS.md` for full spec.

## License

MPL-2.0.
