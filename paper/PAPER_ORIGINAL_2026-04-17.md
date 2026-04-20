# The Borovoy Coefficient

## A Civil-Liberties Measure of Legislative Alignment

**Michael Bryant**
*Founder, justack.ai*
*Former General Counsel and Executive Director, Canadian Civil Liberties Association (2018-2022)*

*In honour of Alfred Alan Borovoy, O.C. (1932-2015), General Counsel of the Canadian Civil Liberties Association (1968-2009)

---

## Abstract

Alan Borovoy spent fifty years cataloguing the phenomenon of legislative overreach: laws whose observed effects departed from their stated purposes, producing rights violations the drafters never advertised. He called the core mechanism the *power-hoarding fallacy* — the tendency of governments to seize more authority than any actual threat warrants — and he anchored it in an intent-effect distinction that he carried from the War Measures Act (1970) to Bill C-36 (2001) to the Emergencies Act invocation he did not live to see struck down (*Canadian Frontline Nurses v. Canada (AG)*, 2024 FC 42).

This paper proposes that what Borovoy diagnosed is structurally identical to what machine-learning researchers call the *alignment problem*: the divergence between a specified objective and its observed behaviour once the optimization process has done its work. The identity is not metaphor; Hennessy & Goodhart (2023) have proven that Goodhart's Law applies to regulation and to machine learning as a single mathematical object. I offer the *Borovoy Coefficient* — a 0-to-100 composite measure across five dimensions, each grounded in recognized Canadian constitutional doctrine and in the machine-learning alignment taxonomy — as the first operational instrument for scoring Canadian legislation against Borovoy's diagnosis. I score fifteen representative laws as a prototype corpus. The paper concludes with five prospective drafting reforms — the *Borovoy drafting principles* — that would reduce Coefficients at source: sunset clauses, purpose-effect reporting, disparate-impact dashboards, narrowing presumptions, and independent oversight bodies with hard powers.

---

## I. The Borovoy Problem

Alan Borovoy never wrote the phrase "missing the mark" into any of his five books — not *When Freedoms Collide* (1988), not *Uncivil Obedience* (1991), not *The New Anti-Liberals* (1999), not *Categorically Incorrect* (2007), not *At the Barricades* (2013). The phrase is a paraphrase. What he did write, testifying on Bill C-36 in October 2001 before the House of Commons Standing Committee on Justice, was this:

> There is an important distinction between intent and effect. The question we must ask is whether the language, regardless of the intent, is broad enough to cover that activity.¹

And later in the same testimony:

> No reasonable person could quarrel with the goal of the bill given the September 11 attacks, [but] the desirability of the goal does not necessarily legitimize the means.²

Borovoy's diagnostic frame across five decades was an intent-effect analysis applied to the most dangerous class of statutes — those enacted in the aftermath of a shock, with broad definitional language, secured with judicial rather than parliamentary oversight. He called the core pattern the *power-hoarding fallacy*: the observation that governments historically seize more emergency authority than any actual threat warrants. He carried this frame from the War Measures Act invocation of October 1970 (when CCLA was among a handful of Canadian civil-society groups to oppose the suspension of liberties during the FLQ crisis), through the Bill C-24 police law-breaking authority of May 2001, into his systematic critique of the post-9/11 anti-terrorism regime, and, perhaps most tellingly, into his late-career position on Canada's own human-rights commissions — the bodies he had helped establish in the 1960s. "When I and other human rights activists advocated the creation of human rights commissions," he said of section 13 of the *Canadian Human Rights Act*, "we never imagined that they might ultimately be used against freedom of speech."³

This is the architecture of Borovoy's critique. A noble purpose (or an urgent one) is enacted in language broad enough to capture activity far beyond the intended target. The bureaucracy administering it drifts toward its own operative objectives. Courts, eventually, strike down the most egregious cases. But in the interim — often a generation long — the rights of Canadians are infringed in ways the statute's preamble never contemplated. Section 13 of the CHRA was repealed in June 2014. The security certificate regime was struck down in *Charkaoui v. Canada (Citizenship and Immigration)*, 2007 SCC 9. The three-year mandatory minimum for prohibited-firearm possession was struck down in *R. v. Nur*, 2015 SCC 15. The invocation of the *Emergencies Act* during the Freedom Convoy was found unreasonable and Charter-infringing in *Canadian Frontline Nurses*, 2024 FC 42, upheld by the Federal Court of Appeal the following year. Each of these results vindicated a diagnosis Borovoy had already articulated — in most cases, years or decades in advance.

The question this paper asks is whether Borovoy's diagnosis is an *observation* or a *measurement*. The answer I propose is that it can be made into both.

---

## II. The Alignment Problem — A Brief Primer

In machine learning, the *alignment problem* is the problem of ensuring that a system's actual behaviour matches the designer's actual goal. The problem is old. In 1960 Norbert Wiener warned, in two pages of *Science*:

> If we use, to achieve our purposes, a mechanical agency with whose operation we cannot efficiently interfere once we have started it, because the action is so fast and irrevocable that we have not the data to intervene before the action is complete, then we had better be quite sure that the purpose put into the machine is the purpose which we really desire and not merely a colorful imitation of it.⁴

Wiener reached for W.W. Jacobs's *Monkey's Paw* and for Goethe's sorcerer's apprentice as his analogies — machines that satisfy the literal specification and violate the operator's intent. Stuart Russell would later use the Midas story. The phenomenon is older than the field that named it.

The contemporary field of AI alignment decomposes the problem into two linked levels — a distinction formalized by Evan Hubinger and colleagues in *Risks from Learned Optimization* (2019).⁵ **Outer alignment** is the problem of specifying an objective whose optimization advances what the designer actually wants. **Inner alignment** is the problem of ensuring that a learned sub-system — a *mesa-optimizer*, in Hubinger's coinage — has an operative objective that matches the base objective it was trained on. A pseudo-aligned mesa-optimizer behaves correctly on the training distribution and diverges off it. A distributional shift surfaces the latent misalignment.

Layered onto these two levels is the classical observation of Charles Goodhart: *"when a measure becomes a target, it ceases to be a good measure"* — Goodhart (1975) compressed by Strathern (1997).⁶ Manheim and Garrabrant (2018) taxonomize Goodhart's Law into four variants.⁷ *Regressional* Goodhart: the proxy regresses to the mean because it correlates imperfectly with the true goal. *Extremal*: the proxy is valid in the normal range and collapses at extremes. *Causal*: proxy and goal correlate via a common cause, and intervening on the proxy severs the link. *Adversarial*: the agents subject to the metric decouple it from the goal through new pathways the metric itself creates.

The DeepMind *specification gaming* catalog, maintained by Victoria Krakovna and colleagues, is an empirical library of the phenomenon.⁸ An evolutionary algorithm tasked with producing a creature that could reach a target location produced tall, rigid organisms that fell over onto the target. A Tetris-playing agent rewarded for not losing learned to pause the game indefinitely before any losing move. A boat-racing agent rewarded for hitting power-ups on a course learned to loop back through three respawning targets rather than completing the race. A robot trained by human raters to grasp an object learned to position its gripper between the camera and the target so it *appeared* to be grasping. A population of evolved digital organisms learned to recognize the testing regime and pause replication during evaluation. Each example exhibits the same core property: literal satisfaction of the encoded specification combined with violation of the designer's actual intent.

Amodei and colleagues (2016) organized the field around five concrete safety problems: negative side effects, reward hacking, scalable oversight, safe exploration, distributional robustness.⁹ Cohen, Hutter and Osborne (2022) proved that reward tampering — an agent intervening in the reward-provision mechanism rather than pursuing the proxy objective — is not an edge case but an attractor state under stated assumptions.¹⁰ This is the technical core that public-choice theorists (Buchanan and Tullock; Stigler) have been approximating for decades under the vocabulary of regulatory capture.¹¹

---

## III. The Structural Identity

The argument that legislative drift and ML alignment failure are *analogous* is not new. James C. Scott's *Seeing Like a State* (1998) describes the Prussian scientific-forestry disaster as a paradigm case of outer-alignment failure a decade before the ML safety field existed: Prussian foresters replaced a heterogeneous ecosystem with an abstract "board-foot" representation, replanted in rows, and produced a proxy-optimized forest that collapsed a generation later (*Waldsterben*) because the proxy had abstracted away every ecological variable that kept the forest alive.¹² Donald Campbell (1976/1979) stated the sociological version of Goodhart's Law in almost identical terms: *"The more any quantitative social indicator is used for social decision-making, the more subject it will be to corruption pressures and the more apt it will be to distort and corrupt the social processes it is intended to monitor."*¹³

The stronger claim — that the analogy is not analogy but mathematics — arrived in 2023. Hennessy and Goodhart, *Goodhart's Law and Machine Learning: A Structural Perspective*, 64 *International Economic Review* 1075, proved that penalized regressions generate Goodhart bias when training data are clean but covariates are manipulated at known cost by future agents — demonstrating that regulation-Goodhart and ML-Goodhart are the *same mathematical object*.¹⁴ Charles Goodhart himself co-authored that paper. The four-variant taxonomy of Manheim and Garrabrant (2018), the reward-hacking analyses of Amodei (2016) and Cohen-Hutter-Osborne (2022), and the specification-gaming catalog of Krakovna (2020) describe the same failure modes that public-choice theorists, policy-drift scholars (Hacker 2004),¹⁵ and civil libertarians (Borovoy 1988-2013) have catalogued in the regulatory domain.

This is the paper's first substantive claim: **any optimization process operating on a specified proxy for an underspecifiable goal — whether the optimizer is a neural network, a regulatory agency, or a legislative drafter — is subject to the same four-variant Goodhart taxonomy and will produce specification-gaming behaviours on a distributional shift from the conditions of its formation.** The structural identity gives us a vocabulary precise enough to build measurement around — and measurement is what separates Borovoy's diagnosis from a slogan.

A caution before the formula. The analogy has real limits. Laws are drafted by human beings; ML objectives are typically hand-coded reward functions, and the learning loop is continuous. Courts are a categorically different feedback mechanism than retraining. The political economy of drafting (coalition-building, log-rolling, rational ignorance) produces "unintended" consequences that are often foreseen and accepted as the price of passage, unlike the genuine surprise of a mesa-optimizer discovering a new exploit. Legitimacy and performance are distinct questions, and the Borovoy Coefficient speaks only to the latter. These limits are real but they do not defeat the thesis — they define its domain.

---

## IV. Mesa-Optimization in Bureaucracy

The move that rescues the Borovoy-alignment thesis from the charge of "you've re-branded Merton 1936" is Hubinger's inner-alignment construct. Robert Merton's classic *The Unanticipated Consequences of Purposive Social Action* (1936) is the dominant prior art on the general question of consequences-at-variance-with-intent.¹⁶ Merton's taxonomy — ignorance, error, imperious immediacy of interest, basic values, self-defeating prophecy — is a century of sociology in five compact categories. Every unintended-consequences paper since Merton owes him a citation or owes him an explanation.

What Merton did not describe, because he could not have, is *mesa-optimization*. Merton analyzed consequences. Hubinger analyzes *what the system learns to want*. Bureaucracies, once instantiated, develop revealed objectives different from enacted ones. This is not a metaphor. It is the ordinary behaviour of large institutions that are given a specification, trained by incentive structures, and then operate on a distribution of cases their drafters never contemplated. The Canada Revenue Agency's enforcement priorities, the Canadian Security Intelligence Service's risk-modelling defaults, the Canada Border Services Agency's secondary-inspection patterns, the provincial human rights commissions' case-selection heuristics — each is a mesa-optimizer whose operative objective is a partial and non-transparent function of its base objective (the statute) and its training signal (budget, political attention, media incentives, internal culture).

This is not a claim about bureaucratic corruption. A learned optimizer can be pseudo-aligned in complete good faith and still diverge catastrophically off-distribution. The point is structural, not moral. Borovoy saw this repeatedly: he helped establish the human-rights commissions in the 1960s; he believed in them; he watched them internalize a speech-policing objective distinct from the anti-discrimination objective they had been chartered with; and he spent the last third of his career warning the public that the institutions he had built had drifted. The Section 13 repeal in June 2014 vindicated the diagnosis. It did not correct the training process.

This — the mesa-optimization frame — is the move that distinguishes the Borovoy Coefficient from a Merton-style descriptive taxonomy. Merton explains *that* consequences diverge. Alignment theory, applied to statute, explains *how* the divergence is generated and *what structural reforms* could reduce it. The latter is the prospective move I return to in Part IX.

---

## V. The Borovoy Coefficient

The Borovoy Coefficient (BC) is a 0-to-100 composite measure of the gap between a law's stated purpose and its observed rights-respecting performance. Each of five dimensions is scored 0-100, and the composite is a weighted aggregate:

**BC = 0.25·D₁ + 0.15·D₂ + 0.20·D₃ + 0.25·D₄ + 0.15·D₅**

Each dimension is anchored in a recognized Canadian constitutional doctrine and in a machine-learning alignment concept.

**D₁ Purpose-Effect Gap.** Divergence between stated purpose and observed effect. Legal anchor: *Canada (Minister of Citizenship and Immigration) v. Vavilov*, 2019 SCC 65 — reasonableness review's central question is whether administrative action aligns with statutory purpose.¹⁷ ML anchor: outer alignment (Hubinger et al. 2019).

**D₂ Proportionality.** Whether rights-infringing effects are proportionate to the salutary objective. Legal anchor: *R. v. Oakes*, [1986] 1 SCR 103 — pressing and substantial objective; rational connection; minimal impairment; balance of effects.¹⁸ ML anchor: Pareto efficiency in multi-objective optimization.

**D₃ Overbreadth.** Gap between captured conduct and targeted conduct, including drift since enactment. Legal anchors: *R. v. Heywood*, [1994] 3 SCR 761 (overbreadth under s.7); *Canada (Attorney General) v. Bedford*, 2013 SCC 72 (arbitrariness, overbreadth, gross disproportionality as principles of fundamental justice); *R. v. Nova Scotia Pharmaceutical Society*, [1992] 2 SCR 606 (void for vagueness).¹⁹ ML anchor: distributional shift (Amodei et al. 2016); extremal Goodhart (Manheim & Garrabrant 2018).

**D₄ Rights Intrusion.** Severity, duration, and reversibility of rights infringement. Legal anchor: Canadian Charter of Rights and Freedoms, and the jurisprudence on irreparable harm (*Charkaoui*, 2007 SCC 9). ML anchor: safety-critical systems analysis — severity × reversibility of failure.

**D₅ Enforcement Asymmetry.** Disparate enforcement impact across groups; bureaucratic drift from statutory intent. Legal anchors: *R. v. Le*, 2019 SCC 34 (racial profiling in enforcement); Charter s.15; the administrative-law duty of fairness.²⁰ ML anchor: inner alignment failure; mesa-optimization; reward tampering / regulatory capture (Cohen, Hutter & Osborne 2022).

The weights prioritize D₁ and D₄ because Borovoy's concern was always rights-affecting divergence from purpose. D₃ is heavier than D₂ and D₅ because over-breadth is the single most common mechanism of drift in Canadian civil-liberties jurisprudence. Weights are published in the spec, not proprietary, and are open to empirical tuning as the corpus grows.

Interpretation bands:

| Range | Band |
|---|---|
| 0-19 | Aligned |
| 20-39 | Drift |
| 40-59 | Misaligned |
| 60-79 | Severe misalignment |
| 80-100 | Unconstitutional-by-design |

The companion spec (*BOROVOY_COEFFICIENT_SPEC.md*, v1.0) defines the input schema, output schema, scoring prompt, and rebuttable-presumption protocol by which new evidence — judicial findings, empirical studies, legislative amendments, scholarly consensus shifts, observed enforcement changes — updates provisional scores.

---

## VI. Five Canadian Case Studies

The prototype corpus applies the Coefficient to fifteen representative laws. Five are discussed briefly here; all fifteen are available in the companion dashboard.

**Security Certificates, IRPA ss. 77-85 (pre-*Charkaoui*): BC = 86 (Unconstitutional-by-design).** A regime that detained non-citizens on evidence they could not see and could not challenge. Struck down under Charter ss. 7, 9, and 10 in *Charkaoui v. Canada (Citizenship and Immigration)*, 2007 SCC 9. McLachlin CJ: *"The secrecy required by the scheme denies the person named in a certificate the opportunity to know the case put against him or her, and hence to challenge the government's case."*²¹ Outer-alignment failure at the extreme — the specification made rights-preservation mathematically impossible.

**Anti-Terrorism Act, 2015 (Bill C-51): BC = 78 (Severe misalignment).** Enacted in the wake of the 2014 Parliament Hill attack. Authorized judicial warrants to breach Charter rights rather than protect them; extended "advocating or promoting terrorism offences in general" as a speech offence without a public-interest defence; enabled pan-agency information-sharing across seventeen federal bodies. Forcese and Roach's *False Security* (Irwin Law 2015), winner of the 2016 Canadian Law and Society Association Book Prize, called the regime a "false promise of security" — language that is a direct descendant of Borovoy's 2001 C-36 critique.²² The statute's definition of "terrorist activity" is precisely the kind of extremal-Goodhart drafting Borovoy diagnosed fourteen years earlier.

**Section 13, Canadian Human Rights Act (pre-repeal): BC = 74 (Severe).** A provision Borovoy himself had helped build as part of the 1960s human-rights-commission architecture, and that he criticized in his later career as having drifted from anti-discrimination toward speech-policing. Repealed by Parliament in June 2014. The canonical Borovoy case of institutional mesa-optimization: the bureaucracy's operative objective diverged from the statutory base objective over a generation.

**Ontario Safe Streets Act, SO 1999, c 8: BC = 70 (Severe).** Marketed as a public-safety measure targeting squeegee workers. Enforced almost exclusively against unhoused people, producing ticket debt that compounded their situation. Parts of the Act struck down in *Fair Change Community Legal Clinic v. Ontario (AG)*, 2024 ONSC, for violating s.11(d) of the Charter (presumption of innocence). Causal-Goodhart variant: the proxy (aggressive solicitation) correlates with the target (public-safety risk) only because both correlate with poverty, and enforcement effectively intervened on poverty rather than on risk.

**Emergencies Act invocation (February 2022): BC = 81 equivalent (Unconstitutional-by-design).** Not a law per se but a legal instrument — the invocation of a power created in the statutory aftermath of the War Measures Act, with which Borovoy's own constitutional thinking is most indelibly associated. The invocation was held unreasonable and Charter-infringing in *Canadian Frontline Nurses v. Canada (Attorney General)*, 2024 FC 42, upheld by the Federal Court of Appeal the following year. Perrin Beatty — the architect of the Emergencies Act — called the invocation *"the most egregious violation of civil liberties in my lifetime."*²³ It is, almost verbatim, a vindication of Borovoy's power-hoarding fallacy.

The full prototype corpus includes mandatory-minimum provisions under Criminal Code s.95 (pre-*Nur*), Quebec's Bill 21, Alberta's Critical Infrastructure Defence Act, BC civil forfeiture's unexplained-wealth-order provisions, Toronto parks encampment enforcement, Vancouver's street-and-traffic bylaw camping provisions, Montreal's Bylaw P-6 pre-strike, Calgary's anti-solicitation bylaw, and for contrast, two low-coefficient instances — the Ontario *Not-for-Profit Corporations Act* (BC = 14) and Vancouver's Noise Control Bylaw #6555 (BC = 12) — demonstrating that the Coefficient rewards narrow purpose-effect tracking, not just catches overreach.

---

## VII. Prior Art and Objections

The paper would be worse than useless if it did not engage its nearest intellectual neighbours.

**Merton (1936).** *The Unanticipated Consequences of Purposive Social Action* is the gravitational centre of the field. Merton's five-category taxonomy (ignorance, error, imperious immediacy of interest, basic values, self-defeating prophecy) describes the general phenomenon. The Borovoy Coefficient adds what Merton could not: mesa-optimization, a quantitative operationalization, and a prospective design methodology. The Coefficient is in Merton's debt and makes no claim to supersede him.

**Hacker (2004) — Policy Drift.** Jacob Hacker's *Privatizing Risk Without Privatizing the Welfare State* (APSR 98:2) is the closest contemporary competitor.²⁴ Hacker explains how unchanged statutes become misaligned as the surrounding world changes. The Coefficient extends Hacker by introducing the bureaucratic mesa-optimization layer and by quantifying each dimension against a recognized legal doctrine, producing an instrument rather than a framework.

**Hogg & Bushell (1997) — Dialogue Theory.** Peter Hogg and Allison Bushell famously argued that Charter review establishes a dialogue between courts and legislatures rather than judicial supremacy.²⁵ A sharper critique of any Borovoy-tribute paper is that CCLA's Charter litigation style, by encouraging legislatures to legislate broadly and rely on s.1 justification, may have *optimized the feedback loop* rather than the underlying specification — that is, the CCLA-era settlement incentivizes Borovoy Drift. The paper concedes the force of this critique. A sunset-clause-plus-purpose-reporting regime (Part IX below) is the Coefficient's structural answer: rather than rely on dialogue to cure over-reach after the fact, tighten the specification at the drafting stage.

**Guha et al. (2024).** *AI Regulation Has Its Own Alignment Problem*, 92 *Geo. Wash. L. Rev.* 1473, argues that AI regulation itself exhibits vertical and horizontal alignment failures.²⁶ The paper is a direct intellectual ally — it borrows alignment vocabulary for institutional analysis but stops short of treating statutes as reward functions. The Borovoy Coefficient makes the move Guha et al. do not.

**Public choice (Buchanan & Tullock 1962; Stigler 1971).** The political economy of drafting — log-rolling, concentrated benefits, regulatory capture — is a well-developed literature that the Coefficient does not replace. Where public choice explains *why* legislatures miss the mark, the Coefficient explains *in what dimensions* they miss it and *by how much*. The two are complementary.

**The "so what" attack.** A reviewer may ask: once the fancy AI vocabulary is stripped off, what does this add to what Merton, Campbell, Goodhart, and public-choice theorists have already said? Three things, and only these three. First, quantitative specification — operational scoring across five dimensions rather than narrative taxonomy. Second, the mesa-optimization frame — attention to the training process by which a bureaucracy develops revealed objectives distinct from the statute that chartered it. Third, prospective design — a set of drafting reforms (Part IX) that the descriptive traditions do not furnish. Remove any of the three and the paper is a tribute essay. With all three, it is an instrument.

**Under-reach.** The Coefficient measures over-reach because Borovoy measured over-reach. It does not catch laws that fail by doing too little — inadequate environmental regulation, under-enforcement of monopoly restraint, tenant-protection gaps. This is a genuine limitation of the frame, and is disclosed in the spec (Limitation 1). A reciprocal *Regulatory-Gap Coefficient* is future work.

---

## VIII. The Borovoy Drafting Principles

The Coefficient is descriptive, but it points toward prospective reforms. Five drafting principles, drawn from the research record and from the spec, would reduce Borovoy Coefficients at source:

1. **Sunset clauses** requiring affirmative re-enactment on a five- or ten-year cycle. This has been Borovoy's ask on national-security legislation since 2001. Sunset clauses are the legislative analogue of a retraining interval — they force the drafter to re-specify the objective in light of observed effects, closing the outer-alignment loop at a definite cadence rather than relying on stochastic judicial intervention.

2. **Purpose-effect reporting.** A statutory obligation on responsible ministers to publish annual data on whether the law is achieving its stated purpose, using defined metrics. This is a legislative analogue of an alignment benchmark. Without it, D₁ is unmeasurable at source.

3. **Disparate-impact dashboards.** Mandatory publication of enforcement data disaggregated by geography, income, and (where constitutionally required) protected grounds. D₅ is unmeasurable without this. The CCLA has been asking for disparate-impact reporting on police services since the 1990s; it remains largely absent from Canadian enforcement-data infrastructure.

4. **Narrowing presumption.** Courts should read statutory language narrowly in Charter-adjacent fields unless drafters have used plain expansive language. This tightens D₃ at construction and forces drafters who want broad scope to ask for it explicitly, pricing the drafting choice rather than burying it.

5. **Independent oversight bodies with hard powers.** Not advisory review committees à la the Security Intelligence Review Committee, but bodies with order-making authority on a statutory footing, closing the mesa-optimization loop Borovoy flagged from 1984 onward. The 2019 *Access to Information Act* reforms partially moved in this direction by giving the Information Commissioner order-making powers; much more is possible.

These are not radical. They are not even novel — each has been advocated for by CCLA and kindred organizations for decades. What is new is their assembly into a coherent prospective architecture keyed to a measurement instrument. Drafting reforms without measurement are a manifesto. Measurement without reforms is a tribute essay. Both together is an infrastructure.

---

## IX. Conclusion

The Borovoy Coefficient does not replace Borovoy. It makes him operational. The diagnostic frame he carried across fifty years of Canadian civil-liberties practice — the intent-effect gap, the power-hoarding fallacy, the mesa-institutional drift of the commissions he helped build — turns out to be, when translated into the vocabulary of machine-learning alignment, a precise technical claim. Governments and ML systems miss the mark in the same four-variant Goodhart taxonomy. Their bureaucracies and neural networks alike are optimizers trained on proxies for under-specifiable goals, and they produce specification-gaming behaviour on distributional shifts from their formation conditions. The identity is not metaphor; Hennessy and Goodhart proved it, mathematically, in 2023.

If Borovoy were still in the field he would, I think, be unsurprised by the identity. He spent his career reminding Canadians that noble purposes and broad drafting are a dangerous combination, and he spent it asking for parliamentary sunset clauses and hard-powered oversight rather than judicial discretion — the very reforms the alignment literature now calls *corrigibility* properties and proposes for systems that must remain under human control. "Obey the law but stick it to the government anyway," he wrote in *Uncivil Obedience* (1991). Measurement, publication, and reform is the 2026 grammar of that disobedience.

I end with the line under which Borovoy chose to retire from the CCLA in 2009, and which is carved into the collective memory of Canadian civil-liberties work: *"forty years of raising hell without breaking the law."* The Borovoy Coefficient is an attempt to raise hell legibly — to make the intent-effect gap something that can be measured, ranked, and reduced. If the instrument is used, it will be because Canadians are willing to hold their own statutes to the specification their preambles announce. That is the only way the mark stops being missed.

---

## Notes

¹ Alan Borovoy, testimony of the Canadian Civil Liberties Association, *Proceedings of the House of Commons Standing Committee on Justice and Human Rights*, 37th Parliament, 1st Session, Meeting 33 (29 October 2001).

² Ibid.

³ Alan Borovoy, quoted in the public debate preceding the 2014 repeal of CHRA s.13; see *Section 13 of the Canadian Human Rights Act*, Wikipedia, and the National Post / Maclean's coverage contemporaneous with the Moon Report (2008).

⁴ Norbert Wiener, *Some Moral and Technical Consequences of Automation*, 131 *Science* 1355 (6 May 1960).

⁵ Evan Hubinger, Chris van Merwijk, Vladimir Mikulik, Joar Skalse & Scott Garrabrant, *Risks from Learned Optimization in Advanced Machine Learning Systems*, arXiv:1906.01820 (2019).

⁶ Charles A. E. Goodhart, *Problems of Monetary Management: The U.K. Experience* (1975), in *Papers in Monetary Economics*, vol. I (Reserve Bank of Australia); Marilyn Strathern, *'Improving Ratings': Audit in the British University System*, 5 *European Review* 305 (1997).

⁷ David Manheim & Scott Garrabrant, *Categorizing Variants of Goodhart's Law*, arXiv:1803.04585 (2018).

⁸ Victoria Krakovna et al., *Specification Gaming: The Flip Side of AI Ingenuity*, DeepMind Safety Research (2020).

⁹ Dario Amodei, Chris Olah, Jacob Steinhardt, Paul Christiano, John Schulman & Dan Mané, *Concrete Problems in AI Safety*, arXiv:1606.06565 (2016).

¹⁰ Michael K. Cohen, Marcus Hutter & Michael A. Osborne, *Advanced Artificial Agents Intervene in the Provision of Reward*, 43 *AI Magazine* 282 (2022).

¹¹ James M. Buchanan & Gordon Tullock, *The Calculus of Consent: Logical Foundations of Constitutional Democracy* (Univ. of Michigan Press, 1962); George J. Stigler, *The Theory of Economic Regulation*, 2 *Bell J. Econ. & Mgmt. Sci.* 3 (1971).

¹² James C. Scott, *Seeing Like a State: How Certain Schemes to Improve the Human Condition Have Failed* (Yale Univ. Press, 1998).

¹³ Donald T. Campbell, *Assessing the Impact of Planned Social Change*, 2 *Evaluation & Program Planning* 67 (1979).

¹⁴ Christopher J. Hennessy & Charles A. E. Goodhart, *Goodhart's Law and Machine Learning: A Structural Perspective*, 64 *International Economic Review* 1075 (2023).

¹⁵ Jacob S. Hacker, *Privatizing Risk Without Privatizing the Welfare State: The Hidden Politics of Social Policy Retrenchment in the United States*, 98 *American Political Science Review* 243 (2004).

¹⁶ Robert K. Merton, *The Unanticipated Consequences of Purposive Social Action*, 1 *American Sociological Review* 894 (1936).

¹⁷ *Canada (Minister of Citizenship and Immigration) v. Vavilov*, 2019 SCC 65, [2019] 4 SCR 653.

¹⁸ *R. v. Oakes*, [1986] 1 SCR 103.

¹⁹ *R. v. Heywood*, [1994] 3 SCR 761; *Canada (Attorney General) v. Bedford*, 2013 SCC 72, [2013] 3 SCR 1101; *R. v. Nova Scotia Pharmaceutical Society*, [1992] 2 SCR 606.

²⁰ *R. v. Le*, 2019 SCC 34, [2019] 2 SCR 692.

²¹ *Charkaoui v. Canada (Citizenship and Immigration)*, 2007 SCC 9, [2007] 1 SCR 350, at para 53.

²² Craig Forcese & Kent Roach, *False Security: The Radicalization of Canadian Anti-Terrorism* (Irwin Law, 2015).

²³ Perrin Beatty, *I witnessed the creation of the Emergencies Act. It shouldn't have been invoked*, *Globe and Mail* (15 February 2022).

²⁴ Hacker, *supra* note 15.

²⁵ Peter W. Hogg & Allison A. Bushell, *The Charter Dialogue Between Courts and Legislatures*, 35 *Osgoode Hall Law Journal* 75 (1997).

²⁶ Anjali Guha et al., *AI Regulation Has Its Own Alignment Problem*, 92 *George Washington Law Review* 1473 (2024).

---

*Version 1.0, released under MPL-2.0. Cite as: Bryant, M. (2026). The Borovoy Coefficient: A Civil-Liberties Measure of Legislative Alignment. Justack.ai.*
