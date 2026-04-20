import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

let loaded = false;

export function loadEnv(): void {
  if (loaded) return;
  const path = join(homedir(), ".claude", ".env");
  try {
    const text = readFileSync(path, "utf8");
    for (const raw of text.split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq < 0) continue;
      const key = line.slice(0, eq).trim();
      let val = line.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = val;
    }
  } catch {
    // silently ignore — env may be set another way
  }
  loaded = true;
}

export function requireEnv(name: string): string {
  loadEnv();
  const v = process.env[name];
  if (!v) {
    console.error(`Missing env var: ${name}. Expected in ~/.claude/.env or shell env.`);
    process.exit(2);
  }
  return v;
}
