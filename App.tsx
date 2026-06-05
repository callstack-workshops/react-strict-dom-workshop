import { html, css } from 'react-strict-dom';

export default function App() {
  return (
    <html.div data-layoutconformance="strict" style={styles.root}>
      <html.h1 style={styles.title}>RSD on SDK 56</html.h1>
      <html.p style={styles.body}>This renders on web, iOS, and Android.</html.p>
    </html.div>
  );
}

const styles = css.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  body: {
    marginBlockStart: 8,
    color: '#333',
  },
});