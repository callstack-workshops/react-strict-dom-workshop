import { html, css } from 'react-strict-dom';
import { Greeting } from '@workshop/ui';

export default function App() {
  return (
    <html.div style={styles.screen}>
      <Greeting name="React Native" />
    </html.div>
  );
}

const styles = css.create({
  screen: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: '#f2f2f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
