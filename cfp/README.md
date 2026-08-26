# CFP Working Folder

This folder holds everything needed to respond to conference/journal calls for
papers (CFPs) for two of Michael Bryant's papers:

- **The AI Supervision Paradox** (`papers/supervision-paradox/`) — the
  double-standard/algorithm-aversion paper on legal AI regulation. Source PDF
  is not part of this repo (it belongs to a different project); working text
  extract lives at `/tmp/.../scratchpad/supervision_paradox.txt` during this
  session — re-extract with `pdftotext -layout <pdf> out.txt` if picking this
  back up later, or drop the source PDF into
  `cfp/papers/supervision-paradox/source/` so it travels with the repo.
- **The Borovoy Coefficient v1.6** (`papers/borovoy-coefficient/`) — the paper
  this repository is the reference implementation for
  (`paper/The_Borovoy_Coefficient_v1.6.pdf`).

## Structure

```
cfp/
  README.md                        <- this file
  tracker/venue-tracker.md         <- single source of truth: deadlines, eligibility, status
  papers/<paper>/abstracts/        <- abstract cut to each venue's word/character limit
  papers/<paper>/bio-cv/           <- 100-word bio + one-page CV
  papers/<paper>/venues/           <- one file per venue: exact ask, checklist, draft cover note
  correspondence/                  <- draft emails (eligibility inquiries, "any room left" notes)
  regulatory-comments/             <- draft comment letters (not CFPs, but same underlying argument)
  currency-refresh/                <- the perishable claims that need re-verification before any submission
```

## What this folder does — and deliberately does not — automate

Everything in here is built so that submitting a paper is reduced to pasting
prepared text into a form and clicking submit, with a checklist telling you
exactly which field gets which file. What it does **not** do is create
accounts on submission portals (Oxford Abstracts, AALS forms, etc.), attest to
conference terms, commit to attendance/registration fees, or click submit.

That line is deliberate, not a shortcut I skipped: those are irreversible,
externally-visible actions taken under your name and (for some portals)
credit card, and they're the kind of thing this session's operating rules ask
me to have you confirm individually rather than automate away. It's also
consistent with what I told you when we first discussed this: I'll do
everything up to the submit button, and walk the form with you (e.g. via
Claude in Chrome) rather than click it myself. If you want, I can still
script the *form-filling* part of specific portals once you're logged in and
present — that's different from making submission "permissionless."

## Suggested workflow per venue

1. Check `tracker/venue-tracker.md` for status and deadline.
2. Open the venue file under `papers/<paper>/venues/<venue>.md` — it lists
   exactly what the CFP asks for and points at the matching abstract/bio/CV
   files.
3. Do the currency-refresh pass for that paper (`currency-refresh/`) before
   sending anything out the door — the empirical claims have a shelf life the
   paper names itself.
4. Send the cover email (drafted in `correspondence/`) or take the packet to
   the portal yourself.
