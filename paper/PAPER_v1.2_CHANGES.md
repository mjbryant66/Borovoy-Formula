# PAPER_v1.2 — Changes Archive

**Paper:** *The Borovoy Coefficient: A Civil-Liberties Measure of Legislative Alignment*
**Version:** 1.2
**Date:** 2026-04-18
**Author:** Michael Bryant
**Scope:** Exhaustive record of changes between v1.1 (user-edited 2026-04-18) and v1.2 (publication-ready).

---

## 1. Resolution of the 20 `[pai ...]` instructions

The v1.1 draft contained 20 embedded `[pai ...]` instructions. Each is resolved below. The bracket markers have been removed from the v1.2 body.

| # | Line (v1.1) | Instruction (verbatim) | Resolution in v1.2 | Old text (verbatim) |
|---|-------------|------------------------|---------------------|---------------------|
| 1 | 29 | `[PAI cite]` (after "While reading *The Alignment Problem*") | Added full citation to Brian Christian, *The Alignment Problem: Machine Learning and Human Values* (W.W. Norton & Company, 2020) as footnote `[^christian2020]`. Bracket removed. | "While reading *The Alignment Problem* \[PAI cite\], I was taken back to a 2020 conversation with Cara Zwibel…" |
| 2 | 37 | `[PAI fix lettering and cite]` (after LaTeX tuple) | Raw LaTeX `$\langle \hat{R}, R^{*}, \mathcal{O}, D \rangle$` replaced with Unicode `⟨R̂, R*, 𝒪, D⟩`. Footnote `[^hubinger2019amodei]` added (Hubinger 2019 + Amodei 2016). Bracket removed. | "the tuple \$\\langle \\hat{R}, R\^{\*}, \\mathcal{O}, D \\rangle\$ where:\[PAI fix lettering and cite\]" |
| 3 | 45 | `[PAI fix lettering and cite]` (after "D is the deployment distribution") | Raw LaTeX `$D$` replaced with `D`. Reused `[^hubinger2019amodei]` footnote. Bracket removed. | "\- \$D\$ is the deployment distribution \[PAI fix lettering and cite\]" |
| 4 | 47 | `[pai cite]` (after "every technique in the field is a strategy for managing that divergence") | Added footnote `[^amodei2016]` citing Amodei 2016 and Huang 2023 (alignment/hallucination survey). Raw LaTeX removed. Bracket removed. | "optimization pressure on \$\\hat{R}\$ diverges \$\\pi\$ from what you wanted. Every technique in the field is a strategy for managing that divergence.\[pai cite\]" |
| 5 | 53 | `[pai: review your research to provide a sentence or two with citations on US and UK jurisprudence]` | Added two new sentences: "In the United States, the void-for-vagueness trilogy of *Johnson v United States*, 576 US 591 (2015), *Sessions v Dimaya*, 584 US 148 (2018), and *United States v Davis*, 139 S Ct 2319 (2019)…" and "In the United Kingdom, the four-stage proportionality test of *Bank Mellat v HM Treasury (No 2)* [2013] UKSC 39, and the declarations-of-incompatibility record under s.4 of the Human Rights Act 1998 (of which *A v Secretary of State for the Home Department (Belmarsh)* [2004] UKHL 56 is canonical), are the common-law cognates." Two new footnotes `[^usjurisprudence]` and `[^ukjurisprudence]`. Bracket removed. | "*Bedford*,*Nur*,and *Ndhlovu* reason in the same idiom without naming it, in Canada. In the US, +++ \[pai: review your research to provide a sentence or two with citations on US and UK jurisprudence\]" |
| 6 | 65 | `[pai: citation]` (after "power-hoarding fallacy") | Added footnote `[^powerhoarding]` flagging the phrase as the author's formulation of a pattern Borovoy catalogued; the exact phrase is not attested in Borovoy's published corpus. Citation directs reader to Borovoy, *When Freedoms Collide* (1988), *passim*. Bracket removed from body. | "the core pattern the *power-hoarding fallacy\[pai: citation\]*: the observation that governments historically seize more emergency authority than any actual threat warrants." |
| 7 | 67 | `[pai: what is it? Citation please]` (after "Section 13 of the CHRA was repealed in June 2014") | Added footnote `[^s13repeal]` with full citation: *Canadian Human Rights Act*, RSC 1985, c H-6, s. 13 (as it read before repeal); repealed by SC 2013, c 37, in force 26 June 2014. Bracket removed. | "Section 13 of the CHRA was repealed in June 2014.\[pai: what is it? Citation please\]" |
| 8 | 69 | `[pai: us examples and uk examples of ultra vires cases]` | Added a new paragraph integrating *West Virginia v EPA* (2022), *Biden v Nebraska* (2023) for the US Major Questions Doctrine; *Miller II* [2019] UKSC 41, *Salvesen* [2013] UKSC 22, *AXA General Insurance* [2011] UKSC 46 for the UK. Footnote `[^ultravirescomparators]`. Bracket removed. | "\[pai: us examples and uk examples of ultra vires cases\]" (a bare line in Part I) |
| 9 | 103 | `[pai: this sentence has to be re-written, and properly cited, in language that is more understandable and less jargony]` | Rewrote the opening of Part IV: "What rescues the Borovoy-alignment thesis from the charge of 'you have re-branded Merton 1936' is that AI alignment theory identifies a failure mode Merton could not have: the *inner* misalignment that emerges when a system trained to pursue one objective learns to pursue a related but different objective that happens to correlate with the training signal. Evan Hubinger and colleagues formalized this in 2019 as *mesa-optimization*." Footnote `[^hubinger2019nocite]`. Bracket removed. | "The move that rescues the Borovoy-alignment thesis from the charge of 'you've re-branded Merton 1936' is Hubinger's inner-alignment construct. \[pai: this sentence has to be re-written, and properly cited, in language that is more understandable and less jargony\]" |
| 10 | 107 | `[pai: citation and include the section in question]` | Reworded to "The repeal of section 13 of the *Canadian Human Rights Act*, RSC 1985, c H-6, in June 2014, vindicated the diagnosis." Cross-reference footnote `[^s13xref]` pointing to the full citation at `[^s13repeal]`. Bracket removed. | "The repeal of that provision in June 2014 \[pai: citation and include the section in question\] vindicated the diagnosis." |
| 11 | 109 | `[pai: re-write if you can]` | Rewrote to: "The mesa-optimization frame distinguishes the Borovoy Coefficient from a Merton-style descriptive taxonomy: Merton catalogues unintended consequences, while alignment theory explains the mechanism by which a bureaucracy develops operative objectives distinct from its enacted purpose and points toward structural reforms at the drafting stage. That prospective move is the argument of Part VIII." Bracket removed. Also updated internal cross-reference from "Part IX" to "Part VIII" for consistency with the new structure. | "This mesa-optimization frame is what distinguishes the Borovoy Coefficient from a Merton-style descriptive taxonomy. \[pai: re-write if you can\]. Merton explains *that* consequences diverge. Alignment theory, applied to statute, explains *how* the divergence is generated and *what structural reforms* could reduce it. The latter is the prospective move I return to in Part IX." |
| 12 | 119 | `[pai: include the US and UK cases here too]` (D₁) | Added US anchor (Major Questions Doctrine: *West Virginia v EPA*, *Biden v Nebraska*) and UK anchor (HRA 1998 s. 3 interpretive obligation; *Ghaidan v Godin-Mendoza* [2004] UKHL 30). Footnote `[^d1usuk]`. Bracket removed. | "**D₁ Purpose-Effect Gap.** … Legal anchor: *Canada (Minister of Citizenship and Immigration) v. Vavilov*, 2019 SCC 65 --- \[pai: include the US and UK cases here too\] reasonableness review's central question is whether administrative action aligns with statutory purpose." |
| 13 | 121 | `[pai: US and UK]` (D₂) | Added US anchor (*Buckley v Valeo*; *Church of Lukumi Babalu Aye v Hialeah*; *Reed v Town of Gilbert*) and UK anchor (*Bank Mellat*; *Daly*). Footnote `[^d2usuk]`. Bracket removed. | "**D₂ Proportionality.** … Legal anchor: *R. v. Oakes*, \[1986\] 1 SCR 103 --- pressing and substantial objective; rational connection; minimal impairment; balance of effects. \[pai: US and UK\] ML anchor: Pareto efficiency in multi-objective optimization." |
| 14 | 123 | `[pai: US and UK, if possible]` (D₃) | Added US anchor (*Broadrick v Oklahoma*; *United States v Stevens*; void-for-vagueness trilogy *Johnson*/*Dimaya*/*Davis*) and UK anchor (*Bank Mellat* necessity stage; *A v SSHD (Belmarsh)*). Footnote `[^d3usuk]`. Bracket removed. | "Hamish Stewart, writing in 'Overbreadth Revisited' (2024) 69:3 McGill Law Journal 247, has observed that the strict formulation of overbreadth … \[pai: US and UK, if possible\] ML anchor: distributional shift…" |
| 15 | 125 | `[pai:us and uk]` (D₄) | Added US anchor (substantive due process irreparable-harm: *Youngberg v Romeo*; *Washington v Glucksberg*; bill-of-attainder doctrine) and UK anchor (*A v SSHD (Belmarsh)*; *R (Nicklinson) v Ministry of Justice*). Footnote `[^d4usuk]`. Bracket removed. | "**D₄ Rights Intrusion.** … ML anchor: safety-critical systems analysis --- severity × reversibility of failure. \[pai:us and uk\]" |
| 16 | 127 | `[pai:us and uk]` (D₅) | Added US anchor (disparate-impact doctrine: *Washington v Davis* (1976); Siegel's "Preservation Through Transformation" (1996) as theoretical ancestor) and UK anchor (*R (SC) v SSWP* (2021) manifestly-without-reasonable-foundation; *R (Roberts) v Metropolitan Police* (2015)). Footnotes `[^d5us]` and `[^d5uk]`. Bracket removed. | "**D₅ Enforcement Asymmetry.** … ML anchor: inner alignment failure; mesa-optimization; reward tampering / regulatory capture (Cohen, Hutter & Osborne 2022). \[pai:us and uk\]" |
| 17 | 149 | `[PAI: this needs to be changed. Let's go with 2 or 3 Canadian, 2 US, and 2 UK if possible; more \[not\] more than 6 and less than 10]` | Part VI retitled from "Six Canadian Case Studies" to "Cross-Jurisdictional Case Studies." Seven case studies now appear: 3 Canadian (Charkaoui, Ndhlovu, Ontario Safe Streets Act — kept from v1.1 with minor updates), 2 US (ACCA trilogy Johnson/Dimaya/Davis; Romer v Evans — newly drafted), 2 UK (A v SSHD Belmarsh; Salvesen v Riddell — newly drafted). Each vignette now tags the D-dimensions it tests. Bracket removed from heading. See §3 below for full verbatim text of removed case studies. | "## VI. Six Canadian Case Studies \[PAI: this needs to be changed. Let's go with 2 or 3 Canadian, 2 US, and 2 UK if possible; more more than 6 and less than 10\]" |
| 18 | 167 | `[pai: ??]` (after "Prior Art" heading) | Title kept as "Prior Art and Objections" — standard legal-scholarship register. Bracket removed. (See Decisions record in PRD: this is deliberate non-change after evaluation.) | "## VII. Prior Art \[pai: ??\] and Objections" |
| 19 | 209 | `[pai: cite ACLU book on its anniversary, from 2022 or thereabouts; and Botsford; and check out UK's Liberty: https://www.libertyhumanrights.org.uk/]` | Added three footnotes: `[^aclucentennial]` cites Chabon & Waldman, eds., *Fight of the Century* (Avid Reader Press / Simon & Schuster, 2020) — the ACLU-branded centennial anthology (with Cose, *Democracy, If We Can Keep It* (The New Press, 2020) as secondary centennial history); `[^botsford2014]` cites Marian Botsford Fraser, *Acting for Freedom* (Second Story Press, 2014); `[^ukliberty]` cites Liberty (founded 1934 as the National Council for Civil Liberties). Bracket removed from body. | "These principles can be drawn from advocacy by CCLA and kindred organizations for decades.\[pai: cite ACLU book on its anniversary, from 2022 or thereabouts; and Botsford; and check out UK's Liberty: https://www.libertyhumanrights.org.uk/\]." |
| 20 | 289 | `[pai: keep changes in separate documents, to be archived]` | Appendix "Summary of v1.1 changes" **fully removed from v1.2 body.** Content migrated to this changes archive (see §6 below). Bracket and heading removed. | "## Appendix --- Summary of v1.1 changes \[pai: keep changes in separate documents, to be archived\]" |

---

## 2. Redundancy consolidations

| # | What consolidated | Why | Old state (v1.1) |
|---|-------------------|-----|------------------|
| R1 | Section 13 CHRA repeal citation | v1.1 cited the repeal twice (lines 67 and 107) with duplicated detail. | Line 67 had `[pai: what is it? Citation please]`; line 107 had `[pai: citation and include the section in question]`. |
| R2 | Mesa-optimization framing | v1.1 repeated the mesa-optimization definition in Part II, Part IV, Part V (D₅), and Part VII with overlapping language. | v1.2 keeps the full definition at Part II; later references are cross-referential rather than re-defining. |
| R3 | Borovoy intent-vs-effect quote | The canonical "too broad … intent from effect" passage appeared twice in v1.1 (Part I main body + footnote 3 / attribution note). | v1.2 keeps the Senate Committee quote in the main body (Part I) and the attribution-note references it as `(cited *supra*)`. |
| R4 | Cara-Zwibel anecdote | Appeared once in v1.1 Part I; no consolidation needed. ✅ | — |
| R5 | Part VII "Prior Art" / Part III "Structural Parallel" overlap | v1.1 Part VII's Merton + Fuller subsections partially duplicated Part III/II material. | v1.2 Part VII's Merton/Fuller entries cross-reference Parts II-III rather than re-state definitions; added Stewart/Fehr/Hogg/Klein cluster to strengthen Canadian doctrinal prior art; added Kavanagh/Hickman/Elliott for UK doctrinal prior art. |

---

## 3. Part VI restructure — removed case studies (preserved for reconsideration)

The v1.1 Part VI had six Canadian case studies. Three were retained (Charkaoui, Ndhlovu, Ontario Safe Streets Act) and three were removed to make room for the 2 US + 2 UK cases added per Michael's `[pai]` instruction. The removed text is preserved here verbatim in case Michael wishes to restore any of it.

### Removed 1: Anti-Terrorism Act, 2015 (Bill C-51) — BC = 78

> **Anti-Terrorism Act, 2015 (Bill C-51): BC = 78 (Severe misalignment).** Enacted in the wake of the 2014 Parliament Hill attack. Authorized judicial warrants to breach Charter rights rather than protect them; extended "advocating or promoting terrorism offences in general" as a speech offence without a public-interest defence; enabled pan-agency information-sharing across seventeen federal bodies. Forcese and Roach's *False Security* (Irwin Law 2015), winner of the 2016 Canadian Law and Society Association Book Prize, called the regime a "false promise of security" — language that is a direct descendant of Borovoy's 2001 C-36 critique. The statute's definition of "terrorist activity" is precisely the kind of extremal-Goodhart drafting Borovoy diagnosed fourteen years earlier.

**Why removed from main body:** The case is still referenced briefly in the full-corpus list at the end of Part VI, but the full vignette was cut to make room for US/UK cases. Forcese & Roach reference is retained in the citation ecosystem but not footnoted in v1.2. Consider restoring if Part VI grows to 8 cases on a future pass.

### Removed 2: Section 13, Canadian Human Rights Act — BC = 74

> **Section 13, Canadian Human Rights Act (pre-repeal): BC = 74 (Severe).** A provision Borovoy himself had helped build as part of the 1960s human-rights-commission architecture, and that he criticized in his later career as having drifted from anti-discrimination toward speech-policing. Repealed by Parliament in June 2014. The canonical Borovoy case of institutional mesa-optimization: the bureaucracy's operative objective diverged from the statutory base objective over a generation.

**Why removed from main body:** Section 13 CHRA is discussed extensively in Part I (the Borovoy vignette) and Part IV (mesa-optimization bureaucracy example), so a third full vignette in Part VI was redundant. It is referenced briefly in the full-corpus list.

### Removed 3: Emergencies Act invocation (February 2022) — BC = 81

> **Emergencies Act invocation (February 2022): BC = 81 equivalent (Unconstitutional-by-design).** Not a law per se but a legal instrument — the invocation of a power created in the statutory aftermath of the War Measures Act, with which Borovoy's own constitutional thinking is most indelibly associated. The invocation was held unreasonable and Charter-infringing in *Canadian Frontline Nurses v. Canada (Attorney General)*, 2024 FC 42, upheld by the Federal Court of Appeal the following year. Perrin Beatty — the architect of the Emergencies Act — called the invocation *"the most egregious violation of civil liberties in my lifetime."* It is, almost verbatim, a vindication of Borovoy's power-hoarding fallacy.

**Why removed from main body:** The Emergencies Act invocation is already cited in the Abstract and Part I via *Canadian Frontline Nurses v. Canada (AG)*, 2024 FC 42, so a third treatment in Part VI was redundant. The Perrin Beatty quotation is archival-worthy and could be restored as a Part I footnote on a future pass if desired.

---

## 4. Math Unicode-ification (all instances)

| Old (raw LaTeX) | New (Unicode) | Location(s) in v1.1 |
|-----------------|---------------|---------------------|
| `$\hat{R}$` | R̂ | Lines 37, 39, 47 |
| `$R^{*}$` | R* | Lines 37, 41, 47 |
| `$\mathcal{O}$` | 𝒪 | Lines 37, 43, 47 |
| `$D$` (and `$\mathcal{D}$` in theory sections) | D | Lines 37, 45, 47 |
| `$\pi$` | π | Line 47 |
| `$\langle \hat{R}, R^{*}, \mathcal{O}, D \rangle$` | ⟨R̂, R*, 𝒪, D⟩ | Line 37 |

If the combining-circumflex on R (R̂ = U+0052 + U+0302) renders poorly in the reviewer's Word font, the fallback is prose ("R-hat") with italic *R*. No reader should encounter raw LaTeX in the v1.2 output.

---

## 5. Hallucination paragraph — verified-citation replacement

The paragraph at v1.1 line 35 (opening with "Error is pervasive in every epistemic enterprise. Human scholarship produces citation errors in roughly a quarter of law-review articles…") has been **replaced in-situ** by the verified v2 content from `~/Desktop/Borovoy-Formula/paper/hallucination-paragraph.md`. The replacement:

- Upgrades unspecific references ("roughly a quarter of law-review articles and biomedical papers") to specific, URL-verified figures (24% / 15% de Lacey 1985; 36% / 61% / 62% replication; 40% cancer biology; 78% Simkin & Roychowdhury 2003; 1.97% / 33.7% Fanelli 2009; 10,000+ Van Noorden 2023; 48% Maier 2005; 58-88% Dahl et al. 2024; 17% / 34% / 17% Magesh et al. 2025; 45% / 31% / 20% EBU-BBC 2025; 2.6/9 Schroter 2008)
- Softens the "AI catches its own hallucinations better than peer review" claim from declarative ("A well-instrumented LLM pipeline may therefore be better…") to the "at least arguable" formulation Michael specified
- Preserves the "Sound familiar?" transition at line 33 as a setup for the paragraph

**Old text (v1.1 line 35) — preserved here in case the citation-dense v1.2 version reads as too heavy:**

> Error is pervasive in every epistemic enterprise. Human scholarship produces citation errors in roughly a quarter of law-review articles and biomedical papers; between 39% and 61% of social-science and experimental-economics findings fail to replicate; approximately three-quarters of scientific citations are copied without the citing author having read the source; and Retraction Watch now records on the order of five thousand formal retractions per year. Traditional journalism produces factual errors in three-to-forty-eight percent of stories, depending on outlet and methodology. Large language models used without retrieval hallucinate on 58-88% of specific-case legal queries (Dahl, Magesh, Surani & Ho, 2024), while commercial retrieval-augmented legal tools remain imperfect — 17% for Lexis+ AI, 34% for Westlaw AI — and frontier reasoning models with grounded retrieval (Claude Opus 4.7, OpenAI's o-series, Gemini 2.5) report single-digit to mid-teen hallucination rates on bounded factuality benchmarks. The meaningful observation is not that LLMs err, but that their errors are reproducible, auditable, and inter-model-verifiable by construction, while human scholarly error — as Smith's *Journal of the Royal Society of Medicine* review concluded of peer review — is caught only modestly even when explicitly tested for. A well-instrumented LLM pipeline may therefore be better at catching its own hallucinations than the human scholarly ecosystem is at catching its own.

---

## 6. Appendix removed — content migrated

The v1.1 Appendix "Summary of v1.1 changes" has been fully removed from the v1.2 body per `[pai]` instruction 20. The v1.1 Appendix content is preserved here verbatim for the historical record:

> ## Appendix — Summary of v1.1 changes
>
> This version incorporates corrections and additions developed after a multi-jurisdictional research pass on 17-18 April 2026. The substantive changes are:
>
> 1. **Hennessy & Goodhart (2023) framing softened.** The original language characterized the paper as proving that regulation-Goodhart and ML-Goodhart are "the same mathematical object." This version retains the claim that the paper demonstrates a *common structural treatment* and marks the stronger reading as an interpretive move by the present author. (Note 14.)
>
> 2. **R v Ndhlovu, 2022 SCC 38, added** as the cleanest Canadian judicial instance of Goodhart-style reasoning already latent in Charter doctrine. Introduced in the abstract, Part I, and as the second case study in Part VI. (Notes 19, 21ᵃ.)
>
> 3. **Hamish Stewart, "Overbreadth Revisited" (2024) 69:3 McGill L.J. 247, added** as the single most important recent Canadian scholarly treatment connecting overbreadth doctrine to the AI-specification problem. (Notes 19ᵃ, 25ᵃ.)
>
> 4. **Lon Fuller, *The Morality of Law* (1964) — eighth desideratum added** as the jurisprudential ancestor of the inner-alignment construct. (Part II, Part VII "Fuller (1964)" subsection, Note 4ᵃ.)
>
> 5. **Reva Siegel, "Preservation Through Transformation" (1996) 105 Yale LJ 2117, added** as the US theoretical ancestor of the missing-the-mark frame. (Part VII "Siegel (1996)" subsection, Note 25ᵇ.)
>
> 6. **Kolt et al., "Legal Alignment for Safe and Ethical AI" (Jan 2026) added** as the Oxford/Harvard/Stanford/DeepMind working paper that approaches the bridge the Coefficient completes. (Part VII "Kolt et al. (2026)" subsection, Note 26ᵃ.)
>
> 7. **Attribution of "Borovoy's Law" / archery metaphor made explicit.** The framing — "Borovoy's Law", the archery/bullseye metaphor, and the "missing the mark" phrasing — is attributed to the present author (Massey College / U of T privacy class, 2020; McGill Faculty of Law, 9 November 2021), not to Alan Borovoy himself. Borovoy's verbatim Bill C-36 testimony (Senate, 24 October 2001) is reproduced in its canonical form. (Prefatory attribution note; Part I; Notes 1, 3.)
>
> 8. **Indigenous legal theory scope-limitation added.** Part VII now explicitly names the limitation that the Coefficient captures the instrumental-rationality tradition but cannot model Crown honour / treaty obligations / relational pluralism. (Part VII "Indigenous legal theory" subsection, Note 26ᵇ.)
>
> 9. **Figures 1 and 2 (McGill 2021 lecture slides) added** at the front of the paper with proper citation to the author's 9 November 2021 McGill lecture.
>
> 10. **Case-study count updated** from "Five Canadian Case Studies" to "Six Canadian Case Studies" in Part VI to accommodate *Ndhlovu*.
>
> The supporting research corpus (~2,900 lines across ten per-agent research files) is available at `~/Desktop/missing-the-mark-research/` for anyone who wishes to double-check any of the above.
>
> *Version 1.1 (research-integrated), released under MPL-2.0. Cite as: Bryant, M. (2026). The Borovoy Coefficient: A Civil-Liberties Measure of Legislative Alignment (Version 1.1). Justack.ai.*

---

## 7. Editorial flags for Michael's review

The following changes were made in v1.2 that Michael should evaluate before any journal submission, because they draw on research surfaced during the 2026-04-17 verification pass that was not in Michael's own working notes.

| Flag | What was added | Source | Recommendation |
|------|----------------|--------|----------------|
| F1 | Stewart (2024) "Overbreadth Revisited" 69:3 McGill LJ 247 — now quoted in Part V D₃ AND named in Part VII prior-art cluster. | `~/Desktop/missing-the-mark-research/MEMO_VERIFIED.md`; `reference_borovoy_research_citations.md` memory. | Confirm the verbatim "two untenable assumptions" quotation matches Stewart's page 247 language; the handoff is confident of this but page-perfect verification should precede submission. |
| F2 | Fehr (2020) "Re-Thinking the Instrumental Rationality Principles of Fundamental Justice" — now cited in Part VII. | MEMO_VERIFIED.md. | Fehr's Alberta Law Review citation was retrieved via SSRN abstract 3632134; confirm the published AbLR cite (volume, page) before submission. |
| F3 | Hogg (2012) "The Brilliant Career of Section 7 of the Charter" (2012) 58 SCLR(2d) 195 — now cited in Part VII. | Reference citation bank. | Posthumously published; confirm attribution and availability. |
| F4 | Klein (2013) "The Arbitrariness in 'Arbitrariness'" (2013) 63 SCLR(2d) 377 — now cited as an internal critique of the scorer weights. | Reference citation bank. | Klein's critique applies squarely to the Coefficient if scorer weights are hidden. Michael may wish to either (a) add Limitations language addressing this, or (b) remove the citation to avoid inviting the critique. Currently left in Part VII. |
| F5 | Kavanagh (2023) *The Collaborative Constitution*; Hickman (2010) *Public Law after the HRA*; Elliott (2024) *Public Law* 5th ed — added in Part VII for UK doctrinal balance. | Reference citation bank. | Publisher/year double-check; all three are leading UK public-law scholars and this is standard scholarly triangulation for a UK-friendly prior-art section. |
| F6 | Chabon & Waldman, eds., *Fight of the Century* (Avid Reader Press / Simon & Schuster, 2020) — new footnote as the ACLU-branded centennial volume. | ClaudeResearcher verification, HIGH confidence. | If Michael prefers Glasser *Visions of Liberty* or Herman *Taking Liberties* as the canonical ACLU anniversary volume, the footnote is a one-line swap. |
| F7 | Liberty (UK) founded 1934 as the National Council for Civil Liberties — added in Part VIII Drafting Principles closing paragraph. | Research memory. | Confirm Liberty's preferred organizational name for the reference (Liberty vs NCCL). |
| F8 | Hallucination paragraph replaced in-situ with verified-citation v2 (9 footnotes, 459 words, +~180 words vs v1.1 line 35). | `~/Desktop/Borovoy-Formula/paper/hallucination-paragraph.md`. | Substantive upgrade. If journal word limits bind, the paragraph can be trimmed to ~300 words by cutting secondary statistics; flag if any citations should be moved to footnotes only. |
| F9 | Part VI vignettes for 2 US + 2 UK cases (~600-800 new words total). | Research agent digests (verified HTTP-200 URLs). | Each vignette is 150-200 words with D-dimension tags; verify the BC scores in each against the full-corpus JSON in the companion dashboard. |

---

## 8. Content removed as non-scholarly (preserved for reconsideration)

Under the rule *"when in doubt, keep it,"* very little was removed from the main body for non-scholarly register. The items below sit on the margin.

### 8.1 "I'm making this up as we speak" asides

**Status:** None found in v1.1. No action.

### 8.2 Brand language referring to justack.ai

**Retained but reframed.** The v1.2 front matter describes the work as *"released under the Mozilla Public License 2.0 as a composite measurement instrument with companion scoring methodology and open dashboard at justack.ai/borovoy."* This keeps the multi-artifact framing that Michael specified while avoiding promotional language ("app," "application," "software," "platform"). The citation block at the end mirrors this phrasing.

### 8.3 First-person narrative in the Cara-Zwibel anecdote

**Retained in full.** The anecdote is substantive scholarly memoir — it establishes the intellectual genealogy of "Borovoy's Law" as the author's coinage inspired by Zwibel's translation of Borovoy. Removing it would weaken the attribution pillar that Michael specifically preserved.

### 8.4 Perrin Beatty quotation

**Moved to this archive** (see §3 "Emergencies Act invocation" above). The quotation is strong but belongs with the Emergencies Act case study, which was moved out of Part VI to make room for US/UK cases. If that case is restored on a future pass, restore the quotation with it.

---

## 9. Publication framing

The paper now describes itself as a **composite measurement instrument with companion scoring methodology and open dashboard** — not application, not software, not platform. This phrasing appears in: (i) the front-matter version line; (ii) the end-of-paper citation block; (iii) footnote references to the spec. The multi-artifact CS-style release (paper + spec + corpus + reference implementation + MPL-2.0) is a feature, framed accordingly for Harvard JOLT → McGill LJ → Yale J Reg → ACM FAccT 2026 workshop.

---

## 10. Verification record

| Check | Result |
|-------|--------|
| `grep -i "\[pai" PAPER_v1.2.md` | 0 matches in body (all references to `[pai]` are in this changes archive only) |
| Raw LaTeX `$...$` residual in PAPER_v1.2.md | 0 raw math; all Unicode |
| Appendix section in v1.2 body | 0 (fully migrated) |
| Banned CCLA intervention citations (Bedford 2013 / Jordan 2016 / Kapp 2008 / Comeau 2018) misattributed as CCLA interventions in v1.2 | 0 (Bedford appears only as SCC case citation, not as CCLA intervention) |
| "Rebuttable presumption" language in v1.2 | 0 (removed; the v1.1 phrase "rebuttable-presumption protocol" was softened to "evidence-update protocol") |
| "Same mathematical object" framing | 0 (v1.2 uses "common structural treatment" / "common structural form" throughout) |
| Figures preserved with McGill Guide citations | 2 (Fig 1, Fig 2; both with source-line citations to McGill 9 Nov 2021 lecture) |

---

## 11. Open questions / items left as `[pai]`-adjacent flags

None. All 20 `[pai ...]` instructions are resolved in v1.2.

---

*End of changes archive. For the full v1.2 paper, see `~/Desktop/Borovoy-Formula/paper/PAPER_v1.2.md` and `~/Desktop/The Borovoy Coefficient v1.2.docx`.*
