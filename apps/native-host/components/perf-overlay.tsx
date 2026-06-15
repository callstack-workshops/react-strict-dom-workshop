// X3 perf instrument (native). Measured brackets its children's render-phase JS with performance.now
// (build-invariant: works in dev AND release); PerfOverlay is plain RN so it never pays the RSD tax.
import { useLayoutEffect, useSyncExternalStore, type ReactNode } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { pushSample, getSnapshot, subscribe, clearSamples } from './perf-bus';

const now = (): number =>
  (globalThis as { performance?: { now?: () => number } }).performance?.now?.() ?? Date.now();

export function Measured({ children }: { children: ReactNode }) {
  const t0 = now();
  useLayoutEffect(() => {
    pushSample(now() - t0);
  });
  return <>{children}</>;
}

export function PerfOverlay({
  onRerender,
  onProfile,
  profileMsg,
}: {
  onRerender: () => void;
  onProfile: () => void;
  profileMsg: string;
}) {
  const stats = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return (
    <View style={s.card} pointerEvents="box-none">
      <View style={s.statsRow}>
        <Text style={s.big}>{stats.median.toFixed(1)}</Text>
        <Text style={s.unit}>
          ms median · p90 {stats.p90.toFixed(1)} · n={stats.count}
        </Text>
      </View>
      <Text style={s.label}>{profileMsg || 'departures list render-phase JS'}</Text>
      <View style={s.btnRow}>
        <Pressable style={s.btn} onPress={onRerender}>
          <Text style={s.btnT}>Re-render x30</Text>
        </Pressable>
        <Pressable style={s.btn} onPress={onProfile}>
          <Text style={s.btnT}>Profile</Text>
        </Pressable>
        <Pressable style={s.btn} onPress={clearSamples}>
          <Text style={s.btnT}>Clear</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: 'rgba(17,17,19,0.92)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  statsRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  big: { color: '#fff', fontSize: 26, fontWeight: '700' },
  unit: { color: '#bbb', fontSize: 12 },
  label: { color: '#888', fontSize: 11, marginTop: 1 },
  btnRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  btn: { backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: 8, paddingVertical: 7, paddingHorizontal: 12 },
  btnT: { color: '#fff', fontSize: 13, fontWeight: '600' },
});
