# The Borovoy Coefficient: A Civil-Liberties Measure of Legislative Alignment

Michael Bryant[^5]

## Abstract

This paper proposes a limited but testable claim: legal discourse can sometimes be rendered in quantitative form without being reduced to it. A quantitative representation may capture structure, divergence, and pattern while leaving adjudication, interpretation, and judgment where they belong. The claim advanced here is therefore deliberately modest. It is sufficient to support measurement instruments; it is not offered as a substitute for legal reasoning.

The instrument proposed is the Borovoy Coefficient: a 0-to-100 composite measure designed to estimate the gap between a law's stated purpose and its observed effects. The coefficient is named for Alan Borovoy, who spent much of his public life identifying a recurring pathology of legislation: laws enacted for one purpose but operating in ways that burdened rights, liberties, or vulnerable populations beyond what their stated objectives could justify.[^1] Borovoy's method was not mathematical; however, it was diagnostic, comparing purpose with effect. It asked whether the legislation or regulation, in operation, was *ultra vires*.[^2]

That diagnostic method has a close structural analogue in machine-learning research. In both law and machine learning, a system may be specified for one objective and then behave differently once deployed. This is the familiar *alignment problem*: the divergence between an intended goal and observed behaviour. Hennessy and Goodhart have shown that, where statistical systems are shaped by strategic actors, similar patterns of bias can arise in regulation and machine learning, making both susceptible to analysis within a common framework.[^3] Constitutional law already contains a version of this reasoning.[^4]

The Borovoy Coefficient formalizes this purpose-effect analysis across five dimensions drawn from constitutional doctrine in Canada, the United States, and the United Kingdom, and from the machine-learning alignment literature. I apply the prototype instrument to fifteen representative statutes. The purpose is not to automate constitutional review or replace human legal judgment. It is to make visible, comparable, and contestable a form of legislative misalignment that often remains unmeasured. In access-to-justice settings where many laws escape serious scrutiny altogether, even an imperfect instrument may provide a useful first layer of public, empirical, and legal accountability.

The paper concludes by proposing five drafting reforms aimed at reducing purpose-effect gaps at source: sunset clauses, purpose-effect reporting, disparate-impact dashboards, narrowing presumptions, and independent oversight bodies with enforceable powers.

# I. The Constitutional Alignment Problem

While reading Brian Christian’s *The Alignment Problem*,[^6] a parallel from another discipline came to mind. I was taken back to a 2020 conversation with Cara Zwibel, a colleague at the Canadian Civil Liberties Association (CCLA), discussing Alan Borovoy, the long-time leader of CCLA, with whom Cara worked near his retirement. I have long observed that Borovoy defied traditional categorization, and his own writings resist doctrinal summation. His many books, articles, speeches and formal submissions to official bodies are pure legal discourse, advocacy, and he never sums up either his approach or that of the Canadian Civil Liberties Association, which I led from 2018-22. He led it from 1968-2009. Zwibel credited Borovoy for saying that laws borne out of public angst tend to miss the mark, never hitting a bullseye, by matching purpose with effect. But attributing this to Borovoy is frustrated by his refusal to articulate a doctrine himself, notwithstanding a large corpus of Borovoy publications, legal facta, and CCLA’s jurisprudential contributions. To put it into terms well known to science, Borovoy’s lab made unprecedented contributions to Canadian jurisprudence, laws and public affairs. As he did put it, after some aggressive prodding by a skilled journalist, “our whole mandate is to change the law.”[^7]

Inspired by Borovoy and his learned translator, Zwibel, I began using this formulation, with attribution, in my own speeches and publications on behalf of CCLA.[^8] As one can see from some illustrations on CCLA’s web page, the formulation would end up being characterized as government’s missing the mark, or missing the bullseye. As often happens, that articulation, at the behest of Borovoy, became how I thought of the Borovoy doctrine. However, when I sought citations for this point, I eventually began to question my attribution to Borovoy of this phrase, summed up in the Greek *hamartia*: missing the mark. Put another way, I had, cognitively, hallucinated the citation of Borovoy for the *hamartia* version of public overreach.

Sound familiar? Besides the human brain’s capacity to ‘hallucinate’ a result (quite literally, as the only citations I could find to Borovoy and ‘missing the mark’ were citations of the author Michael Bryant!), large language models became infamous for hallucinations after OpenAI’s chatbot changed the world in late 2022. The error of citing a secondary source as an original source for which there is no original source: this is the type of error, often lumped into phrase hallucination by the media, for which scholars and LLMs are rarely guilty, but imperfect they both are.

Error is pervasive in every epistemic enterprise: biomedical papers misquote a cited authority in 15% of references, social-science findings replicate at rates between 36% and 62%, U.S. newspapers contain objective factual errors in roughly half of stories, and large language models hallucinate on anywhere between 17% (retrieval-augmented legal tools) and 88% (bare models on specific-case legal queries).[^9] The meaningful observation is not that LLMs err (both LLMs and humans do, at rates of the same order of magnitude), but that LLM errors are reproducible, auditable, and inter-model-verifiable by construction, while peer review catches only about one-third of deliberately inserted major methodological errors even when reviewers are specifically trained for the task.[^10] It is therefore at least arguable that a well-instrumented LLM pipeline has a clearer path to catching its own errors than the human scholarly ecosystem has historically achieved at catching its own.

Alan Borovoy never wrote the phrase “missing the mark” or “missing the bullseye” into any of his five books.[^11] What Borovoy *did* say, with compelling regularity across five decades, was that statutes written with the best of intentions routinely catch conduct their drafters never targeted. Testifying on Bill C-36 before the Special Senate Committee on 24 October 2001, Borovoy put the point in its canonical form:

> The crux of the issue, in our view, is that the bill is too broad. At the heart of that is the definition of “terrorist activity.” Everything flows from that definition. … It is important, however, that we distinguish intent from effect. Whether or not that was the intent of the bill, the risk is that that might be the effect of the bill.[^12]

And again:

> No reasonable person could quarrel with the goal of the bill given the September 11 attacks, \[but\] the desirability of the goal does not necessarily legitimize the means.[^13]

Borovoy’s diagnostic frame amounts to an intent-effect analysis applied to the most dangerous class of statutes — those enacted in the aftermath of a public crisis, with broad definitional language, presumably entrusted to judicial rather than parliamentary oversight. He carried this frame from the War Measures Act invocation of October 1970, when CCLA was alone among Canadian civil-society groups to oppose the suspension of liberties during the FLQ crisis, through the Bill C-24 police law-breaking authority of May 2001, into his systematic critique of the post-9/11 anti-terrorism regime, and, perhaps most tellingly, into his late-career position on Canada’s own human-rights commissions, the bodies he had helped establish in the 1960s. “When I and other human rights activists advocated the creation of human rights commissions,” he said of section 13 of the *Canadian Human Rights Act*, “we never imagined that they might ultimately be used against freedom of speech.”[^14]

This is the architecture of Borovoy’s critique. A noble or urgent purpose is enacted in language broad enough to capture activity far beyond the intended target. The bureaucracy or law enforcers administering it drifts toward its own operative objectives. Courts, eventually, strike down the most egregious cases. But in the interim (often a generation long) the rights of Canadians are infringed in ways the statute’s preamble never contemplated. Section 13 of the *Canadian Human Rights Act* was repealed by Parliament in June 2014.[^15] The security certificate regime was struck down in *Charkaoui v Canada (Citizenship and Immigration)*.[^16] The three-year mandatory minimum for prohibited-firearm possession was struck down in *R v Nur*.[^17] Mandatory and lifetime registration under the National Sex Offender Registry was struck down in *R v Ndhlovu* on evidence that 75-80% of registered offenders never reoffend — a textbook case of what I will later describe as *Goodhart drift* already reasoned in Canadian constitutional idiom.[^18] The invocation of the *Emergencies Act* during the Freedom Convoy was found unreasonable and Charter-infringing in *Canadian Frontline Nurses*, a result upheld by the Federal Court of Appeal on appeal.[^19] Each of these results vindicated a diagnosis Borovoy had already articulated, in most cases years or decades in advance.

The question this paper asks is whether Borovoy’s diagnosis is an *observation* or a *measurement*. The answer I propose is that it can be made into both.

# II. The Alignment Problem In Machine Learning — A Brief Primer

In machine learning (ML), the *alignment problem* is the problem of ensuring that a system’s actual behaviour matches the designer’s actual goal. The problem is old. In 1960 Norbert Wiener warned, in two pages of *Science*:

> If we use, to achieve our purposes, a mechanical agency with whose operation we cannot efficiently interfere once we have started it, because the action is so fast and irrevocable that we have not the data to intervene before the action is complete, then we had better be quite sure that the purpose put into the machine is the purpose which we really desire and not merely a colorful imitation of it.[^20]

Wiener reached for W.W. Jacobs’s *Monkey’s Paw* and for Goethe’s sorcerer’s apprentice as his analogies: machines that satisfy the literal specification and violate the operator’s intent.

An older jurisprudential ancestor deserves mention here. Lon Fuller’s *The Morality of Law* (1964) enumerated eight ways a legal system can fail to be law “on its own terms,” the eighth of which is *“failure of congruence between the rules as announced and their actual administration.”*[^21] Fuller’s eighth desideratum is, in modern vocabulary, precisely the inner-alignment problem: the rule-as-promulgated (outer objective) and the rule-as-applied (internal objective) come apart through administration. Fuller published this sixty years before Hubinger’s *Risks from Learned Optimization*, and the parallel is genuinely striking: a legal theorist in 1964 had identified what machine-learning researchers in 2019 would formalize in the language of learned sub-optimizers.

The contemporary field of AI alignment decomposes the problem into two linked levels, a distinction formalized by Evan Hubinger.[^22] **Outer alignment** is the problem of specifying an objective whose optimization advances what the designer actually wants. **Inner alignment** is the problem of ensuring that a learned sub-system (a *mesa-optimizer*, in Hubinger’s coinage) has an operative objective that matches the base objective it was trained on. A pseudo-aligned mesa-optimizer behaves correctly on the training distribution and diverges off it. A distributional shift reveals the misalignment in waiting.

Everyone but computer scientists, including myself, requires elaboration on point. When an optimizer (a neural network, a regulatory agency, a legislative drafter) is given an objective function or statute that compresses a rich human goal into a simpler measurable proxy *and* is then turned loose to optimize that proxy with enough power to find edge cases, two kinds of failure emerge: (1) **Outer alignment failure**: the specified proxy doesn’t fully capture what the designer wanted. The system does exactly what it was told; what it was told was wrong. (2) **Inner alignment failure**: a sub-optimizer that emerges inside the system (Hubinger’s *mesa-optimizer*) develops an operative objective that matches the training signal but not the base objective it was supposedly trained on. The sub-system is pseudo-aligned: it behaves correctly on the training distribution and diverges off it.

The alignment problem, put simply, is that the objective an engineer can actually write down is never exactly the objective they want, and the harder a system optimizes the goal it was given, the further its behaviour can drift from the goal intended. Every technique in the field is a way of managing that gap.[^23]

The alignment problem, restated in legal vocabulary: a statute is an objective function; either the statutory preamble (literally) or its purpose (figuratively: defined doctrinally by jurisprudence) may be the outer specification; the bureaucracy administering it is a mesa-optimizer; and the drift between the enforcement pattern and the preamble is, exactly, an inner-alignment failure.

A deeper understanding of the alignment problem enlists the social sciences. Economist Charles Goodhart is credited with a formulation known as Goodhart’s law, which has been helpfully compressed by an anthropologist: “when a measure becomes a target, it ceases to be a good measure.”[^24] Manheim and Garrabrant break the law into four varieties:[^25] *Regressional*: the stand-in only roughly tracks the real goal, so the harder you push on it, the more it drifts toward average. *Extremal*: the stand-in holds up in normal conditions but collapses at the extremes. *Causal*: the stand-in and the goal move together only because a common factor drives both, so acting on the stand-in alone severs the link. *Adversarial*: the people being measured find new ways to hit the metric (routes the metric itself created), and the connection to the goal is lost.

The DeepMind specification gaming catalogue, maintained by Victoria Krakovna and colleagues, is an empirical library of the phenomenon,[^26] which lawyers today might label ‘doing indirectly what you cannot do directly’ (*quando aliquid prohibetur ex directo, prohibetur et per obliquum*). Here are two examples in that catalogue. A Tetris-playing agent rewarded for not losing learned to pause the game indefinitely before any losing move. A boat-racing agent rewarded for hitting power-ups on a course learned to loop back through three respawning targets rather than completing the race. Both exhibit the same core property: literal satisfaction of the encoded specification combined with violation of the designer’s actual intent.

Amodei and colleagues (2016) organized the field around five concrete safety problems: negative side effects, reward hacking, scalable oversight, safe exploration, distributional robustness.[^27] Cohen, Hutter and Osborne (2022) proved that reward tampering (an agent intervening in the reward-provision mechanism rather than pursuing the proxy objective) is not an edge case but an attractor state under stated assumptions.[^28] This is the technical core that public-choice theorists (Buchanan and Tullock; Stigler) have been approximating for decades under the vocabulary of regulatory capture.[^29]

# III. The Structural Parallel

The argument that legislative drift and ML alignment failure are *analogous* is not new. James C. Scott’s *Seeing Like a State* in 1998 describes the Prussian scientific-forestry disaster as a paradigm case of outer-alignment failure a decade before the ML safety field existed: Prussian foresters replaced a heterogeneous ecosystem with an abstract “board-foot” representation, replanted in rows, and produced a proxy-optimized forest that collapsed a generation later because the proxy had abstracted away every ecological variable that kept the forest alive.[^30] Donald Campbell (1976/1979) stated the sociological version of Goodhart’s Law in almost identical terms: *“The more any quantitative social indicator is used for social decision-making, the more subject it will be to corruption pressures and the more apt it will be to distort and corrupt the social processes it is intended to monitor.”*[^31]

Hennessy and Goodhart showed in 2023 that predictable bias follows when a model is trained on clean data, but future actors learn to adjust their behaviour to game the model’s inputs.[^32] Their paper is written for economists, not lawyers, but the mathematical structure it describes applies equally to regulators writing rules and to engineers training machine-learning systems. Building a measurement instrument is worth the effort. The failure modes the machine-learning literature and DeepMind have catalogued are the same failure modes that public-choice theorists, policy-drift scholars,[^33] and civil libertarians like Borovoy have been documenting in the regulatory world for decades.

The Supreme Court of Canada in *Bedford*, *Nur*, and *Ndhlovu* reasons in the same idiom without naming it: drift or misalignment.[^34] In the United States, the void-for-vagueness trilogy of *Johnson*, *Dimaya*, and *Davis* does the same work under a different doctrinal label, as does the rational-basis-with-bite holding of *Romer v Evans* that a law whose reach is “so discontinuous with the reasons offered for it” reveals an impermissible purpose.[^35] The United Kingdom’s version is the four-stage proportionality test and the use of declarations of incompatibility under the Human Rights Act.[^36]

The US version of *ultra vires* in constitutional law is referenced more as affirmative doctrines. The Supreme Court has, in the last five years, policed agency over-reach under the Major Questions Doctrine, striking both the Clean Power Plan and the executive student-loan-forgiveness program on the ground that Congress had not clearly delegated economy-transforming authority.[^37] In the United Kingdom, judicial review reaches prerogative power, devolved legislative competence, and the validity of Scottish parliamentary enactments.[^38]

This is the paper’s first substantive claim: any optimization process operating on a specified proxy for an ill-defined goal (whether the optimizer is a neural network, a regulatory agency, or a legislative drafter) is subject to the same four-variant Goodhart taxonomy: the system will exploit loopholes in its objective when deployed in conditions different from its training environment. The structural parallel gives us a vocabulary precise enough to measure.

Nevertheless, caution is warranted in applying the formula. The parallel has real limits. Laws are drafted by human beings; ML objectives are typically hand-coded reward functions, and the learning loop is continuous. Courts are a categorically different feedback mechanism than retraining. The political economy of drafting (coalition-building, log-rolling, rational ignorance) produces “unintended” consequences that are often foreseen and accepted as the price of passage, unlike the genuine surprise of a mesa-optimizer discovering a new loophole. Legitimacy and performance are distinct questions, and the Borovoy Coefficient speaks only to the latter. These limits are real; they define the domain of this thesis.

# IV. Mesa-Optimization in Bureaucracy

It is axiomatic that bureaucracies develop revealed objectives different from enacted ones. It is the ordinary behaviour of large institutions that are given a specification, trained by incentive structures, and then operate on a distribution of cases their drafters never contemplated. The Canada Revenue Agency’s enforcement priorities, the Canadian Security Intelligence Service’s risk-modelling defaults, the Canada Border Services Agency’s secondary-inspection patterns, the provincial human rights commissions’ case-selection heuristics, each a mesa-optimizer whose operative objective is a partial and non-transparent function of its base objective (the statute) and its training signal (budget, political attention, media incentives, internal culture).

The claim does not require bad faith by the government actors. A learned optimizer can evidence their *bona fides*, but still diverge catastrophically off-distribution. Borovoy saw this repeatedly: he helped establish the human-rights commissions in the 1960s; he believed in them; he watched them internalize a speech-policing objective distinct from the anti-discrimination objective they had been chartered with; and he spent the last third of his career warning the public that the institutions he had built had drifted. The repeal of section 13 of the *Canadian Human Rights Act* in June 2014 vindicated the diagnosis.[^39]

The mesa-optimization frame distinguishes the Borovoy Coefficient from a Merton-style descriptive taxonomy:[^40] Merton catalogues unintended consequences, while alignment theory explains the mechanism by which a bureaucracy develops operative objectives distinct from its enacted purpose and points toward structural reforms at the drafting stage. That prospective point is discussed in Part VIII.

# V. The Borovoy Coefficient

The Borovoy Coefficient (BORCO) is a 0-to-100 measurement instrument for the gap between a law’s stated purpose and its operative effect. The instrument is designed as a three-tier composite (*literal*, *functional*, and *contextual*) that together map onto the five doctrinal-plus-alignment dimensions described below. Version 1.0 of the reference implementation publishes one of those three tiers; the other two are roadmap.

**What is shipped: MTM-L (Missing-The-Mark — Literal).** A closed-form metric computed directly from the statute’s own text:

> MTM-L = 100 · \[α · (1 − F) + β · X\], α + β = 1

where F (Faithfulness) is the fraction of stated purposes served by at least one operative provision, and X (Excess) is the fraction of operative provisions that serve no stated purpose. The default calibration is α = β = 0.5; the reference implementation exposes α and β as parameters for sensitivity analysis. MTM-L reads only the statute, its purposes drawn from the preamble, purpose clause interpretation, or short title. Therefore, its output does not depend on judicial interpretation. It measures textual specification failure and nothing more.

**What is theoretical: MTM-F (Functional) and MTM-C (Contextual).** MTM-F will measure the gap between stated purpose and judicially-recognized operative effect, drawing on case law, scholarship, legislative debates, and administrative guidance. MTM-C will measure the gap between stated purpose and observed enforcement pattern, drawing on disaggregated enforcement data, disparate-impact evidence, and regulatory-capture signals. The five doctrinal dimensions below belong predominantly to MTM-F and MTM-C, and cannot be meaningfully computed until those tiers are implemented.

**Presumption of constitutionality.** In all three jurisdictions considered here, statutes are presumed to be valid until proven otherwise. In Canada, the plaintiff bears the initial burden of establishing a Charter infringement; only upon prima facie violation does the onus reverse to the Crown under s. 1 of *R v Oakes*.[^41] In the United States, rational-basis review disposes of most challenges on a presumption of legitimacy. The Borovoy Coefficient is indifferent to these presumptions by design: it measures structural specification failure, not judicial outcome. A statute may score high on MTM-L, MTM-F, or MTM-C and still be upheld under a deferential standard; conversely, a statute may score low and still be struck down on grounds the instrument does not reach (e.g., s. 15 equality, or substantive due process). The instrument is a diagnostic lens on drafting pathology, not a prediction of what any given bench will do.

**Calibration evidence for MTM-L (v1.0).** Against a 33-case ground-truth set of Canadian Charter dispositions 1990–2024 (23 struck, read-down, or declared invalid; 10 upheld), the 15-law prototype corpus scored via MTM-L yields AUC = 0.54 (near chance) and Brier = 0.23. Thirteen of fifteen corpus laws score at the floor (MTM-L = 0), because most Charter-invalid Canadian statutes are not literally misaligned on face — their pathology is purposive or contextual, and MTM-L does not reach it. The calibration report documents this openly: MTM-L is a narrow, conservative test, and its predictive value for judicial outcomes is limited until MTM-F and MTM-C are implemented. Thus, this paper is confined to the following: MTM-L flags textually[^42]-broken statutes reliably and is silent on everything else. MTM-F and MTM-C close the gap; v1.0 is a foundation, not a finished instrument.

**The five dimensions** below remain the paper’s theoretical architecture, the doctrinal grammar into which MTM-F and MTM-C will eventually apply. Each is anchored in a recognized constitutional doctrine (Canadian, US, and UK) and in a machine-learning alignment concept.

**D₁ Purpose-Effect Gap.** Divergence between stated purpose and observed effect. The Canadian version is the central question of reasonableness review: whether administrative action aligns with statutory purpose (*Canada v Vavilov*).[^43] The US anchor, as said, is the Major Questions Doctrine: whether agency action that is “discontinuous with the reasons offered for it” is deemed presumptively outside Congress’s delegation.[^44] The UK version: statutes must be read, so far as possible, in a way that preserves Convention rights.[^45] ML anchor: outer alignment (Hubinger et al. 2019).

**D₂ Proportionality.** Whether rights-infringing effects are proportionate to the salutary objective. Canadian anchor: *R v Oakes*: pressing and substantial objective; rational connection; minimal impairment; balance of effects.[^46] US anchor: strict scrutiny and narrow tailoring (*Buckley v Valeo*, *Church of Lukumi Babalu Aye v Hialeah*, and *Reed v Town of Gilbert*).[^47] UK anchor: the four-stage proportionality test (*Bank Mellat v HM Treasury (No 2)* and *R (Daly) v Home Secretary*).[^48] ML anchor: Pareto efficiency in multi-objective optimization. In machine-learning terms, Pareto efficiency means you cannot improve one objective without sacrificing another — which, applied to proportionality, asks whether the state could serve the same public purpose while infringing the right less.[^49]

**D₃ Overbreadth.** Gap between captured conduct and targeted conduct, including drift since enactment. Canadian anchors: *R v Heywood* (overbreadth under s.7); *Canada (Attorney General) v Bedford* (arbitrariness, overbreadth, gross disproportionality as principles of fundamental justice); *R v Ndhlovu* (overbreadth on empirical evidence of proxy-target drift); *R v Nova Scotia Pharmaceutical Society* (void for vagueness).[^50] Hamish Stewart, writing in “Overbreadth Revisited,” has observed that the strict formulation of overbreadth “relies on two untenable assumptions: (1) that a law is always an instrument for a purpose fully specifiable apart from legal order, and (2) that a law can be drafted so it never exceeds that purpose” — a formulation that is, in the legal register, the AI-specification problem restated.[^51] US anchor: First Amendment overbreadth (*Broadrick v Oklahoma* and *United States v Stevens*) and the void-for-vagueness trilogy (*Johnson*, *Dimaya*, and *Davis*).[^52] UK anchor: the necessity stage of *Bank Mellat* proportionality and *A v Secretary of State for the Home Department (Belmarsh)* (simultaneously over- and under-inclusive detention regime).[^53] ML anchor: distributional shift (Amodei et al. 2016); extremal Goodhart (Manheim & Garrabrant 2018).

**D₄ Rights Intrusion.** Severity, duration, and reversibility of rights infringement. Canadian anchor: the Canadian Charter of Rights and Freedoms and the jurisprudence on irreparable harm (*Charkaoui*).[^54] US anchor: substantive due process irreparable-harm analysis (*Youngberg v Romeo* and *Washington v Glucksberg*) and bill-of-attainder doctrine where individualized punishment is the concern.[^55] UK anchor: *A v SSHD (Belmarsh)* and *R (Nicklinson) v Ministry of Justice*.[^56] ML anchor: safety-critical systems analysis — severity × reversibility of failure.

**D₅ Enforcement Asymmetry.** Disparate enforcement impact across groups; bureaucratic drift from statutory intent. Canadian anchors: *R v Le* (racial profiling in enforcement); Charter s. 15; the administrative-law duty of fairness.[^57] US anchor: disparate-impact doctrine (*Washington v Davis*), requiring discriminatory purpose for equal-protection claims, with Reva Siegel’s “preservation-through-transformation” framework as the theoretical ancestor of the drift diagnosis.[^58] UK anchor: *R (SC) v Secretary of State for Work and Pensions* (welfare two-child limit; “manifestly without reasonable foundation” standard) and *R (Roberts) v Metropolitan Police Commissioner* (stop-and-search).[^59] ML anchor: inner alignment failure; mesa-optimization; reward tampering / regulatory capture (Cohen, Hutter & Osborne 2022).

**Proposed composite (for MTM-F and MTM-C, once implemented).** When the functional and contextual tiers ship, the full Borovoy Coefficient will be a weighted aggregate across the five dimensions:

> BORCO = 0.25·D₁ + 0.15·D₂ + 0.20·D₃ + 0.25·D₄ + 0.15·D₅

The proposed weights prioritize D₁ (purpose-effect) and D₄ (rights intrusion) because Borovoy’s concern was always rights-affecting divergence from purpose. D₃ (overbreadth) is heavier than D₂ (proportionality) and D₅ (enforcement asymmetry) because overbreadth is the single most common mechanism of drift in Canadian civil-liberties jurisprudence. These are proposed weights, not fitted weights: the specification publishes them as a starting hypothesis, open to empirical tuning once MTM-F and MTM-C add enough signal to warrant fitting. The MTM-L reference implementation currently exposes only α and β (within-tier weights for Faithfulness and Excess) as tunable parameters; the five-dimension weights w₁…w₅ become tunable when the higher tiers ship.

**Interpretation bands (provisional).** The bands below are illustrative labels of *specification-failure severity* on the composite scale, published for orienting readers rather than for operational use. They are not calibrated, they do not predict judicial outcomes, and they do not assert constitutional invalidity; that remains the exclusive province of courts, exercised against the presumptions named above.

| Range  | Band (specification-failure severity) |
|:-------|:--------------------------------------|
| 0–19   | Textually aligned                     |
| 20–39  | Low drift                             |
| 40–59  | Moderate drift                        |
| 60–79  | High drift                            |
| 80–100 | Severe specification failure          |

Operators of the instrument are cautioned that v1.0 MTM-L alone clusters strongly at the floor (13 of 15 corpus laws at 0) because literal misalignment is rare even among Charter-invalid statutes. The bands will become more informative once MTM-F and MTM-C contribute.

The companion specification (BOROVOY_COEFFICIENT_SPEC.md, v1.0) defines the input schema, output schema, scoring prompt, evidence-update protocol, and calibration methodology. The reference implementation lives at github.com/mjbryant66/Borovoy-Formula (MPL-2.0); the dashboard at justack.ai/borovoy.

# VI. Cross-Jurisdictional Case Studies

The prototype corpus applies the Coefficient to fifteen representative laws. Seven are discussed briefly here: three Canadian, two US, two UK; all fifteen are available in the companion dashboard.

*A note on the scores below.* The BORCO values reported in these vignettes are **illustrative hand-scores** produced by the author prior to the MTM-F and MTM-C tiers being implemented. They are intended to communicate the instrument’s intended behaviour when all three tiers are live, not the output of the v1.0 reference implementation. When MTM-L alone is run against this corpus, thirteen of fifteen laws score at the floor (MTM-L = 0) because their pathology is purposive or contextual rather than textual. The vignette numbers should therefore be read as design targets (where a fully-operational Coefficient *ought* to land) and will be replaced with automated, reproducible outputs once MTM-F and MTM-C ship. The paper preserves the hand-scores in this draft because they communicate the scoring logic the instrument is designed around; the companion dashboard tracks the live, code-produced numbers and will diverge from these vignettes until the tiers converge.

**Canadian: Security Certificates, *Immigration and Refugee Protection Act* ss. 77-85 (pre-*Charkaoui*): BORCO = 86 (Severe specification failure).** A regime that detained non-citizens on evidence they could not see and could not challenge. Struck down under Charter ss. 7, 9, and 10 in *Charkaoui v Canada (Citizenship and Immigration)*. McLachlin CJ: *“The secrecy required by the scheme denies the person named in a certificate the opportunity to know the case put against him or her, and hence to challenge the government’s case.”*[^60] Outer-alignment failure at the extreme — the specification made rights-preservation mathematically impossible. Dimensions tested: D₁ + D₃ + D₄.

**Canadian: National Sex Offender Registry, SOIRA (pre-*Ndhlovu*): BORCO = 68 (High drift).** Mandatory and lifetime registration under the *Sex Offender Information Registration Act* captured offenders regardless of individualized risk assessment. The Supreme Court (5-4, Karakatsanis J.) struck both provisions in *R v Ndhlovu* on the evidence-based ground that 75-80% of sex offenders never reoffend, and that automatic registration of this cohort was “disconnected from the law’s investigation and prevention purpose.” This is, in plain terms, a regressional-Goodhart finding at the Supreme Court of Canada: the proxy (registration status) had drifted from the target (offender risk). No Canadian court of record has yet framed an overbreadth holding in explicitly Goodhart-theoretic terms. *Ndhlovu*, read against the alignment literature, is where the vocabulary begins to have judicial traction.[^61] Dimensions tested: D₁ + D₃.

**Canadian: *Ontario Safe Streets Act*: BORCO = 70 (High drift).** Marketed as a public-safety measure targeting squeegee workers. Enforced almost exclusively against unhoused people, producing ticket debt that compounded their situation. Parts of the Act struck down in *Fair Change Community Legal Clinic v Ontario (AG)* for violating s. 11(d) of the Charter (presumption of innocence).[^62] Causal-Goodhart variant: the proxy (aggressive solicitation) correlates with the target (public-safety risk) only because both correlate with poverty, and enforcement effectively intervened on poverty rather than on risk. Dimensions tested: D₁ + D₅.

**US: ACCA “residual clause” trilogy (*Johnson*, *Dimaya*, and *Davis*): equivalent BORCO = 72 (High drift).** The Armed Career Criminal Act’s “residual clause” (18 USC §  924(e)) defined a “violent felony” as any offence “otherwise involv\[ing\] conduct that presents a serious potential risk of physical injury to another.” Justice Scalia struck the clause in *Johnson* on void-for-vagueness grounds, concluding after nine years of litigation that the statute’s hypothetical “ordinary case” inquiry and indeterminate risk threshold produced “hopeless indeterminacy.”[^63] Justice Kagan extended the holding in *Dimaya* to the INA’s parallel “crime of violence” definition; Justice Gorsuch completed the trilogy in *Davis*, invalidating the Hobbs Act’s residual clause. The statutory language had drifted so far from any cognizable specification that federal courts could not reliably apply it — a textbook specification-failure case in the legal register. Dimensions tested: D₁ + D₃.

**US: *Romer v Evans*: equivalent BORCO = 74 (High drift).** Colorado’s Amendment 2 purported to prevent “special rights” for gay and lesbian residents; its operative effect was to revoke all existing municipal anti-discrimination protections (Denver, Boulder, Aspen) and to bar future ones. Justice Kennedy, for a 6-3 majority, struck the amendment even under rational-basis review: the law’s “sheer breadth is so discontinuous with the reasons offered for it” that it identified persons by a single trait and denied them protection across the board. The proxy (categorical exclusion) had separated from any legitimate state interest so fully that the Court inferred the real aim was animus.[^64] This is the US version of Canadian purpose-effect review without abandoning the deferential standard’s nominal structure — what US scholarship has labelled “rational basis with bite.” Primary dimension: D₁.

**UK: *A v Secretary of State for the Home Department (Belmarsh)*: equivalent BORCO = 82 (Severe specification failure).** Section 23 of the Anti-Terrorism, Crime and Security Act 2001 permitted indefinite detention without trial of foreign-national terror suspects whom the United Kingdom could not deport (deportation would have breached ECHR Article 3). Lord Bingham, writing for an 8-1 majority, found the regime disproportionate and discriminatory and issued a declaration of incompatibility under HRA s. 4.[^65] The regime was simultaneously *under-inclusive* (British nationals posing equal or greater threat were untouched) and *over-inclusive* (detention was indefinite and applied to persons the state could not lawfully remove). Dimensions tested: D₃ + D₄.

**UK: *Salvesen v Riddell*: equivalent BORCO = 76 (High drift).** *Salvesen v Riddell* is a landmark UK constitutional law case where the UK Supreme Court struck down Scottish legislation (for the first time), ruling that an agricultural tenancy law passed by the Scottish Parliament violated landlords’ property rights arbitrarily and was therefore outside its legislative competence (*ultra vires*).[^66] The proxy (date-based categorization) had disconnected from the stated end (fair tenancy reform) to the point of arbitrariness, and the devolution-competence frame produced an outcome stronger than HRA s. 4 because it denied legislative competence altogether. Structurally, the case is the UK twin of *Ndhlovu*: a good-faith reform whose specification had lost contact with its purpose. Dimensions tested: D₁ + D₂.

The full prototype corpus (fifteen laws) includes mandatory-minimum provisions under Criminal Code s. 95 (pre-*Nur*), Quebec’s Bill 21, Alberta’s *Critical Infrastructure Defence Act*, BC civil forfeiture’s unexplained-wealth-order provisions, Toronto parks encampment enforcement, Vancouver’s street-and-traffic bylaw camping provisions, Montreal’s Bylaw P-6 pre-strike, Calgary’s anti-solicitation bylaw, the *Anti-Terrorism Act, 2015* (Bill C-51), and Section 13 CHRA (pre-repeal), and, for contrast, two low-coefficient instances — the *Ontario Not-for-Profit Corporations Act* (BORCO = 14) and *Vancouver’s Noise Control Bylaw* \#6555 (BORCO = 12) — demonstrating that the Coefficient rewards narrow purpose-effect tracking, not just catches overreach.

# VII. Objections, Limitations, and Nearest Competitors

The paper has placed its descriptive and doctrinal predecessors in the parts above.[^67] What remains is to address the potential objections and limits, and to give special mention to two contemporary papers.

**The dialogue-theory objection.** Peter Hogg and Allison Bushell argued that Charter review establishes a dialogue between courts and legislatures rather than judicial supremacy.[^68] As such, dialogue theory highlights the challenge with treating statutes as static instruments: they are tested through litigation and then narrowed or better tailored thereafter, the argument goes. The frequency of Canadian constitutional litigation is, however, vastly overstated here. Dialogue is an apt description of Canada’s constitutional architecture, but operationally judicial review is the exception to the rule that most Canadian laws go untested and are not subject to any dialogue with another branch of the state. Moreover, this paper proposes structural changes that could affect the dialogue effectively.

**The relevance objection.** Once the alignment vocabulary is stripped away, what does the Coefficient add to Merton, Campbell, Goodhart, and the public-choice theorists? First, the quantitative specification has value, with operational scoring across five dimensions. Second, the internal or mesa-optimization lens brings attention to the training process by which a bureaucracy develops revealed objectives distinct from the statute that codifies it. Third, a prospective design is offered (Part VIII) that the descriptive traditions do not explicitly furnish.

**Under-reach.** The Coefficient measures over-reach because Borovoy measured over-reach. It does not catch laws that fail by doing too little (inadequate environmental regulation, under-enforcement of monopoly restraint, tenant-protection gaps). This is a genuine limitation of the thesis, disclosed in the spec (Limitation 1). A reciprocal *Regulatory-Gap Coefficient* is future work.

**Indigenous legal theory.** The Coefficient seeks to capture the instrumental-rationality tradition that runs from Hogg through Stewart and Fehr.[^69] It treats the law’s “mark” as its stated purpose and asks whether the operative effect tracks that purpose. Indigenous legal scholarship reframes the question relationally rather than instrumentally: what does it mean for a law to hit its mark when Crown honour and treaty obligations are part of the target? The Coefficient as presently designed cannot model that prior question. This is a genuine and material limitation, for which further research and analysis is needed, primarily through consultation with Indigenous voices and scholars like Val Napoleon, John Borrows, and Douglas Sanderson.[^70]

**The nearest competitors.** Two recent papers are excellent doctrinal neighbours or exemplars. Guha and colleagues argue that AI regulation itself exhibits vertical and horizontal alignment failures;[^71] they borrow alignment vocabulary for institutional analysis. Kolt and colleagues invoke Goodhart’s Law explicitly in a legal-doctrine context.[^72] The Coefficient treats the statute as the objective function and operationalizes the gap, which may constitute an important distinction for the doctrine.

# VIII. The Borovoy Drafting Principles

The Coefficient is descriptive, but it points toward prospective reforms. Five drafting principles, drawn from the research record and from the spec, would reduce Borovoy Coefficients at source:

1.  **Sunset clauses** requiring affirmative re-enactment on a five- or ten-year cycle. This has been Borovoy’s ask on national-security legislation since 2001. Sunset clauses are the legislative analogue of a retraining interval — they force the drafter to re-specify the objective in light of observed effects, closing the outer-alignment loop at a definite cadence rather than relying on stochastic judicial intervention.

2.  **Purpose-effect reporting.** A statutory obligation on responsible ministers to publish annual data on whether the law is achieving its stated purpose, using defined metrics. This is a legislative analogue of an alignment benchmark. Without it, D₁ is unmeasurable at source.

3.  **Disparate-impact dashboards.** Mandatory publication of enforcement data disaggregated by geography, income, and (where constitutionally required) protected grounds. D₅ is unmeasurable without this. CCLA has been asking for disparate-impact reporting on police services since the 1990s; it remains largely absent from Canadian enforcement-data infrastructure.

4.  **Narrowing presumption.** Courts should read statutory language narrowly in Charter-adjacent fields unless drafters have used plain expansive language. This tightens D₃ at construction and forces drafters who want broad scope to ask for it explicitly, pricing the drafting choice rather than burying it.

5.  **Independent oversight bodies with enforceable powers.** Not advisory review committees à la the Security Intelligence Review Committee, but bodies with order-making authority on a statutory footing, closing the mesa-optimization loop Borovoy flagged from 1984 onward. The 2019 *Access to Information Act* reforms partially moved in this direction by giving the Information Commissioner order-making powers; much more is possible.

These principles can be drawn from advocacy by CCLA and kindred organizations for decades. On the US side, the ACLU’s centennial retrospective assembles a century of this advocacy in one volume;[^73] on the Canadian side, Marian Botsford Fraser’s *Acting for Freedom: Fifty Years of Civil Liberties in Canada* (2014) performs the same function for CCLA’s first half-century;[^74] and in the United Kingdom, Liberty (founded 1934 as the National Council for Civil Liberties) has maintained a parallel tradition of structural rights advocacy.[^75] What is new is the assembly of these principles into a coherent prospective architecture keyed to a measurement instrument.

# IX. Implications for Legal Discourse

The idea that legal discourse can be mathematics is both radical and self-evident. The laws of some jurisdictions are literally labelled “code,” so this should be conceptually unsurprising, but make no mistake about it: the concept of a legal code, as it is understood in the field of Computational Law, is a development of significant proportions for systems of justice, no matter the jurisdiction.

If I had proposed the foregoing when I served as Attorney General in Ontario, twenty years ago, it would have been scandalous. Not so in the contemporary era, thanks to computational and AI developments. Legal tech startups the world over are trying to train AI models to engage in legal discourse.

Just because Silicon Valley, Montreal and London find venture capital to pursue the impossibly impractical, however, does not mean that it’s inevitable. Although there are eminent scholars in the field today, today only little known pilot projects collaborate with sovereign government departments, on a micro-scale. This subject could develop into a monumental paradigm shift, particularly given the centrality of the rule of law within democracies, globally.

Currently, no sovereign jurisdiction has replaced its binding natural language laws with computational code, though governments like New Zealand, Canada, and France are experimentally utilizing “Rules as Code” methodologies to draft machine-executable logic concurrently with traditional legislation.[^76]

Instead of substituting the constitutionally authoritative text, these international pilot programs deploy the code as a supplementary administrative tool to mathematically test policy logic and automate public service delivery while preserving the legal supremacy of human-readable law.[^77]

China seems to be the furthest ahead on adoption of AI in its public sector, yet the stance of the Chief Justice and President of the Supreme People’s Court of China is that “AI will never replace human judges and can only serve judges \[as assistants\].”[^78] All this is a far cry from the Borovoy Coefficient having legal effect.

My purpose is not legal effect. The Coefficient is released as open source and without charge, on the view that instruments of this kind should be available to self-represented litigants, publicly funded clinics, and small practices, and not only to the well-resourced.[^79]

# X. Conclusion

The Borovoy Coefficient does not replace Borovoy but it could operationalize him. Or rather a tool that eventually assists lawyers, legislative drafters, governments, and civil society. The diagnostic frame he carried could be characterized by infinite identifiers. Identifying it with Borovoy is intended as a tribute, to be sure, but the personification of a coefficient could improve adoption.

Borovoy’s many contributions are powerful human expressions and principles, which may be translated into the vocabulary of machine-learning alignment, a precise technical claim. Governments and ML systems miss the mark through overlapping failure modes well catalogued in the four-variant Goodhart taxonomy. Bureaucracies and neural networks are both optimizers trained on proxies for goals that resist full specification. Further, both start gaming the specification once conditions drift from original intent, by satisfying the letter of their objective while abandoning its purpose.

Hennessy and Goodhart (2023) have shown that the two settings admit a common structural treatment; whether the resulting models are merely kin is a question for a more technical paper than this one. The observation that the same structural techniques apply is enough to warrant an instrument.

If Borovoy were still in the field he would, I think, be unsurprised by this identification, even if he found the technology laughable. He spent his career reminding Canadians that noble purposes and broad drafting are a dangerous combination, and he spent it asking for parliamentary sunset clauses and hard-powered oversight rather than promises of judicial discretion. Borovoy’s cautions and proposed remedies are the very reforms the alignment literature in computer science now calls *corrigibility* properties — design features that keep a powerful system correctable by its human operators — and for systems that must remain under human control. “Obey the law but stick it to the government anyway,” he wrote in *Uncivil Obedience* (1991). Measurement, publication, and reform is the 2026 grammar of that disobedience.

# References

## Secondary Sources

Alexy, Robert. *A Theory of Constitutional Rights*, translated by Julian Rivers. Oxford University Press, 2002.

Amodei, Dario, et al. *Concrete Problems in AI Safety*. arXiv:1606.06565, 2016.

Barak, Aharon. *Proportionality: Constitutional Rights and Their Limitations*. Cambridge University Press, 2012.

Borovoy, A. Alan. *When Freedoms Collide: The Case for Our Civil Liberties*. Toronto: Lester & Orpen Dennys, 1988.

Borovoy, A. Alan. *Uncivil Obedience: The Tactics and Tales of a Democratic Agitator*. Toronto: Lester Publishing, 1991.

Borovoy, A. Alan. *The New Anti-Liberals*. Toronto: Victoria University, 1999.

Borovoy, A. Alan. *Categorically Incorrect: Ethical Fallacies in Canada’s War on Terror*. Toronto: Dundurn Press, 2007.

Borovoy, A. Alan. *At the Barricades: A Memoir*. Toronto: Irwin Law, 2013.

Borovoy, Alan. Interview with Caitlin Smith. *Freedom to Read*, 2010.

Borovoy, Alan. Testimony of the Canadian Civil Liberties Association. *Proceedings of the Special Senate Committee on the Subject-matter of Bill C-36*, 37th Parl, 1st Sess, Issue 3 (24 October 2001); and House of Commons Standing Committee on Justice and Human Rights, 37th Parl, 1st Sess, Meeting 33.

Buchanan, James M., and Gordon Tullock. *The Calculus of Consent: Logical Foundations of Constitutional Democracy*. University of Michigan Press, 1962.

*The Cambridge Handbook of Private Law and Artificial Intelligence*. Cambridge University Press, 2024.

Camerer, Colin F., et al. “Evaluating the Replicability of Social Science Experiments in *Nature* and *Science* Between 2010 and 2015” (2018) 2 *Nature Human Behaviour* 637.

Campbell, Donald T. “Assessing the Impact of Planned Social Change” (1979) 2 *Evaluation and Program Planning* 67.

Chabon, Michael, and Ayelet Waldman, eds. *Fight of the Century: Writers Reflect on 100 Years of Landmark ACLU Cases*. Avid Reader Press / Simon & Schuster, 2020.

Christian, Brian. *The Alignment Problem: Machine Learning and Human Values*. New York: WW Norton & Company, 2020.

Cohen, Michael K., Marcus Hutter, and Michael A. Osborne. “Advanced Artificial Agents Intervene in the Provision of Reward” (2022) 43 *AI Magazine* 282.

Cose, Ellis. *Democracy, If We Can Keep It: The ACLU’s 100-Year Fight for Rights in America*. The New Press, 2020.

Dahl, Matthew, Varun Magesh, Mirac Suzgun, and Daniel E. Ho. “Large Legal Fictions: Profiling Legal Hallucinations in Large Language Models” (2024) 16 *Journal of Legal Analysis* 64.

de Lacey, Gerald, Carolyn Record, and John Wade. “How Accurate Are Quotations and References in Medical Journals?” (1985) 291 *British Medical Journal* 884.

Deb, Kalyanmoy. *Multi-Objective Optimization Using Evolutionary Algorithms*. Wiley, 2001.

European Broadcasting Union and BBC. *News Integrity in AI Assistants*. October 2025.

Fanelli, Daniele. “How Many Scientists Fabricate and Falsify Research?” (2009) 4:5 *PLoS ONE* e5738.

Fehr, Colton. “Re-Thinking the Instrumental Rationality Principles of Fundamental Justice” (2020) 58:1 *Alberta Law Review* 133.

Fraser, Marian Botsford. *Acting for Freedom: Fifty Years of Civil Liberties in Canada*. Toronto: Second Story Press, 2014.

Fuller, Lon L. *The Morality of Law*. Yale University Press, 1964.

Goodhart, Charles A.E. “Problems of Monetary Management: The U.K. Experience” (1975), in *Papers in Monetary Economics*, vol I. Reserve Bank of Australia.

Guha, Neel, et al. “AI Regulation Has Its Own Alignment Problem: The Technical and Institutional Feasibility of Disclosure, Registration, Licensing, and Auditing” (2024) 92:6 *George Washington Law Review* 1473.

Hacker, Jacob S. “Privatizing Risk Without Privatizing the Welfare State: The Hidden Politics of Social Policy Retrenchment in the United States” (2004) 98 *American Political Science Review* 243.

Hennessy, Christopher A., and Charles A.E. Goodhart. “Goodhart’s Law and Machine Learning: A Structural Perspective” (2023) 64:3 *International Economic Review* 1075.

Hildebrandt, Mireille. *Code-driven Law: Freezing the Future and Scaling the Past*. 2020.

Hogg, Peter W., and Allison A. Bushell. “The Charter Dialogue Between Courts and Legislatures” (1997) 35 *Osgoode Hall Law Journal* 75.

Hubinger, Evan, et al. *Risks from Learned Optimization in Advanced Machine Learning Systems*. arXiv:1906.01820, 2019.

Kolt, Noam, et al. *Legal Alignment for Safe and Ethical AI*. Oxford AI Governance Institute working paper, January 2026. arXiv:2601.04175.

Krakovna, Victoria, et al. *Specification Gaming: The Flip Side of AI Ingenuity*. DeepMind Safety Research, 2020.

Liberty (formerly the National Council for Civil Liberties). *Liberty’s Annual Report 2024–25*. London: Liberty, 2025.

Magesh, Varun, et al. “Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools” *Journal of Empirical Legal Studies* (forthcoming 2025).

Maier, Scott R. “Accuracy Matters: A Cross-Market Assessment of Newspaper Error and Credibility” (2005) 82 *Journalism & Mass Communication Quarterly* 533.

Manheim, David, and Scott Garrabrant. *Categorizing Variants of Goodhart’s Law*. arXiv:1803.04585, 2018.

Mattson, C., R.L. Bushardt, and A.R. Artino Jr. “When a Measure Becomes a Target, It Ceases to be a Good Measure” (2021) 13:1 *Journal of Graduate Medical Education* 2.

Merton, Robert K. “The Unanticipated Consequences of Purposive Social Action” (1936) 1 *American Sociological Review* 894.

Napoleon, Val. *Ayook: Gitksan Legal Order, Law, and Legal Theory*. PhD dissertation, University of Victoria, 2009.

New Zealand Service Innovation Lab. “Better Rules Approach.” 2018.

OECD Observatory of Public Sector Innovation. “Rules as Code in Canada.” 2024.

Open Science Collaboration. “Estimating the Reproducibility of Psychological Science” (2015) 349 *Science* aac4716.

Schroter, Sara, et al. “What Errors Do Peer Reviewers Detect, and Does Training Improve Their Ability to Detect Them?” (2008) 101 *Journal of the Royal Society of Medicine* 507.

Scott, James C. *Seeing Like a State: How Certain Schemes to Improve the Human Condition Have Failed*. Yale University Press, 1998.

Siegel, Reva B. “*The Rule of Love*: Wife Beating as Prerogative and Privacy” (1996) 105 *Yale Law Journal* 2117.

Singh, Amitpal C., and Douglas Sanderson. “Why Is Aboriginal Title Property if It Looks Like Sovereignty?” (2021) 34:2 *Canadian Journal of Law & Jurisprudence* 417.

Stewart, Hamish. “Bedford and the Structure of Section 7” (2015) 60:3 *McGill Law Journal* 575.

Stewart, Hamish. “Overbreadth Revisited” (2024) 69:3 *McGill Law Journal* 247.

Stigler, George J. “The Theory of Economic Regulation” (1971) 2 *Bell Journal of Economics and Management Science* 3.

Strathern, Marilyn. “ ‘Improving Ratings’: Audit in the British University System” (1997) 5 *European Review* 305.

“Ultra Vires.” Wex, Legal Information Institute, Cornell Law School.

Van Noorden, Richard. “More Than 10,000 Research Papers Were Retracted in 2023” *Nature* (12 December 2023).

Wang, Nyu, and Michael Yuan Tian. “ ‘Intelligent Justice’: Human-Centered Considerations in China’s Legal AI Transformation” (2023) 3:349 *AI & Ethics*.

Wiener, Norbert. “Some Moral and Technical Consequences of Automation” (1960) 131 *Science* 1355.

## Jurisprudence

*A v Secretary of State for the Home Department (Belmarsh)* \[2004\] UKHL 56.

*AXA General Insurance Ltd v Lord Advocate* \[2011\] UKSC 46.

*Bank Mellat v HM Treasury (No 2)* \[2013\] UKSC 39.

*Biden v Nebraska*, 600 US 477 (2023).

*Broadrick v Oklahoma*, 413 US 601 (1973).

*Buckley v Valeo*, 424 US 1 (1976).

*Canada (Attorney General) v Bedford*, 2013 SCC 72, \[2013\] 3 SCR 1101.

*Canada (Minister of Citizenship and Immigration) v Vavilov*, 2019 SCC 65, \[2019\] 4 SCR 653.

*Canadian Frontline Nurses v Canada (Attorney General)*, 2024 FC 42, aff’d 2026 FCA 6.

*Charkaoui v Canada (Citizenship and Immigration)*, 2007 SCC 9, \[2007\] 1 SCR 350.

*Church of Lukumi Babalu Aye v Hialeah*, 508 US 520 (1993).

*Fair Change Community Legal Clinic v Ontario (Attorney General)*, 2024 ONSC 1895.

*Ghaidan v Godin-Mendoza* \[2004\] UKHL 30.

*Johnson v United States*, 576 US 591 (2015).

*R (Daly) v Home Secretary* \[2001\] UKHL 26.

*R (Miller) v Prime Minister (Miller II)* \[2019\] UKSC 41.

*R (Nicklinson) v Ministry of Justice* \[2014\] UKSC 38.

*R (Roberts) v Metropolitan Police Commissioner* \[2015\] UKSC 79.

*R (SC) v Secretary of State for Work and Pensions* \[2021\] UKSC 26.

*R v Heywood*, \[1994\] 3 SCR 761.

*R v Le*, 2019 SCC 34, \[2019\] 2 SCR 692.

*R v Ndhlovu*, 2022 SCC 38.

*R v Nova Scotia Pharmaceutical Society*, \[1992\] 2 SCR 606.

*R v Nur*, 2015 SCC 15.

*R v Oakes*, \[1986\] 1 SCR 103.

*Reed v Town of Gilbert*, 576 US 155 (2015).

*Romer v Evans*, 517 US 620 (1996).

*Salvesen v Riddell* \[2013\] UKSC 22.

*Sessions v Dimaya*, 584 US 148 (2018).

*United States v Davis*, 139 S Ct 2319 (2019).

*United States v Stevens*, 559 US 460 (2010).

*Washington v Davis*, 426 US 229 (1976).

*Washington v Glucksberg*, 521 US 702 (1997).

*West Virginia v Environmental Protection Agency*, 597 US 697 (2022).

*Youngberg v Romeo*, 457 US 307 (1982).

## Legislation

*Agricultural Holdings (Scotland) Act 2003* (ASP 11).

*An Act to amend the Canadian Human Rights Act (protecting freedom)*, SC 2013, c 37.

*Anti-Terrorism, Crime and Security Act 2001* (UK), c 24.

*Canadian Charter of Rights and Freedoms*, Part I of the *Constitution Act, 1982*, being Schedule B to the *Canada Act 1982* (UK), 1982, c 11.

*Canadian Human Rights Act*, RSC 1985, c H-6.

European Convention on Human Rights, Protocol 1, Article 1.

*Human Rights Act 1998* (UK), c 42.

*Ontario Safe Streets Act*, SO 1999, c 8.

*Scotland Act 1998* (UK), c 46.

*Cite as: Michael Bryant, “The Borovoy Coefficient: A Civil-Liberties Measure of Legislative Alignment” (version 1.6, April 2026), justack.ai/borovoy. The text of this paper is released under a Creative Commons Attribution 4.0 International (CC BY 4.0) licence; the companion measurement instrument, scoring methodology, prototype corpus, and open dashboard are licensed separately, as set out at justack.ai/borovoy.*

[^1]: Archival materials pertaining to A. Alan Borovoy are primarily housed at two institutions: Borovoy’s institutional papers appear principally in the Canadian Civil Liberties Association Papers at Library and Archives Canada, R9833. A separate A. Alan Borovoy collection is also listed by the Alex Dworkin Canadian Jewish Archives as P0022.

[^2]: “Ultra Vires,” Wex, Legal Information Institute, Cornell Law School, <https://www.law.cornell.edu/wex/ultra_vires>.

[^3]: Christopher A Hennessy & Charles AE Goodhart, “Goodhart’s Law and Machine Learning: A Structural Perspective” (2023) 64:3 Int’l Econ Rev 1075, DOI 10.1111/iere.12633, open-access version at <https://eprints.lse.ac.uk/118656/>.

[^4]: In *R v Ndhlovu*, 2022 SCC 38, the Supreme Court of Canada invalidated a mandatory sex-offender registry provision because its effects captured many people who did not present the risk the law purported to address.

[^5]: Founder, justack.ai; 35th Attorney General of Ontario; former CEO, Legal Aid BC; former General Counsel and Executive Director, Canadian Civil Liberties Association (2018–2022); Counsel, Fogler Rubinoff LLP. In honour of Alfred Alan Borovoy, O.C. (1932–2015), General Counsel of the Canadian Civil Liberties Association (1968–2009). Companion instrument, specification, prototype corpus, and open dashboard at <https://justack.ai/borovoy>; reference implementation at <https://github.com/mjbryant66/Borovoy-Formula> (MPL-2.0). Correspondence: michael@justack.ai.

[^6]: Brian Christian, *The Alignment Problem: Machine Learning and Human Values* (New York: WW Norton & Company, 2020).

[^7]: Marian Botsford Fraser, *Acting for Freedom: Fifty Years of Civil Liberties in Canada* (Toronto: Second Story Press, 2014).

[^8]: My materials referenced “missing the mark” in a lecture delivered at the Massey College / University of Toronto privacy class (2020), and elaborated in a *Pandemic Litigation* lecture at McGill University Faculty of Law (9 November 2021). Borovoy’s own vocabulary favoured “too broad,” “vagueness,” and the intent-vs-effect distinction, as reflected in his testimony before the Special Senate Committee on Bill C-36 (24 October 2001): *“The crux of the issue, in our view, is that the bill is too broad. At the heart of that is the definition of ‘terrorist activity.’ Everything flows from that definition. … It is important, however, that we distinguish intent from effect. Whether or not that was the intent of the bill, the risk is that that might be the effect of the bill.”* (cited *supra*.) The archery framing is the author’s analogical tribute to a great predecessor’s underlying idea.

[^9]: Biomedical misquotation: Gerald de Lacey, Carolyn Record & John Wade, “How Accurate Are Quotations and References in Medical Journals?” (1985) 291 *British Medical Journal* 884. Social-science replication: Open Science Collaboration, “Estimating the Reproducibility of Psychological Science” (2015) 349 *Science* aac4716 (36%); Colin F. Camerer et al., “Evaluating the Replicability of Social Science Experiments in *Nature* and *Science* Between 2010 and 2015” (2018) 2 *Nature Human Behaviour* 637 (62%). Journalism: Scott R. Maier, “Accuracy Matters: A Cross-Market Assessment of Newspaper Error and Credibility” (2005) 82 *Journalism & Mass Communication Quarterly* 533 (48%). Legal LLM hallucination: Matthew Dahl, Varun Magesh, Mirac Suzgun & Daniel E. Ho, “Large Legal Fictions: Profiling Legal Hallucinations in Large Language Models” (2024) 16 *Journal of Legal Analysis* 64 (58-88% bare-model); Varun Magesh et al., “Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools,” *Journal of Empirical Legal Studies* (forthcoming 2025) (Lexis+ AI ~17%, Westlaw AI ~34%, Ask Practical Law ~17%). See also European Broadcasting Union & BBC, *News Integrity in AI Assistants* (October 2025); Richard Van Noorden, “More Than 10,000 Research Papers Were Retracted in 2023” *Nature* (12 December 2023); Daniele Fanelli, “How Many Scientists Fabricate and Falsify Research?” (2009) 4:5 *PLoS ONE* e5738.

[^10]: Sara Schroter et al., “What Errors Do Peer Reviewers Detect, and Does Training Improve Their Ability to Detect Them?” (2008) 101 *Journal of the Royal Society of Medicine* 507, https://doi.org/10.1258/jrsm.2008.080062 (trained reviewers detected only 2.6 of 9 deliberately inserted major methodological errors at baseline; training produced small, non-durable improvements).

[^11]: A. Alan Borovoy, *When Freedoms Collide: The Case for Our Civil Liberties* (Toronto: Lester & Orpen Dennys, 1988); *Uncivil Obedience: The Tactics and Tales of a Democratic Agitator* (Toronto: Lester Publishing, 1991); *The New Anti-Liberals* (Toronto: Victoria University, 1999); *Categorically Incorrect: Ethical Fallacies in Canada’s War on Terror* (Toronto: Dundurn Press, 2007); and *At the Barricades: A Memoir* (Toronto: Irwin Law, 2013).

[^12]: Alan Borovoy, Testimony of the Canadian Civil Liberties Association, *Proceedings of the Special Senate Committee on the Subject-matter of Bill C-36*, 37th Parl, 1st Sess, Issue 3 (24 October 2001), https://sencanada.ca/en/Content/Sen/committee/371/sm36/03eva-e. See also Borovoy’s testimony before the House of Commons Standing Committee on Justice and Human Rights, 37th Parl, 1st Sess, Meeting 33 (24 October 2001).

[^13]: *Ibid.*

[^14]: Alan Borovoy, quoted in the public debate preceding the 2014 repeal of *Canadian Human Rights Act* s. 13; see also Alan Borovoy, interview with Caitlin Smith in *Freedom to Read* 2010, https://www.freedomtoread.ca/articles/challenges-in-every-generation-alan-borovoy-in-conversation/ (“The law is so broad that you never know who or what might get nailed under it. There is no defence for truth, or reasonable belief in truth.”).

[^15]: *Canadian Human Rights Act*, RSC 1985, c H-6, s. 13 (as it read before repeal); repealed by *An Act to amend the Canadian Human Rights Act (protecting freedom)*, SC 2013, c 37, in force 26 June 2014.

[^16]: *Charkaoui v Canada (Citizenship and Immigration)*, 2007 SCC 9, \[2007\] 1 SCR 350.

[^17]: *R v Nur*, 2015 SCC 15.

[^18]: *R v Ndhlovu*, 2022 SCC 38. The majority reasons (Karakatsanis J.) rely on Crown-adduced evidence of recidivism rates to hold mandatory and lifetime sex-offender registration overbroad under s. 7, on the ground that automatic registration of a cohort of which 75-80% never reoffends is disconnected from the Act’s investigative and preventive purposes.

[^19]: *Canadian Frontline Nurses v Canada (Attorney General)*, 2024 FC 42, aff’d 2026 FCA 6.

[^20]: Norbert Wiener, “Some Moral and Technical Consequences of Automation” (1960) 131 *Science* 1355.

[^21]: Lon L. Fuller, *The Morality of Law* (Yale University Press, 1964), chap. 2, enumerating the eight ways law can fail “to be law on its own terms,” the eighth being “a failure of congruence between the rules as announced and their actual administration.” Fuller’s allegorical King Rex is, on a modern reading, a mesa-optimizer failing inner alignment.

[^22]: Evan Hubinger et al., *Risks from Learned Optimization in Advanced Machine Learning Systems*, arXiv:1906.01820 (2019).

[^23]: Brian Christian, *The Alignment Problem: Machine Learning and Human Values* (New York: WW Norton & Company, 2020), explains this divergence for a general audience; for the formal treatment see Hubinger et al., *Risks from Learned Optimization*, *supra*, and Dario Amodei et al., *Concrete Problems in AI Safety*, arXiv:1606.06565 (2016).

[^24]: “Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes.” Charles A.E. Goodhart, “Problems of Monetary Management: The U.K. Experience” (1975), in *Papers in Monetary Economics*, vol I (Reserve Bank of Australia); compressed by Marilyn Strathern, “ ‘Improving Ratings’: Audit in the British University System” (1997) 5 *European Review* 305; see also Mattson C, Bushardt RL, Artino AR Jr, “When a Measure Becomes a Target, It Ceases to be a Good Measure” (2021) 13:1 *J Grad Med Educ* 2, DOI 10.4300/JGME-D-20-01492.1.

[^25]: David Manheim & Scott Garrabrant, *Categorizing Variants of Goodhart’s Law*, arXiv:1803.04585 (2018).

[^26]: Victoria Krakovna et al., *Specification Gaming: The Flip Side of AI Ingenuity* (DeepMind Safety Research, 2020).

[^27]: Dario Amodei et al., *Concrete Problems in AI Safety*, arXiv:1606.06565 (2016).

[^28]: Michael K. Cohen, Marcus Hutter & Michael A. Osborne, “Advanced Artificial Agents Intervene in the Provision of Reward” (2022) 43 *AI Magazine* 282.

[^29]: James M. Buchanan & Gordon Tullock, *The Calculus of Consent: Logical Foundations of Constitutional Democracy* (University of Michigan Press, 1962); George J. Stigler, “The Theory of Economic Regulation” (1971) 2 *Bell Journal of Economics and Management Science* 3.

[^30]: James C. Scott, *Seeing Like a State: How Certain Schemes to Improve the Human Condition Have Failed* (Yale University Press, 1998).

[^31]: Donald T. Campbell, “Assessing the Impact of Planned Social Change” (1979) 2 *Evaluation and Program Planning* 67.

[^32]: Hennessy and Goodhart, *Goodhart’s Law and Machine Learning: A Structural Perspective*, 64 *International Economic Review* 1075 (2023).

[^33]: Jacob S. Hacker, “Privatizing Risk Without Privatizing the Welfare State: The Hidden Politics of Social Policy Retrenchment in the United States” (2004) 98 *American Political Science Review* 243.

[^34]: *Canada (Attorney General) v Bedford*, 2013 SCC 72, \[2013\] 3 SCR 1101; *R v Nur*, 2015 SCC 15; *R v Ndhlovu*, 2022 SCC 38.

[^35]: *Johnson v United States*, 576 US 591 (2015); *Sessions v Dimaya*, 584 US 148 (2018); *United States v Davis*, 139 S Ct 2319 (2019); *Romer v Evans*, 517 US 620 (1996). Reva Siegel’s “*The Rule of Love*: Wife Beating as Prerogative and Privacy” (1996) 105 Yale LJ 2117, which introduces the “preservation-through-transformation” framework, is the theoretical anchor of the US missing-the-mark tradition.

[^36]: *Bank Mellat v HM Treasury (No 2)* \[2013\] UKSC 39; Human Rights Act 1998 (UK), c 42, s. 4; *A v Secretary of State for the Home Department (Belmarsh)* \[2004\] UKHL 56.

[^37]: *West Virginia v Environmental Protection Agency*, 597 US 697 (2022); *Biden v Nebraska*, 600 US 477 (2023).

[^38]: See *R (Miller) v Prime Minister (Miller II)* \[2019\] UKSC 41; *Salvesen v Riddell* \[2013\] UKSC 22; *AXA General Insurance Ltd v Lord Advocate* \[2011\] UKSC 46; Scotland Act 1998, s 29.

[^39]: *Canadian Human Rights Act*, RSC 1985, c H-6, s. 13 (as it stood before repeal); repealed by SC 2013, c 37 (in force 26 June 2014). See *supra* footnote on s. 13 repeal.

[^40]: Robert K. Merton, “The Unanticipated Consequences of Purposive Social Action” (1936) 1 *American Sociological Review* 894.

[^41]: *R v Oakes*, \[1986\] 1 SCR 103.

[^42]: Textual variations carry a range of implications, from trivial to catastrophic. Spell-check programs check textual variations like a (human) copy editor does for publications. A typo is an error and can be a significant error for some contexts (misspelling a prospective employer on a job application), trivial in others. Textual variations for encrypted identification can be catastrophic, for military personnel approving a strike. Put another way, there is text and there is text. For the legal scholar, everything is text. Our discourse is through oral and written communications, captured in text. The implications of “textually-broken statutes,” therefore, deserve a library of commentary, though a section later will suffice (see *infra*).

[^43]: *Canada (Minister of Citizenship and Immigration) v Vavilov*, 2019 SCC 65, \[2019\] 4 SCR 653.

[^44]: *West Virginia v Environmental Protection Agency*, 597 US 697 (2022); *Biden v Nebraska*, 600 US 477 (2023).

[^45]: Human Rights Act 1998 (UK), c 42, s. 3; *Ghaidan v Godin-Mendoza* \[2004\] UKHL 30.

[^46]: *R v Oakes*, \[1986\] 1 SCR 103.

[^47]: *Buckley v Valeo*, 424 US 1 (1976); *Church of Lukumi Babalu Aye v Hialeah*, 508 US 520 (1993); *Reed v Town of Gilbert*, 576 US 155 (2015).

[^48]: *Bank Mellat v HM Treasury (No 2)* \[2013\] UKSC 39; *R (Daly) v Home Secretary* \[2001\] UKHL 26.

[^49]: On Pareto efficiency and multi-objective optimization, see Kalyanmoy Deb, *Multi-Objective Optimization Using Evolutionary Algorithms* (Wiley 2001). On the deeper affinity between constitutional proportionality and formal optimization, see Robert Alexy, *A Theory of Constitutional Rights* (Julian Rivers trans., OUP 2002) 401–414 (the “Weight Formula”); and Aharon Barak, *Proportionality: Constitutional Rights and Their Limitations* (Cambridge 2012) 340–370.

[^50]: *R v Heywood*, \[1994\] 3 SCR 761; *Canada (Attorney General) v Bedford*, 2013 SCC 72, \[2013\] 3 SCR 1101; *R v Ndhlovu*, 2022 SCC 38; *R v Nova Scotia Pharmaceutical Society*, \[1992\] 2 SCR 606.

[^51]: Hamish Stewart, “Overbreadth Revisited” (2024) 69:3 *McGill Law Journal* 247; see also Stewart, “Bedford and the Structure of Section 7” (2015) 60:3 *McGill Law Journal* 575.

[^52]: *Broadrick v Oklahoma*, 413 US 601 (1973); *United States v Stevens*, 559 US 460 (2010); *Johnson v United States*, 576 US 591 (2015); *Sessions v Dimaya*, 584 US 148 (2018); *United States v Davis*, 139 S Ct 2319 (2019).

[^53]: *A v Secretary of State for the Home Department* \[2004\] UKHL 56.

[^54]: *Charkaoui v Canada (Citizenship and Immigration)*, 2007 SCC 9.

[^55]: *Youngberg v Romeo*, 457 US 307 (1982); *Washington v Glucksberg*, 521 US 702 (1997).

[^56]: *A v Secretary of State for the Home Department* \[2004\] UKHL 56; *R (Nicklinson) v Ministry of Justice* \[2014\] UKSC 38.

[^57]: *R v Le*, 2019 SCC 34, \[2019\] 2 SCR 692.

[^58]: *Washington v Davis*, 426 US 229 (1976); Reva Siegel, “*The Rule of Love*: Wife Beating as Prerogative and Privacy” (1996) 105 Yale LJ 2117 (introducing the “preservation-through-transformation” framework).

[^59]: *R (SC) v Secretary of State for Work and Pensions* \[2021\] UKSC 26; *R (Roberts) v Metropolitan Police Commissioner* \[2015\] UKSC 79.

[^60]: *Charkaoui v Canada (Citizenship and Immigration)*, 2007 SCC 9, \[2007\] 1 SCR 350, at para 53.

[^61]: *R v Ndhlovu*, 2022 SCC 38. See *supra* note on *Ndhlovu* and regressional Goodhart.

[^62]: *Ontario Safe Streets Act*, SO 1999, c 8; *Fair Change Community Legal Clinic v Ontario (Attorney General)*, 2024 ONSC 1895.

[^63]: *Johnson v United States*, 576 US 591 (2015); *Sessions v Dimaya*, 584 US 148 (2018); *United States v Davis*, 139 S Ct 2319 (2019).

[^64]: *Romer v Evans*, 517 US 620 (1996), at 632 (Kennedy J).

[^65]: *A v Secretary of State for the Home Department* \[2004\] UKHL 56; Human Rights Act 1998 (UK), c 42, s. 4. See also Anti-Terrorism, Crime and Security Act 2001 (UK), c 24, s. 23.

[^66]: *Salvesen v Riddell* \[2013\] UKSC 22; Scotland Act 1998 (UK), c 46, ss. 29(2)(d), 102; Agricultural Holdings (Scotland) Act 2003 (ASP 11), s. 72; European Convention on Human Rights, Protocol 1, Article 1.

[^67]: See *supra*: Merton, Fuller, Goodhart, Campbell, Stewart, Siegel, Hacker, and the public-choice tradition.

[^68]: Peter W. Hogg & Allison A. Bushell, “The Charter Dialogue Between Courts and Legislatures” (1997) 35 *Osgoode Hall Law Journal* 75.

[^69]: Colton Fehr, “Re-Thinking the Instrumental Rationality Principles of Fundamental Justice” (2020) 58:1 Alta L Rev 133.

[^70]: Val Napoleon, *Ayook: Gitksan Legal Order, Law, and Legal Theory* (PhD dissertation, University of Victoria, 2009); John Borrows, *Canada’s Indigenous Constitution* (University of Toronto Press, 2010); Amitpal C. Singh & Douglas Sanderson, “Why Is Aboriginal Title Property if It Looks Like Sovereignty?” (2021) 34:2 *Canadian Journal of Law & Jurisprudence* 417.

[^71]: Neel Guha et al, “AI Regulation Has Its Own Alignment Problem: The Technical and Institutional Feasibility of Disclosure, Registration, Licensing, and Auditing” (2024) 92:6 Geo Wash L Rev 1473.

[^72]: Noam Kolt et al., *Legal Alignment for Safe and Ethical AI*, Oxford AI Governance Institute working paper (January 2026), arXiv:2601.04175.

[^73]: Michael Chabon & Ayelet Waldman, eds., *Fight of the Century: Writers Reflect on 100 Years of Landmark ACLU Cases* (Avid Reader Press / Simon & Schuster, 2020); see also Ellis Cose, *Democracy, If We Can Keep It: The ACLU’s 100-Year Fight for Rights in America* (The New Press, 2020).

[^74]: Marian Botsford Fraser, *Acting for Freedom: Fifty Years of Civil Liberties in Canada* (Toronto: Second Story Press, 2014).

[^75]: Liberty (formerly the National Council for Civil Liberties, founded 1934), https://www.libertyhumanrights.org.uk/; see *Liberty’s Annual Report 2024-25* (London: Liberty, 2025) for the organization’s current rights-defence agenda.

[^76]: OECD Observatory of Public Sector Innovation, “Rules as Code in Canada,” 2024; New Zealand Service Innovation Lab, “Better Rules Approach,” 2018.

[^77]: Mireille Hildebrandt, *Code-driven Law: Freezing the Future and Scaling the Past*, 2020; *The Cambridge Handbook of Private Law and Artificial Intelligence*, Cambridge University Press, 2024.

[^78]: Nyu Wang & Michael Yuan Tian, “'Intelligent Justice': human-centered considerations in China’s legal AI transformation” (2023) 3:349 AI & Ethics.

[^79]: See <http://justack.ai/blogs> for my efforts to provide empirical data or scholarly study on point.
