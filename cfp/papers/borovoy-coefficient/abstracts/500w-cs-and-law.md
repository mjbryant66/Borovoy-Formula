# 500-word abstract — cut for CS&Law '27 (non-archival track)

**Title:** The Borovoy Coefficient: A Civil-Liberties Measure of Legislative Alignment

**Track fit note (read before submitting):** this paper is doctrinal-plus-quantitative
synthesis rather than CS-and-law integration in the sense the archival track's review
criterion asks for ("the extent to which their contributions are truly
interdisciplinary"). The abstract below leans on the machine-learning framing as
hard as the paper supports, but the honest read is that the **non-archival track** is
the fit — flag this rather than force the archival submission.

---

This paper imports a diagnostic method from constitutional law — comparing a
law's stated purpose against its observed effect — into a formal, computable
instrument, and argues the import runs in both directions: the resulting instrument
is legible as an instance of the outer-alignment problem familiar from
machine-learning safety research. Alan Borovoy, who led the Canadian Civil
Liberties Association for four decades, never formalized his method, but it maps
onto a recognizable pattern: a system (a bureaucracy, a legislature, a neural
network) is specified for one objective and behaves differently once deployed,
particularly once conditions drift from the specification's original assumptions —
the structural kinship formalized in Hennessy and Goodhart's (2023) treatment of
Goodhart's law across regulation and machine learning.

The paper's contribution is the Borovoy Coefficient (BORCO), a 0-to-100 composite
measurement instrument spanning three planned tiers — literal, functional, and
contextual — that together instantiate five doctrinal-plus-alignment dimensions
(purpose-effect gap, proportionality, and three others), each independently
anchored in a recognized constitutional doctrine across three jurisdictions
(Canada, the United States, and the United Kingdom) and in a named
machine-learning alignment concept (outer alignment, Goodhart's law variants,
corrigibility). Version 1.0 ships MTM-L (Missing-The-Mark — Literal): a closed-form
metric, MTM-L = 100·[α(1−F) + βX], computed directly from a statute's text alone
— F is the fraction of stated purposes served by at least one operative provision, X
is the fraction of operative provisions serving no stated purpose — with no
dependence on judicial interpretation.

The paper reports its own instrument's limits candidly, which is the part likely to
interest a computational audience most. Applied to a 15-statute prototype corpus
and calibrated against a 33-case ground-truth set of Canadian Charter dispositions
(1990–2024: 23 struck, read-down, or invalidated; 10 upheld), MTM-L scores at the
floor for thirteen of fifteen corpus statutes and performs at AUC = 0.54 — near
chance — because most Charter-invalid statutes fail purposively or contextually
rather than on their face, a failure mode the literal tier cannot reach by
construction. The paper treats this as informative rather than as a null result to
bury: it is evidence for where a text-only instrument's ceiling sits, and a concrete
specification target for the two theoretical tiers (MTM-F, functional; MTM-C,
contextual) that would need case law, legislative history, and disaggregated
enforcement data to compute.

The reference implementation, prototype corpus, ground-truth set, and calibration
report are open (MPL-2.0 code, CC BY 4.0 paper) at
github.com/mjbryant66/Borovoy-Formula, with a public dashboard at
justack.ai/borovoy — offered as a first empirical layer of public, contestable
accountability in a domain (legislative purpose-effect divergence) that, per the
paper's access-to-justice framing, often escapes serious scrutiny entirely.

(Word count: 424 — under the 500-word cap)
