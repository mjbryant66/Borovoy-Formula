# Statute text

One file per corpus law, `<id>.txt`, holding the text the scorer gives the model. Each was pulled from an official source at the point in time its corpus entry names (for example, Criminal Code s. 95 as it stood before *R v Nur*, and CHRA s. 13 before its repeal).

Since 9 October 2026 each file holds the whole Act, or the whole of each Part the entry names, never a hand-trimmed excerpt. Where an entry names sections rather than a Part, the file holds the Part that contains them. The fixed purposes and provisions for each law are in `../purposes-provisions.json`, a draft awaiting review that the scorer does not yet read.

Each file opens with a header and a line holding only `---`:

- `SOURCE_URL` — where the text came from (Wayback snapshots are noted where the city site blocks automated access)
- `VERSION` — the point-in-time or consolidation used
- `RETRIEVED` — date pulled
- `SCOPE` — which parts are included
- `GAPS` — anything missing

The scorer reads only the text below the `---` line. Every result records `input_source`, the SHA-256 of that text, the source URL, and a `grounding` check of whether each cited provision can be found in it.

The text of these statutes and bylaws belongs to the governments that enacted them. It is reproduced here for research and verification, and the repository's CC0 dedication for corpus data does not extend to it.

Before v1.7, the scorer gave the model only the critics' quotations, so it recalled sections from memory. That is how 13 of the 48 provisions in the v1.6 extractions came to cite sections that say something else or do not exist.
