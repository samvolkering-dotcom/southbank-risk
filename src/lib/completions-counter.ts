const BASE = "https://abacus.jasoncameron.dev";
const NS = "southbank-risk";
const KEY = "completions";
const FLAG = "srp:counted";

export async function recordCompletion(): Promise<void> {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(FLAG) === "1") return;
  try {
    const r = await fetch(`${BASE}/hit/${NS}/${KEY}`, { cache: "no-store" });
    if (r.ok) window.localStorage.setItem(FLAG, "1");
  } catch {
    // fire-and-forget: counter is best-effort social proof
  }
}

export async function getCompletionCount(): Promise<number | null> {
  try {
    const r = await fetch(`${BASE}/get/${NS}/${KEY}`, { cache: "no-store" });
    if (!r.ok) return null;
    const data = await r.json();
    return typeof data?.value === "number" ? data.value : null;
  } catch {
    return null;
  }
}
