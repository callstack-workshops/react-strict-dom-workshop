import { html, css } from 'react-strict-dom';

type GreetingProps = {
  name: string;
};

export function Greeting({ name }: GreetingProps) {
  return (
    <html.div style={styles.root}>
      <html.h1 style={styles.title}>Hello, {name}</html.h1>
      <html.p style={styles.body}>Shared from @workshop/ui, rendered with React Strict DOM.</html.p>
    </html.div>
  );
}

const styles = css.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  body: {
    marginBlockStart: 8,
    color: '#333',
    textAlign: 'center',
  },
});
