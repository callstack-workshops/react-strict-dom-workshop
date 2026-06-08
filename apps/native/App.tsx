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
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    backgroundColor: '#f2f2f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
