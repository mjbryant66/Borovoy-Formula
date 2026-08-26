# 300-word general-purpose abstract

**Title:** The Borovoy Coefficient: A Civil-Liberties Measure of Legislative Alignment

Alan Borovoy, who led the Canadian Civil Liberties Association from 1968 to 2009,
spent much of his public life identifying a recurring pathology of legislation: laws
enacted for one purpose that operate, once in force, in ways that burden rights and
vulnerable populations beyond what their stated objectives could justify. His method
was diagnostic rather than mathematical — comparing purpose with effect — but it
has a close structural analogue in machine-learning alignment research, where a
system specified for one objective can behave differently once deployed. This paper
proposes the Borovoy Coefficient (BORCO): a 0-to-100 composite instrument
designed to estimate the gap between a law's stated purpose and its observed
effects, formalized across five dimensions drawn from constitutional doctrine in
Canada, the United States, and the United Kingdom, and from the alignment
literature (outer alignment, proportionality, Goodhart's law, and corrigibility, among
others).

Version 1.0 of the reference implementation ships one of three planned tiers:
MTM-L (Missing-The-Mark — Literal), a closed-form metric computed directly from
a statute's own text, measuring only textual specification failure. Applied to a
15-statute prototype corpus and calibrated against a 33-case ground-truth set of
Canadian Charter dispositions (1990–2024), MTM-L performs near chance
(AUC = 0.54) — an honestly reported result showing that most Charter-invalid
statutes fail purposively or contextually rather than on their face, which is exactly
what the two remaining, currently theoretical tiers (functional and contextual) are
designed to reach. The paper is deliberately modest in its claim: a quantitative
instrument can render legal discourse in measurable form without reducing
adjudication to it. It closes with five drafting reforms aimed at reducing
purpose-effect gaps at the source — sunset clauses, purpose-effect reporting,
disparate-impact dashboards, narrowing presumptions, and independent oversight
bodies with enforceable powers.

(Word count: 282)
