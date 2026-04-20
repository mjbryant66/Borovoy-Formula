import { GoogleGenerativeAI, type GenerationConfig } from "@google/generative-ai";
import { requireEnv } from "./env.ts";

export const DEFAULT_MODEL = "gemini-2.5-pro";

export const MTM_L_EXTRACTION_PROMPT = `You are extracting structured data from a Canadian statute to compute the MTM-Literal ("Missing the Mark, Literally") score. You DO NOT assess the law. You extract structure.

INPUT: text or metadata for a Canadian statute. May be full text, an excerpt, or only the law name + stated purpose.

OUTPUT: strict JSON matching the provided schema.

RULES:
1. Extract purposes VERBATIM from the preamble, purpose clause, or short title where possible. If no preamble/purpose clause, infer a single purpose from the short title and append "(inferred from short title)".
2. For provisions: include the statute's OPERATIVE sections only — sections that create offences, impose duties, confer powers, or grant rights. EXCLUDE: definitions, interpretation sections, coming-into-force, transitional provisions, amendments to other Acts, schedules of administrative data. You MUST enumerate at least 3 provisions. If the input lacks full statute text, supply operative provisions from your training-data knowledge of the statute. Append " (from training data)" to the end of any provision text NOT verbatim from the input.
3. For serves_matrix: matrix[j][i] = 1 iff provisions[j] plausibly advances purposes[i] on a plain reading. Use plain textual reading only — DO NOT reason about case law, constitutional doctrine, policy outcomes, or bureaucratic behaviour. If provision[j] advances no stated purpose on its face, row j is all zeros.
4. If statute text mentions judicial interpretation or case law, IGNORE those mentions entirely — score on statute text only.
5. In the notes field, mention which enumerated provisions came from training data vs input, and flag any provisions that advance the purpose on a plain reading but whose LANGUAGE is broader than the stated purpose.
6. Return JSON only. No prose outside the JSON envelope.`;

export async function callGeminiJSON<T>(opts: {
  systemPrompt: string;
  userPrompt: string;
  responseSchema: unknown;
  model?: string;
  maxRetries?: number;
}): Promise<T> {
  const apiKey = requireEnv("GOOGLE_API_KEY");
  const modelName = opts.model ?? DEFAULT_MODEL;
  const maxRetries = opts.maxRetries ?? 3;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: opts.systemPrompt,
  });

  const generationConfig: GenerationConfig = {
    temperature: 0,
    responseMimeType: "application/json",
    // @ts-expect-error — responseSchema is supported at runtime by Gemini SDK
    responseSchema: opts.responseSchema,
  };

  let lastErr: unknown = null;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: opts.userPrompt }] }],
        generationConfig,
      });
      const text = result.response.text();
      return JSON.parse(text) as T;
    } catch (err) {
      lastErr = err;
      if (attempt < maxRetries) {
        const backoffMs = 500 * Math.pow(2, attempt - 1);
        console.error(
          `Gemini attempt ${attempt} failed (${(err as Error).message}); retrying in ${backoffMs}ms`
        );
        await new Promise((r) => setTimeout(r, backoffMs));
      }
    }
  }
  throw new Error(
    `Gemini call failed after ${maxRetries} attempts: ${(lastErr as Error)?.message ?? "unknown"}`
  );
}

// Strip case-law references from statute text so scorer cannot infer disposition
const CASE_LAW_PATTERNS = [
  /\[?\d{4}\]?\s+\d+\s+S\.?C\.?R\.?\s+\d+/gi,
  /\d{4}\s+SCC\s+\d+/gi,
  /\d{4}\s+ONCA\s+\d+/gi,
  /\d{4}\s+BCCA\s+\d+/gi,
  /\d{4}\s+ABCA\s+\d+/gi,
  /\d{4}\s+FCA\s+\d+/gi,
  /\d{4}\s+QCCA\s+\d+/gi,
  /R\.?\s*v\.?\s+[A-Z][a-zA-Z-]+(?:\s*,\s*\d{4})?/g,
  /Reference\s+re\s+[A-Z][^.]{3,60}/g,
];

export function stripCaseLaw(text: string): string {
  let out = text;
  for (const pat of CASE_LAW_PATTERNS) {
    out = out.replace(pat, "[CASE_REDACTED]");
  }
  return out;
}
