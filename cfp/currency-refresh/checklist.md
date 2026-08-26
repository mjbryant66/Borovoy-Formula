# Currency-Refresh Checklist

The Supervision Paradox paper explicitly names its own currency problem
("If you read this article in 2027 or later, it will need an update on this
front..."). Anything sent to a venue or regulator should have these claims
re-verified first — they are the paper's most perishable and most-cited
empirical anchors. Re-check each before any submission goes out; conference
cycles run 6–12 months and several of these move daily.

## Supervision Paradox

- [x] **Damien Charlotin AI Hallucination Cases Database count — CHECKED
  LIVE, Aug 26 2026: already stale.** Paper cites 1,348 worldwide / 915 US as
  of April 24, 2026. As of July 2, 2026 the count was **1,668** (1,163 US, 59
  UK) — up ~320 cases in ten weeks. **Update this figure in any abstract or
  letter before sending**, and re-check again immediately before submission
  since it's still growing daily.
- [ ] **Brigandi/Murphy sanctions figure.** Cited as "approximately $110,000"
  (D. Or., May 2026), described as the largest monetary sanction of its kind
  in the US as of that writing — not re-checked live this session; confirm
  it hasn't been superseded by a larger sanction, and confirm appeal status.
- [x] **SB 574 status — CHECKED LIVE, Aug 26 2026: time-critical, not just
  stale.** Passed the Senate 39-0 on Jan 29, 2026; referred to Assembly
  Privacy and Consumer Protection Committee (Chair: Asm. Rebecca
  Bauer-Kahan). The Assembly must act by **August 31, 2026** or the bill
  dies for this session. The paper's "still in the Assembly as of this
  writing" framing is accurate but will be wrong within days regardless of
  outcome — see `regulatory-comments/sb-574-assembly-letter.md`, drafted
  this session, for the time-sensitive response.
- [ ] **California State Bar Board of Trustees AI guidance (May 14, 2026).**
  Cited as approved for circulation, with proposed RPC amendments to Rules
  1.1, 1.4, 1.6, 3.3, 5.1, 5.3. Confirm whether the comment period is open,
  closed, or the amendments have since been adopted — this directly gates
  whether `regulatory-comments/california-state-bar-rpc-ai.md` is timely.
- [ ] **AI performance benchmark claims.** The "almost 20% improvement
  2024–2026" and GAIA/OSWorld benchmark figures (Stanford HAI AI Index
  Report 2026) — these move fast; if a venue meets in 2027, cite the 2027
  AI Index Report if it's out by submission time, not the 2026 edition.
- [ ] **VLAIR Legal Research comparison figures** (AI 74–78% vs. lawyer
  baseline 69%, and the multi-jurisdictional-question gap) — confirm no
  updated VLAIR round has superseded these numbers.
- [ ] **Denton County standing order** — confirm it hasn't been rescinded,
  amended, or superseded by a state-level rule (relevant given SB 574 and
  the RPC amendments moving in the same period).

## Borovoy Coefficient

- [ ] **MTM-L calibration figures** (AUC = 0.54, Brier = 0.23, 33-case
  ground-truth set, 15-statute prototype corpus) — these live in this
  repo's own `scored/` and `calibration/` outputs; re-run
  `scorer/calibrate.ts` if the corpus or ground-truth set has changed since
  v1.6, so any abstract cites the current numbers, not stale ones.
- [ ] **Hennessy & Goodhart (2023) and other ML-alignment citations** — low
  risk of going stale, but worth a citation-still-live check given how fast
  the alignment literature is moving.

## Process note

Before sending *any* file from `cfp/`, re-run this checklist for the paper in
question. The fastest way to do the Charlotin/SB 574/Board of Trustees checks
is a quick live web search immediately before sending — those three move on
a timescale of days to weeks, not the months between now and any of these
conference dates.
