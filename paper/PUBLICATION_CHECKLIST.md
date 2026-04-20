# Borovoy Coefficient — Publication Checklist

**Paper:** *The Borovoy Coefficient: A Civil-Liberties Measure of Legislative Alignment* (v1.3)
**Date:** 2026-04-18
**Target venues (in order of preference):** Harvard Journal of Law & Technology (JOLT) → McGill Law Journal → Yale Journal on Regulation → parallel ACM FAccT 2026 workshop submission.

Beyond the paper (.md + .docx) itself, you will need the following artifacts.

---

## 1. Journal submission package (required)

| Artifact | Purpose | Status |
|----------|---------|--------|
| **Cover letter** (1 page) | Addressed to the Editor-in-Chief; explains why the paper fits the journal, novelty claim, and the multi-artifact release | TO DRAFT |
| **Standalone abstract** (~250 words) | Paper's current abstract is 350 words — trim to 250 for journal submission box | TO DRAFT |
| **Keywords** (5–7) | E.g.: *Goodhart's Law · AI alignment · civil liberties · overbreadth · Charter s 7 · legislative drift · measurement instrument* | TO SELECT |
| **Author bio** (~75–100 words) | For author-info page + SSRN | TO DRAFT |
| **Author affiliation + contact** | Justack.ai / former CCLA General Counsel; email | READY |
| **ORCID iD** | Required for most legal journals now | VERIFY YOU HAVE ONE |
| **Competing-interests statement** | Standard: author is founder of justack.ai which hosts the companion dashboard — disclose | TO DRAFT |
| **Funding statement** | If none, state "No external funding" | TO DRAFT |
| **Word count** | 9,869 (current body) — JOLT target 12–15k, McGill LJ 8–15k | ON TARGET |
| **Copyright / licensing statement** | Paper is released under MPL-2.0 but journals typically require author to assign first-publication rights while retaining CC-BY or similar; coordinate | TO NEGOTIATE |

## 2. Multi-artifact CS-style release (you already have most of this)

| Artifact | Location | Status |
|----------|----------|--------|
| Paper (.md + .docx) | `~/Desktop/Borovoy-Formula/paper/PAPER_v1.3.md` | ✅ READY |
| **Borovoy Coefficient Specification v1.0** | `BOROVOY_COEFFICIENT_SPEC.md` — referenced in paper | VERIFY EXISTS + VERSION-LOCKED |
| **Scored corpus JSON** (15 laws) | Companion dashboard backend | VERIFY JSON SCHEMA + REPRODUCIBILITY |
| **Reference implementation** | justack.ai/borovoy (static HTML + Chart.js dashboard) | ✅ LIVE |
| **MPL-2.0 LICENSE file** | Repo root | VERIFY PRESENT |
| **README / landing page** | Explains what each artifact is, how to cite, how to contribute | TO DRAFT |
| **Scoring prompt** (for LLM replication) | Part of the spec | VERIFY IN SPEC |
| **Replication instructions** | "How to score a new law with the Coefficient" | TO DRAFT |

## 3. Preprint + indexing (parallel to journal submission)

| Venue | Purpose | Timing |
|-------|---------|--------|
| **SSRN** (Legal Scholarship Network) | Gets the paper cited by legal scholars quickly; LFN, Public Law & Legal Theory, Law & Society abstracts eJournals | Post within 1 week of finalization |
| **arXiv cs.CY** (Computers & Society) + cs.AI | Gets the paper cited by AI safety / alignment researchers; pre-indexed by Google Scholar and Semantic Scholar | Same week as SSRN |
| **Harvard JOLT Digest** or **Jolt Notes** | Short-form pre-publication announcement | After journal acceptance |
| **Stanford HAI working paper series** | Citation-building among AI-governance community | Optional, post-SSRN |
| **Berkman Klein working paper series** | Citation-building among internet-law community | Optional, post-SSRN |

Target: **SSRN + arXiv within 7 days of v1.3 sign-off.**

## 4. Supplementary materials (optional but strengthen submission)

- **Research appendix** — the verified-citation memo at `~/Desktop/missing-the-mark-research/MEMO_VERIFIED.md`, polished into a "Supporting Citations" appendix. Shows reviewers the depth of the jurisdictional survey.
- **Methodology appendix** — the scoring rubric with the exact LLM prompt used, sampling parameters, and inter-model verification protocol. Satisfies reproducibility reviewers.
- **Worked example** — one full 15-dimension BC scoring with commentary (e.g., *R v Ndhlovu* 2022 SCC 38 as a fully worked BC = 68 example).

## 5. Outreach (after posting)

- **Noam Kolt** (Oxford AI Governance Institute, lead author of the *Legal Alignment for Safe and Ethical AI* paper you cite) — his citation graph shortcuts the Oxford/DeepMind conversation. Email introducing the paper as the Canadian/Charter version of his working-paper claim.
- **Hamish Stewart** (UofT Faculty of Law; author of "Overbreadth Revisited" 2024) — cite appreciation + invite to review; he's the natural first reviewer for the Canadian doctrinal portion.
- **Daniel E. Ho** (Stanford; senior author of the Guha et al. piece) — you're in direct dialogue with his paper; one-line outreach with PDF attached.
- **Colton Fehr** (Alta L Rev 2020 instrumental-rationality piece) — Canadian doctrinal interlocutor.
- **Alana Klein** (McGill; author of "The Arbitrariness in 'Arbitrariness'") — she raises the exact scorer-transparency critique you name in the Limitations.

## 6. Housekeeping before any submission

- [ ] Finalize the **competing-interests statement** (justack.ai / dashboard)
- [ ] Verify **ORCID iD** registered and linked
- [ ] Check **McGill Guide 9th ed** footnote formatting one more pass (subsequent citations should use *supra* note number rather than repeating full cite — see §7 below)
- [ ] Run **Word track-changes diff** from v1.1 to v1.3 if you want an audit trail before journal submission
- [ ] Decide whether to **host the paper PDF** at justack.ai/borovoy/paper.pdf or keep SSRN-exclusive during under-review period (most journals tolerate SSRN preprint; some object to self-hosted PDFs)

## 7. Open citation issues still to address (carried over from v1.3)

1. **Supra references** — McGill 9th ed prefers "*supra* note 14" (numeric) over "*supra* note on policy drift" (descriptive). Current paper uses descriptive because pandoc renumbers footnotes. Either (a) let pandoc auto-number and do a final manual pass to convert descriptive → numeric, or (b) keep descriptive (more robust to renumbering; some journals tolerate).
2. **Subsequent citations** — many footnotes (e.g., [^hackernote], [^ndhlovucs]) currently repeat short-form. McGill 9th prefers "*Hacker*, *supra* note 14." Mechanical cleanup pass needed.
3. **Case-citation consistency** — all "R. v." have been normalized to "R v" (McGill 9th); all "Canada (AG) v. Bedford" normalized to "Canada (AG) v Bedford." Verified 0 residual.
4. **Short journal forms** — "Yale Law Journal" → "Yale LJ", "McGill Law Journal" → "McGill LJ" throughout footnotes (first occurrence can use full name). Partially applied; consistency pass recommended before submission.
5. **Publication dates on scholarly papers** — all verified with ClaudeResearcher 2026-04-18; see `PAPER_v1.3_CITATION_AUDIT.md` for line-by-line record.

---

## Minimum-viable submission to SSRN (fastest path)

If you want to get indexed this week, the minimum is:

1. v1.3 .docx + cover letter (SSRN just wants the paper)
2. 250-word abstract
3. 5–7 keywords
4. JEL codes (for law-and-econ overlap): K10 (General), K23 (Regulated Industries and Administrative Law), K42 (Illegal Behavior and the Enforcement of Law), C63 (Computational Techniques)
5. Competing-interests + copyright OK box

SSRN upload time: ~20 min. Indexing: 3–7 business days.

---

*End of checklist. Delete sections as items are completed.*
