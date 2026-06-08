import { html, css } from 'react-strict-dom';

export default function App() {
  return (
    <html.div data-layoutconformance="strict" style={styles.root}>
      <html.div style={styles.card}>
        <html.p style={styles.title}>React Strict DOM</html.p>
        <html.p style={styles.subtitle}>Rendering natively via the shared API</html.p>
      </html.div>
    </html.div>
  );
}

const styles = css.create({
  root: {
    flexGrow: 1,
    backgroundColor: '#0b1020',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#1b2440',
    borderRadius: 16,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 32,
    paddingRight: 32,
  },
  title: {
    color: '#e6ecff',
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: '#9fb0d9',
    fontSize: 14,
    marginTop: 8,
  },
});