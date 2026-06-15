import { useState, useEffect, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { css, html } from 'react-strict-dom';
import { ThemeBoundary } from '@core/providers/theme';
import { DeparturesList } from '@ui/components';
import { Measured, PerfOverlay } from './perf-overlay';
import { clearSamples } from './perf-bus';
import { startProfiling, stopProfiling } from 'react-native-release-profiler';

const raf = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

export function DeparturesScreen() {
  const [, setTick] = useState(0);
  const [profileMsg, setProfileMsg] = useState('');

  const rerender = useCallback(() => {
    clearSamples();
    let n = 0;
    const step = () => {
      setTick((t) => t + 1);
      n += 1;
      if (n < 30) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  // Capture a Hermes sampling profile across a re-render burst, then save it. Open the saved
  // .cpuprofile in https://speedscope.app (or `pnpm x3:flame`) to read the flame graph.
  const profile = useCallback(async () => {
    setProfileMsg('profiling...');
    clearSamples();
    await raf();
    startProfiling();
    for (let i = 0; i < 40; i++) {
      setTick((t) => t + 1);
      await raf();
    }
    const path = await stopProfiling(true);
    setProfileMsg('saved ' + path.split('/').pop());
  }, []);

  // auto-measure shortly after mount so the overlay shows a steady-state number on load
  useEffect(() => {
    const id = setTimeout(rerender, 700);
    return () => clearTimeout(id);
  }, [rerender]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        <ThemeBoundary>
          <html.div style={styles.screen}>
            <Measured>
              <DeparturesList count={60} />
            </Measured>
          </html.div>
        </ThemeBoundary>
      </ScrollView>
      <PerfOverlay onRerender={rerender} onProfile={profile} profileMsg={profileMsg} />
    </View>
  );
}

const styles = css.create({
  screen: {
    display: 'flex',
    flexDirection: 'column',
  },
});
