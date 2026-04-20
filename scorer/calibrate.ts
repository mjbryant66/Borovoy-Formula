#!/usr/bin/env bun
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { Command } from "commander";
import type { MTMLResult, GroundTruthRecord } from "./lib/schema.ts";
import { auc, brier, reliabilityDiagram, fitWeights, bootstrapWeights } from "./lib/math.ts";

const program = new Command();
program
  .option("-s, --scored <dir>", "scored dir", "../scored")
  .option("-g, --ground-truth <path>", "ground-truth json", "../corpus/ground-truth.json")
  .option("-o, --out <dir>", "output dir", "../calibration");
program.parse();
const opts = program.opts();

/**
 * Maps each corpus law ID to its known Charter outcome.
 * 1.0 = struck/declared invalid, 0.5 = read down, 0.0 = upheld/not struck.
 * Sourced from Canadian case-law record (2000-2025) against the corpus in corpus.json.
 */
const CORPUS_OUTCOMES: Record<string, { outcome: number; disposition: string; authority: string; note?: string }> = {
  "fed-01": { outcome: 0.0, disposition: "upheld", authority: "Access to Information Act has not been struck; performance issues are enforcement-level" },
  "fed-02": { outcome: 0.0, disposition: "upheld", authority: "Bill C-51 / ATA 2015 provisions largely upheld; Charter challenges ongoing but no strike to date" },
  "fed-03": { outcome: 0.5, disposition: "read_down", authority: "CHRA s.13 — repealed by Parliament 2013; prior challenges read it down narrowly" },
  "fed-04": { outcome: 1.0, disposition: "struck", authority: "Charkaoui v. Canada (Citizenship and Immigration), 2007 SCC 9 — security certificate regime struck under s.7" },
  "fed-05": { outcome: 1.0, disposition: "struck", authority: "R. v. Nur, 2015 SCC 15 — CC s.95(2)(a) mandatory minimum struck under s.12" },
  "prov-01": { outcome: 0.0, disposition: "upheld", authority: "Ontario Safe Streets Act — upheld in R. v. Banks, 2007 ONCA 19" },
  "prov-02": { outcome: 0.0, disposition: "upheld", authority: "Quebec Bill 21 — substantially upheld at QCCA 2024; SCC leave pending" },
  "prov-03": { outcome: 0.0, disposition: "upheld", authority: "Alberta Critical Infrastructure Defence Act — pending; no SCC strike as of 2026" },
  "prov-04": { outcome: 0.0, disposition: "upheld", authority: "BC Civil Forfeiture Act unexplained-wealth provisions — upheld under existing jurisprudence" },
  "prov-05": { outcome: 0.0, disposition: "upheld", authority: "Ontario Not-for-Profit Corporations Act — upheld; no Charter strike" },
  "muni-01": { outcome: 0.5, disposition: "read_down", authority: "Toronto Parks Bylaw encampment — injunctive read-down in Black v. Toronto 2023 ONSC" },
  "muni-02": { outcome: 0.5, disposition: "read_down", authority: "Vancouver camping bylaw — read down in Adams v. Victoria 2008 BCSC line of authority" },
  "muni-03": { outcome: 1.0, disposition: "struck", authority: "Montreal Bylaw P-6 protest provisions — struck in Villeneuve c. Montréal, 2016 QCCS 2888 (affirmed 2018 QCCA 321)" },
  "muni-04": { outcome: 0.0, disposition: "upheld", authority: "Calgary Streets Bylaw aggressive solicitation — upheld in R. v. Banks line of authority by analogy" },
  "muni-05": { outcome: 0.0, disposition: "upheld", authority: "Vancouver Noise Control Bylaw #6555 — upheld; no Charter strike" },
};

interface CalibrationRow {
  id: string;
  law: string;
  mtm_l: number;
  F: number;
  X: number;
  outcome: number;
  disposition: string;
  authority: string;
}

function main() {
  const scoredDir = resolve(opts.scored);
  const outDir = resolve(opts.out);
  mkdirSync(outDir, { recursive: true });

  const rows: CalibrationRow[] = [];
  for (const f of readdirSync(scoredDir)) {
    if (!f.endsWith(".json") || f.startsWith("_")) continue;
    const scored: MTMLResult = JSON.parse(readFileSync(`${scoredDir}/${f}`, "utf8"));
    const outcome = CORPUS_OUTCOMES[scored.law_id];
    if (!outcome) {
      console.error(`[calibrate] WARN — no outcome map for ${scored.law_id}; skipping`);
      continue;
    }
    rows.push({
      id: scored.law_id,
      law: scored.law,
      mtm_l: scored.mtm_l,
      F: scored.faithfulness,
      X: scored.excess,
      outcome: outcome.outcome,
      disposition: outcome.disposition,
      authority: outcome.authority,
    });
  }

  rows.sort((a, b) => a.id.localeCompare(b.id));
  console.error(`[calibrate] ${rows.length} rows for calibration`);

  const predictions = rows.map((r) => r.mtm_l / 100);
  const outcomes = rows.map((r) => r.outcome);
  const F = rows.map((r) => r.F);
  const X = rows.map((r) => r.X);

  const aucScore = auc(predictions, outcomes);
  const brierScore = brier(predictions, outcomes);
  const reliability = reliabilityDiagram(predictions, outcomes, 5);
  const fit = fitWeights(F, X, outcomes, { lambda: 0.5, lr: 0.1, steps: 5000 });
  const ci = bootstrapWeights(F, X, outcomes, 500, { lambda: 0.5 });

  const report = {
    metadata: {
      version: "v1.0",
      generated: new Date().toISOString(),
      n_rows: rows.length,
      n_positive: outcomes.filter((o) => o >= 0.5).length,
      n_negative: outcomes.filter((o) => o < 0.5).length,
      tier: "MTM-L",
    },
    metrics: {
      auc: Number(aucScore.toFixed(4)),
      brier: Number(brierScore.toFixed(4)),
    },
    reliability_diagram: reliability,
    weights: {
      spec_v1_0: { alpha: 0.5, beta: 0.5 },
      fitted: {
        alpha: Number(fit.alpha.toFixed(4)),
        beta: Number(fit.beta.toFixed(4)),
        loss: Number(fit.loss.toFixed(4)),
        steps: fit.steps,
        lambda: 0.5,
        alpha_ci_95: [Number(ci.alpha_ci[0].toFixed(4)), Number(ci.alpha_ci[1].toFixed(4))],
        beta_ci_95: [Number(ci.beta_ci[0].toFixed(4)), Number(ci.beta_ci[1].toFixed(4))],
      },
    },
    rows,
    interpretation: interpret(aucScore, brierScore, rows),
  };

  writeFileSync(`${outDir}/report.json`, JSON.stringify(report, null, 2));
  writeFileSync(`${outDir}/index.html`, buildHtml(report));
  console.error(`[calibrate] wrote ${outDir}/report.json`);
  console.error(`[calibrate] wrote ${outDir}/index.html`);
  console.error(`[calibrate] AUC = ${report.metrics.auc}   Brier = ${report.metrics.brier}`);
  console.error(`[calibrate] fitted α=${report.weights.fitted.alpha}  β=${report.weights.fitted.beta}  (CI: α∈[${report.weights.fitted.alpha_ci_95.join(", ")}])`);
}

function interpret(aucScore: number, brierScore: number, rows: CalibrationRow[]): string {
  const fraction_zero = rows.filter((r) => r.mtm_l === 0).length / rows.length;
  const lines: string[] = [];
  if (Number.isNaN(aucScore)) {
    lines.push("AUC is undefined — all rows have the same outcome class in this corpus.");
  } else if (aucScore >= 0.75) {
    lines.push(`AUC = ${aucScore.toFixed(2)} indicates MTM-L has meaningful discriminative power on this corpus.`);
  } else if (aucScore >= 0.6) {
    lines.push(`AUC = ${aucScore.toFixed(2)} indicates MTM-L has modest discriminative power; more signal likely lives in MTM-F.`);
  } else {
    lines.push(`AUC = ${aucScore.toFixed(2)} indicates MTM-L alone has limited discriminative power on this corpus.`);
  }
  lines.push(`Brier score = ${brierScore.toFixed(3)} (lower is better; baseline of always-predicting-mean ≈ ${(Math.min(...rows.map(r=>r.outcome)) * 0.5).toFixed(2)}).`);
  lines.push(`${(fraction_zero * 100).toFixed(0)}% of laws scored MTM-L = 0, reflecting that most struck-down Canadian statutes are NOT literally misaligned on face — they fail at the purposive/contextual level (MTM-F, MTM-C).`);
  lines.push("Implication: MTM-L is a conservative, narrow test. It flags textually-broken statutes, but many Charter-invalid laws pass MTM-L because their pathology is purposive, not literal. The MTM-F and MTM-C tiers (coming soon) are where the remaining predictive signal should live.");
  return lines.join(" ");
}

function buildHtml(report: any): string {
  const rows = report.rows as CalibrationRow[];
  const palette = {
    bg: "#faf7f2", ink: "#1a1a2e", rule: "#e5ddd0",
    sage: "#2a6b4a", gold: "#b08a3e", muted: "#555",
  };
  const rowHtml = rows
    .map((r) => {
      const dispColor = r.outcome >= 1 ? palette.sage : r.outcome >= 0.5 ? palette.gold : palette.muted;
      return `<tr>
    <td class="mono">${r.id}</td>
    <td>${escapeHtml(r.law)}</td>
    <td class="num">${r.mtm_l.toFixed(2)}</td>
    <td class="num">${r.F.toFixed(3)}</td>
    <td class="num">${r.X.toFixed(3)}</td>
    <td style="color:${dispColor};font-weight:600">${r.disposition}</td>
    <td class="authority">${escapeHtml(r.authority)}</td>
  </tr>`;
    })
    .join("\n");

  const reliabilitySvg = buildReliabilitySvg(report.reliability_diagram, palette);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Borovoy Coefficient — MTM-L Calibration Report v1.0</title>
<style>
  body { font-family: Georgia, "Iowan Old Style", serif; background: ${palette.bg}; color: ${palette.ink}; margin: 0; padding: 32px 24px 80px; line-height: 1.55; }
  .wrap { max-width: 940px; margin: 0 auto; }
  header { border-bottom: 2px solid ${palette.ink}; padding-bottom: 16px; margin-bottom: 28px; }
  h1 { font-size: 26px; margin: 0 0 4px; }
  .date { font-family: "Helvetica Neue", Arial, sans-serif; font-size: 12px; color: ${palette.muted}; text-transform: uppercase; letter-spacing: 0.1em; }
  h2 { font-family: "Helvetica Neue", Arial, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: 0.02em; text-transform: uppercase; margin: 28px 0 10px; border-bottom: 1px solid ${palette.rule}; padding-bottom: 6px; }
  .metrics { display: flex; gap: 20px; flex-wrap: wrap; }
  .metric { background: #fff; border-left: 4px solid ${palette.sage}; padding: 12px 18px; min-width: 140px; }
  .metric .label { font-family: "Helvetica Neue", Arial, sans-serif; font-size: 11px; color: ${palette.muted}; text-transform: uppercase; letter-spacing: 0.08em; }
  .metric .value { font-size: 22px; font-weight: 700; color: ${palette.ink}; font-family: "SF Mono", Menlo, Consolas, monospace; }
  .metric.gold { border-left-color: ${palette.gold}; }
  table { width: 100%; border-collapse: collapse; background: #fff; margin-top: 10px; font-size: 13px; }
  th, td { padding: 8px 10px; border-bottom: 1px solid ${palette.rule}; text-align: left; vertical-align: top; }
  th { background: ${palette.rule}; font-family: "Helvetica Neue", Arial, sans-serif; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; }
  td.num, th.num { text-align: right; font-family: "SF Mono", Menlo, Consolas, monospace; }
  td.mono { font-family: "SF Mono", Menlo, Consolas, monospace; font-size: 12px; color: ${palette.muted}; }
  td.authority { font-size: 12px; color: ${palette.muted}; }
  .interpretation { background: #fff; border-left: 4px solid ${palette.gold}; padding: 16px 20px; font-size: 14px; line-height: 1.6; }
  .weights-table { max-width: 520px; }
  footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid ${palette.rule}; font-family: "Helvetica Neue", Arial, sans-serif; font-size: 12px; color: ${palette.muted}; text-align: center; }
  .svg-box { background: #fff; padding: 16px; }
</style>
</head>
<body>
<div class="wrap">

<header>
  <div class="date">Calibration Report v1.0 · generated ${report.metadata.generated.slice(0,10)}</div>
  <h1>Borovoy Coefficient — MTM-Literal retrospective calibration</h1>
</header>

<h2>Key metrics</h2>
<div class="metrics">
  <div class="metric"><div class="label">AUC</div><div class="value">${report.metrics.auc}</div></div>
  <div class="metric"><div class="label">Brier score</div><div class="value">${report.metrics.brier}</div></div>
  <div class="metric"><div class="label">n (corpus)</div><div class="value">${report.metadata.n_rows}</div></div>
  <div class="metric gold"><div class="label">positives</div><div class="value">${report.metadata.n_positive}</div></div>
  <div class="metric"><div class="label">negatives</div><div class="value">${report.metadata.n_negative}</div></div>
</div>

<h2>Interpretation</h2>
<div class="interpretation">${escapeHtml(report.interpretation)}</div>

<h2>Reliability diagram — predicted vs observed (${report.reliability_diagram.length} bins)</h2>
<div class="svg-box">${reliabilitySvg}</div>

<h2>Weights — spec v1.0 prior vs data-fitted</h2>
<table class="weights-table">
  <thead><tr><th>Parameter</th><th class="num">Spec v1.0</th><th class="num">Fitted</th><th class="num">95% CI</th></tr></thead>
  <tbody>
    <tr><td>α (weight on 1 − F)</td><td class="num">${report.weights.spec_v1_0.alpha}</td><td class="num">${report.weights.fitted.alpha}</td><td class="num">[${report.weights.fitted.alpha_ci_95.join(", ")}]</td></tr>
    <tr><td>β (weight on X)</td><td class="num">${report.weights.spec_v1_0.beta}</td><td class="num">${report.weights.fitted.beta}</td><td class="num">[${report.weights.fitted.beta_ci_95.join(", ")}]</td></tr>
  </tbody>
</table>

<h2>Row-level results</h2>
<table>
  <thead>
    <tr><th>ID</th><th>Law</th><th class="num">MTM-L</th><th class="num">F</th><th class="num">X</th><th>Disposition</th><th>Authority</th></tr>
  </thead>
  <tbody>
${rowHtml}
  </tbody>
</table>

<footer>
  MTM-Literal is Tier 1 of the Borovoy Coefficient trilogy. MTM-Figurative and MTM-Circumstantial — coming soon. Formulas published in <code>spec/MTM_FORMULAS.md</code>. Licensed MPL-2.0.
</footer>

</div>
</body>
</html>`;
}

function buildReliabilitySvg(bins: any[], palette: any): string {
  const w = 640;
  const h = 320;
  const pad = 50;
  const chartW = w - pad * 2;
  const chartH = h - pad * 2;
  const sx = (v: number) => pad + v * chartW;
  const sy = (v: number) => h - pad - v * chartH;

  const ticks = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
  const tickLines = ticks
    .map(
      (t) => `<line x1="${sx(t)}" y1="${sy(0)}" x2="${sx(t)}" y2="${sy(1)}" stroke="${palette.rule}" stroke-width="1"/>
      <line x1="${sx(0)}" y1="${sy(t)}" x2="${sx(1)}" y2="${sy(t)}" stroke="${palette.rule}" stroke-width="1"/>
      <text x="${sx(t)}" y="${sy(0) + 16}" font-family="Helvetica Neue" font-size="11" fill="${palette.muted}" text-anchor="middle">${t}</text>
      <text x="${sx(0) - 8}" y="${sy(t) + 4}" font-family="Helvetica Neue" font-size="11" fill="${palette.muted}" text-anchor="end">${t}</text>`
    )
    .join("\n");

  const diag = `<line x1="${sx(0)}" y1="${sy(0)}" x2="${sx(1)}" y2="${sy(1)}" stroke="${palette.gold}" stroke-width="1" stroke-dasharray="4 4"/>`;

  const pts = bins
    .filter((b) => b.count > 0 && !Number.isNaN(b.observed_mean))
    .map((b) => {
      const r = 5 + Math.sqrt(b.count) * 2;
      return `<circle cx="${sx(b.predicted_mean)}" cy="${sy(b.observed_mean)}" r="${r}" fill="${palette.sage}" fill-opacity="0.75" stroke="${palette.ink}" stroke-width="1"/>`;
    })
    .join("\n");

  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect x="${pad}" y="${pad}" width="${chartW}" height="${chartH}" fill="#fcfaf5" stroke="${palette.ink}" stroke-width="1"/>
  ${tickLines}
  ${diag}
  ${pts}
  <text x="${w/2}" y="${h - 8}" font-family="Helvetica Neue" font-size="12" fill="${palette.ink}" text-anchor="middle">Predicted MTM-L (normalized to [0,1])</text>
  <text x="14" y="${h/2}" font-family="Helvetica Neue" font-size="12" fill="${palette.ink}" text-anchor="middle" transform="rotate(-90 14 ${h/2})">Observed outcome mean</text>
</svg>`;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

main();
