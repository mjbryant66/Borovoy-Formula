import type { Extraction, MTMLResult } from "./schema.ts";

export interface MTMLComputation {
  score: number;
  faithfulness: number;
  excess: number;
  derivation: string;
}

/**
 * MTM-Literal formula:
 *   F = (1/m) · Σᵢ 𝟙[∃j: serves(j,i) = 1]        — Faithfulness
 *   X = (1/n) · Σⱼ 𝟙[∀i: serves(j,i) = 0]        — Excess
 *   MTM-L = 100 · [α · (1 - F) + β · X]          — α + β = 1
 */
export function computeMTMLiteral(
  extraction: Extraction,
  alpha = 0.5,
  beta = 0.5
): MTMLComputation {
  if (Math.abs(alpha + beta - 1) > 1e-9) {
    throw new Error(`alpha + beta must equal 1; got ${alpha + beta}`);
  }

  const m = extraction.purposes.length;
  const n = extraction.provisions.length;
  const matrix = extraction.serves_matrix;

  if (matrix.length !== n) {
    throw new Error(`serves_matrix has ${matrix.length} rows; expected ${n} (one per provision)`);
  }
  for (let j = 0; j < n; j++) {
    const row = matrix[j];
    if (!row || row.length !== m) {
      throw new Error(
        `serves_matrix row ${j} has length ${row?.length ?? 0}; expected ${m} (one per purpose)`
      );
    }
  }

  // Faithfulness: fraction of purposes served by at least one provision
  let purposesServed = 0;
  for (let i = 0; i < m; i++) {
    let servedByAny = false;
    for (let j = 0; j < n; j++) {
      if (matrix[j]![i] === 1) {
        servedByAny = true;
        break;
      }
    }
    if (servedByAny) purposesServed++;
  }
  const F = m === 0 ? 0 : purposesServed / m;

  // Excess: fraction of provisions serving no stated purpose
  let provisionsExcess = 0;
  for (let j = 0; j < n; j++) {
    const row = matrix[j]!;
    const servesAny = row.some((v) => v === 1);
    if (!servesAny) provisionsExcess++;
  }
  const X = n === 0 ? 0 : provisionsExcess / n;

  const score = 100 * (alpha * (1 - F) + beta * X);

  const derivation = [
    `MTM-Literal derivation`,
    `  m = |purposes| = ${m}`,
    `  n = |provisions| = ${n}`,
    `  purposes served by ≥1 provision = ${purposesServed}/${m}`,
    `  → F (Faithfulness) = ${purposesServed}/${m} = ${F.toFixed(4)}`,
    `  provisions serving no purpose = ${provisionsExcess}/${n}`,
    `  → X (Excess)       = ${provisionsExcess}/${n} = ${X.toFixed(4)}`,
    `  α = ${alpha}, β = ${beta}`,
    `  MTM-L = 100 · [α · (1 − F) + β · X]`,
    `        = 100 · [${alpha} · (1 − ${F.toFixed(4)}) + ${beta} · ${X.toFixed(4)}]`,
    `        = 100 · [${(alpha * (1 - F)).toFixed(4)} + ${(beta * X).toFixed(4)}]`,
    `        = ${score.toFixed(2)}`,
  ].join("\n");

  return { score, faithfulness: F, excess: X, derivation };
}

// ---------- Calibration math ----------

/** Area under ROC curve — binary outcome (>=0.5 positive), predictor monotonic */
export function auc(predictions: number[], outcomes: number[]): number {
  if (predictions.length !== outcomes.length) {
    throw new Error("predictions/outcomes length mismatch");
  }
  const bin = outcomes.map((o) => (o >= 0.5 ? 1 : 0));
  const pos: number[] = [];
  const neg: number[] = [];
  for (let i = 0; i < predictions.length; i++) {
    if (bin[i] === 1) pos.push(predictions[i]!);
    else neg.push(predictions[i]!);
  }
  if (pos.length === 0 || neg.length === 0) return NaN;
  let concordant = 0;
  let ties = 0;
  for (const p of pos) {
    for (const n of neg) {
      if (p > n) concordant++;
      else if (p === n) ties++;
    }
  }
  return (concordant + 0.5 * ties) / (pos.length * neg.length);
}

/** Brier score — assumes predictions normalized to [0,1] */
export function brier(predictions01: number[], outcomes: number[]): number {
  if (predictions01.length !== outcomes.length) {
    throw new Error("length mismatch");
  }
  let sum = 0;
  for (let i = 0; i < predictions01.length; i++) {
    const d = predictions01[i]! - outcomes[i]!;
    sum += d * d;
  }
  return sum / predictions01.length;
}

/** Reliability diagram: predicted vs observed by decile */
export function reliabilityDiagram(
  predictions01: number[],
  outcomes: number[],
  bins = 10
): { bin: number; predicted_mean: number; observed_mean: number; count: number }[] {
  const rows: {
    bin: number;
    predicted_mean: number;
    observed_mean: number;
    count: number;
  }[] = [];
  for (let b = 0; b < bins; b++) {
    const lo = b / bins;
    const hi = (b + 1) / bins;
    const idx = predictions01
      .map((p, i) => ({ p, o: outcomes[i]!, i }))
      .filter(({ p }) => (b === bins - 1 ? p >= lo && p <= hi : p >= lo && p < hi));
    if (idx.length === 0) {
      rows.push({ bin: b, predicted_mean: (lo + hi) / 2, observed_mean: NaN, count: 0 });
      continue;
    }
    const predictedMean = idx.reduce((s, x) => s + x.p, 0) / idx.length;
    const observedMean = idx.reduce((s, x) => s + x.o, 0) / idx.length;
    rows.push({
      bin: b,
      predicted_mean: predictedMean,
      observed_mean: observedMean,
      count: idx.length,
    });
  }
  return rows;
}

/**
 * Fit α, β for: MTM-L/100 = α·(1-F) + β·X   with α + β = 1.
 * Reparameterize α = sigmoid(θ), β = 1 - α. Predict outcome via linear link on [0,1].
 * Minimize MSE + L2·(θ^2) via simple gradient descent.
 */
export function fitWeights(
  F: number[],
  X: number[],
  outcomes: number[],
  opts: { lambda?: number; lr?: number; steps?: number } = {}
): { alpha: number; beta: number; loss: number; steps: number } {
  const lambda = opts.lambda ?? 0.5;
  const lr = opts.lr ?? 0.1;
  const steps = opts.steps ?? 4000;
  const N = F.length;
  if (X.length !== N || outcomes.length !== N) throw new Error("length mismatch");

  const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
  let theta = 0; // α = sigmoid(0) = 0.5 default
  let loss = Infinity;

  for (let t = 0; t < steps; t++) {
    const alpha = sigmoid(theta);
    const beta = 1 - alpha;

    let gradTheta = 0;
    let sumSq = 0;
    for (let i = 0; i < N; i++) {
      const pred = alpha * (1 - F[i]!) + beta * X[i]!;
      const err = pred - outcomes[i]!;
      sumSq += err * err;
      const dPred_dAlpha = (1 - F[i]!) - X[i]!;
      const dAlpha_dTheta = alpha * (1 - alpha);
      gradTheta += 2 * err * dPred_dAlpha * dAlpha_dTheta;
    }
    gradTheta = gradTheta / N + 2 * lambda * theta;
    theta -= lr * gradTheta;
    loss = sumSq / N + lambda * theta * theta;
  }

  const alpha = sigmoid(theta);
  return { alpha, beta: 1 - alpha, loss, steps };
}

/** Bootstrap 95% CI for fitted weights */
export function bootstrapWeights(
  F: number[],
  X: number[],
  outcomes: number[],
  samples = 1000,
  opts: { lambda?: number } = {}
): { alpha_ci: [number, number]; beta_ci: [number, number] } {
  const N = F.length;
  const alphas: number[] = [];
  for (let s = 0; s < samples; s++) {
    const idx = Array.from({ length: N }, () => Math.floor(Math.random() * N));
    const Fs = idx.map((i) => F[i]!);
    const Xs = idx.map((i) => X[i]!);
    const Os = idx.map((i) => outcomes[i]!);
    const { alpha } = fitWeights(Fs, Xs, Os, { lambda: opts.lambda });
    alphas.push(alpha);
  }
  alphas.sort((a, b) => a - b);
  const lo = alphas[Math.floor(samples * 0.025)]!;
  const hi = alphas[Math.floor(samples * 0.975)]!;
  return { alpha_ci: [lo, hi], beta_ci: [1 - hi, 1 - lo] };
}

export function toResult(
  input: { id: string; law: string },
  extraction: Extraction,
  comp: MTMLComputation,
  alpha: number,
  beta: number,
  model: string
): MTMLResult {
  return {
    law_id: input.id,
    law: input.law,
    tier: "MTM-L",
    mtm_l: Number(comp.score.toFixed(2)),
    faithfulness: Number(comp.faithfulness.toFixed(4)),
    excess: Number(comp.excess.toFixed(4)),
    alpha,
    beta,
    purposes: extraction.purposes,
    provisions: extraction.provisions,
    serves_matrix: extraction.serves_matrix,
    derivation: comp.derivation,
    scored_at: new Date().toISOString(),
    model,
    version: "v1.0",
  };
}
