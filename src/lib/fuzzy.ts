// Lightweight fuzzy matcher: returns score (higher better) and matched index positions.
// Subsequence match, with bonuses for: start, word boundary, consecutive chars.
export type FuzzyResult = { score: number; matches: number[] };

export function fuzzyMatch(query: string, target: string): FuzzyResult | null {
  if (!query) return { score: 0, matches: [] };
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  let qi = 0;
  let score = 0;
  let prev = -2;
  const matches: number[] = [];
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) {
      let bonus = 1;
      if (i === 0) bonus += 3;
      else if (/[\s\-_./]/.test(t[i - 1])) bonus += 2;
      if (i === prev + 1) bonus += 2;
      score += bonus;
      matches.push(i);
      prev = i;
      qi++;
    }
  }
  if (qi < q.length) return null;
  // length penalty
  score -= Math.max(0, t.length - q.length) * 0.05;
  return { score, matches };
}

export function highlight(text: string, matches: number[]): Array<{ ch: string; hit: boolean }> {
  const set = new Set(matches);
  return text.split("").map((ch, i) => ({ ch, hit: set.has(i) }));
}