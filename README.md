# The Borovoy Coefficient — Missing the Mark

**A civil-liberties measure of legislative alignment**

*In honour of Alfred Alan Borovoy, O.C. (1932-2015), General Counsel, Canadian Civil Liberties Association 1968-2009 — whose insight that laws miss their mark this tool attempts to measure. The insight is his contribution to Canadian civil-liberties thought; the attribution is tribute, not appropriation.*

---

## What this is

A published method for measuring the gap between what a law promises and what it actually does, built on a three-tier analytical progression that mirrors how courts themselves reason. The instrument is cross-jurisdictional — designed to accept Canadian, US, and UK statutes — and is **bench-invariant by construction**: it measures drafting pathology, not judicial outcome. Whether a high-scoring law is actually struck down depends on the presumption of constitutionality, the Charter s. 1 (or Bank Mellat, or rational-basis) analysis, and the composition of the reviewing bench — none of which the instrument attempts to model.

| Tier | Question | Status | Formula |
|---|---|---|---|
| **MTM-Literal** | Does the statute's text, on its face, do what the preamble says? | ✅ **Live v1.0** | `MTM-L = 100·[α·(1−F) + β·X]` |
| **MTM-Figurative** | Does the statute still match when purpose is defined under the purposive test (Canada: *Big M* / *Sharpe* / *Khawaja*; US: rational basis with bite; UK: HRA s. 3 interpretive obligation)? | 🔜 v1.1 | `MTM-F = 100·[w₁·RC + w₂·OB + w₃·DE + w₄·PV]` |
| **MTM-Circumstantial** | Does it survive full contextual analysis (*Oakes* / strict scrutiny / *Bank Mellat* four-stage) with facts and evidence? | 🔜 v1.2+ | `MTM-C = 100·[γ₁·MTM-F/100 + γ₂·DI + γ₃·EF]` |

**All three formulas are published in `spec/MTM_FORMULAS.md`.** No black box. Anyone can see how we get from A to B.

## License — free, always

**Mozilla Public License 2.0.** The tool is free and will remain free regardless of future ownership decisions. Ownership structure will be revisited over time; the trajectory is more-open, not less. If licensing or ownership changes, they will only ever broaden use, never restrict it.

## What this folder contains

- **Published formulas** — [spec/MTM_FORMULAS.md](./spec/MTM_FORMULAS.md) — all three tiers with math, inputs, intermediate quantities, and a worked example
- **The paper** — [paper/PAPER_v1.5.md](./paper/PAPER_v1.5.md) — ~10,800 words; cross-jurisdictional (Canada / US / UK) bridge between Borovoy's fifty-year civil-liberties diagnosis and the AI-alignment literature
- **Original 5-dimension spec** — [spec/BOROVOY_COEFFICIENT_SPEC.md](./spec/BOROVOY_COEFFICIENT_SPEC.md) — superseded by `MTM_FORMULAS.md` but retained for reference
- **Scorer backend** — [scorer/](./scorer/) — Bun TypeScript CLI that calls Gemini to score laws on MTM-L
- **15-law prototype corpus** — [corpus/corpus.json](./corpus/corpus.json) — scored
- **Ground-truth set** — [corpus/ground-truth.json](./corpus/ground-truth.json) — 33 verified Charter dispositions, 1990–2024 (23 struck / read-down / declared invalid; 10 upheld)
- **Calibration report** — [calibration/index.html](./calibration/index.html) — AUC, Brier, reliability diagram, fitted weights
- **Dashboard** — [dashboard/index.html](./dashboard/index.html) — interactive visualization

## Running the scorer

```bash
cd scorer
bun install

# Score one law from the corpus
bun mtm-literal.ts --corpus ../corpus/corpus.json --id fed-04 --out ../scored/fed-04.json

# Score the entire corpus
bun score-corpus.ts

# Generate canonical ground-truth file
bun ground-truth.ts

# Run retrospective calibration (requires scored/ + ground-truth.json)
bun calibrate.ts
```

Requires `GOOGLE_API_KEY` in `~/.claude/.env` (Gemini 2.5 Pro at temperature 0).

## The MTM-L finding, honestly reported (v1.0, n=15 corpus, 33-case ground truth)

- **AUC = 0.54** — barely above chance
- **Brier = 0.23**
- **Fitted weights ≈ spec prior** — α ≈ 0.50, β ≈ 0.50 (no signal to update)
- **13 of 15 laws score MTM-L = 0** on face

**Interpretation:** MTM-Literal is a conservative, narrow test. Most Charter-invalid statutes are NOT struck because their text is literally misaligned with their preamble — they are struck because of purposive overbreadth, disproportionality, or rights intrusion. Those failure modes live in MTM-Figurative and MTM-Circumstantial, not MTM-Literal.

This is the v1.0 finding: MTM-L on its own is useful but low-power. Real predictive lift is expected to arrive with MTM-F (coming soon). We publish the null result because honesty is the price of scholarly credibility — and because the paper (v1.5) expressly warns against quantitative hallucination in LLM-assisted scholarship.

The **BC values quoted in the paper's Part VI case-study vignettes** (Security Certificates 86, SOIRA 68, Ontario Safe Streets Act 70, ACCA trilogy 72, *Romer v Evans* 74, *Belmarsh* 82, *Salvesen* 76) are **illustrative hand-scores** produced by the author prior to the MTM-F / MTM-C tiers being implemented. They communicate the instrument's intended behaviour when all three tiers are live. They will be replaced with automated, reproducible outputs once MTM-F and MTM-C ship. In the meantime, the dashboard and the `calibration/report.json` show the live MTM-L-only numbers.

## Attribution

The "laws miss their mark" insight is not proprietary. Borovoy advocated it through five decades of public testimony and published work. Multiple civil-liberties thinkers have expressed analogous ideas. Naming the tool after him is academic attribution — recognition of his public contribution — not exploitation of persona. A reader uncomfortable with the naming can treat this as **the Missing-the-Mark Coefficient**; the math is unchanged.

## Citation

Bryant, M. (2026). *The Borovoy Coefficient — Missing the Mark: A Published Method for Measuring Legislative Alignment*. Justack.ai. MPL-2.0.

## Version

- **v1.0** (2026-04-17) — MTM-Literal live; MTM-F + MTM-C specifications published.
- **v1.1** (2026-04-18) — research-integrated paper draft (Hennessy & Goodhart 2023 framing softened; *R v Ndhlovu* 2022 added; Stewart "Overbreadth Revisited" 2024 added; Fuller 1964 / Siegel 1996 / Kolt 2026 threaded in; attribution of "Borovoy's Law" metaphor made explicit).
- **v1.2** (2026-04-18) — 20 `[pai ...]` editorial markers resolved; Part VI restructured to cross-jurisdictional (3 CA + 2 US + 2 UK); math Unicode-ified; Appendix migrated to separate changes archive.
- **v1.3** (2026-04-18) — Chat Claude organizational pass: Section I alignment-primer material moved to Section II; cross-jurisdictional catalogues moved to Section III; Section VII A/B/C/D sub-sections added; Section IV Merton-defense opener removed; italicized "Misalignment arises…" pull-quote removed as redundant.
- **v1.4** (2026-04-18) — Michael hand-edits incorporated (abstract paragraph rewrite; seven Section I refinements). *Power-hoarding fallacy* removed as hallucinated. Section I error-rates paragraph compressed from 459 words + 8 footnotes to 145 words + 1 consolidated footnote. Five substantive citation corrections (Fehr publication status; Guha first-name; Hennessy first-name; Siegel title confusion; McGill 9th ed normalization throughout).
- **v1.5** (2026-04-19) — methodological honesty pass: §V rewritten to frame MTM-L as shipped and MTM-F / MTM-C as roadmap; presumption-of-constitutionality paragraph added; interpretation bands relabelled as specification-failure severity (dropping "Unconstitutional-by-design" as a label a scorer is not entitled to claim); calibration evidence (AUC 0.54 / Brier 0.23) reported in-paper; Part VI vignette BC numbers explicitly labelled as illustrative hand-scores pending automated rescoring.
