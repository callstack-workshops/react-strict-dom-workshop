import { css, html } from 'react-strict-dom';

export type GreetingProps = {
  name?: string;
};

export function Greeting({ name = 'world' }: GreetingProps) {
  return (
    <html.div style={styles.container}>
      <html.h1 style={styles.title}>Hello, {name}</html.h1>
      <html.p style={styles.message}>
        Rendered from @ui/components through React Strict DOM.
      </html.p>
    </html.div>
  );
}

const styles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBlock: 24,
    paddingInline: 24,
    backgroundColor: '#0b1021',
    borderRadius: 16,
  },
  title: {
    color: '#e8ecff',
    fontSize: 28,
    fontWeight: 700,
    textAlign: 'center',
    marginBlockEnd: 8,
  },
  message: {
    color: '#9aa4d6',
    fontSize: 16,
    textAlign: 'center',
  },
});