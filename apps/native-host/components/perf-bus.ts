// X3 perf instrument: a tiny sample bus with a cached snapshot (so useSyncExternalStore is stable).
// Fed by the Measured wrapper (performance.now bracket), read by the PerfOverlay.
let samples: number[] = [];
let snapshot = { count: 0, median: 0, p90: 0, last: 0 };
const subs = new Set<() => void>();

function recompute() {
  if (!samples.length) {
    snapshot = { count: 0, median: 0, p90: 0, last: 0 };
    return;
  }
  const a = [...samples].sort((x, y) => x - y);
  const q = (p: number) => a[Math.min(a.length - 1, Math.max(0, Math.round(p * (a.length - 1))))];
  snapshot = {
    count: samples.length,
    median: q(0.5),
    p90: q(0.9),
    last: samples[samples.length - 1],
  };
}

export const pushSample = (ms: number) => {
  samples.push(ms);
  if (samples.length > 200) samples.shift();
  recompute();
  subs.forEach((f) => f());
};

export const clearSamples = () => {
  samples = [];
  recompute();
  subs.forEach((f) => f());
};

export const getSnapshot = () => snapshot;

export const subscribe = (f: () => void) => {
  subs.add(f);
  return () => {
    subs.delete(f);
  };
};
