import { resolve, relative, isAbsolute } from "node:path";

// Default paths are anchored to the repository, not to the shell's working
// directory, so the scripts behave the same whether run from scorer/ or the root.
export const REPO_ROOT = resolve(import.meta.dir, "..", "..");
export const repoPath = (...parts: string[]) => resolve(REPO_ROOT, ...parts);

// scored/ and calibration/ hold the published v1.6 record. Fresh runs go to runs/.
const PUBLISHED = ["scored", "calibration"].map((d) => repoPath(d));

export function guardPublished(target: string, allow: boolean): void {
  const abs = resolve(target);
  const hit = PUBLISHED.find((p) => {
    const rel = relative(p, abs);
    return rel === "" || (!rel.startsWith("..") && !isAbsolute(rel));
  });
  if (hit && !allow) {
    console.error(
      `Refusing to write to ${abs}: ${relative(REPO_ROOT, hit)}/ holds the published v1.6 record.\n` +
        `Write fresh runs under runs/ (the default), or pass --overwrite-published if you mean to replace it.`,
    );
    process.exit(3);
  }
}
