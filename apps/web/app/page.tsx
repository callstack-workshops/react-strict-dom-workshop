'use client';

import { useState } from 'react';
import { css, html } from 'react-strict-dom';
import { Button, Greeting } from '@ui/components';

export default function Index() {
  const [presses, setPresses] = useState(0);

  return (
    <html.div style={styles.page}>
      <Greeting name="React Strict DOM" />
      <html.div style={styles.row}>
        <Button onPress={() => setPresses((n) => n + 1)} data-testid="press-me">
          Pressed {presses} times
        </Button>
        <Button variant="secondary" onPress={() => setPresses(0)} data-testid="reset">
          Reset
        </Button>
      </html.div>
    </html.div>
  );
}

const styles = css.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    marginBlockStart: 16,
  },
});
