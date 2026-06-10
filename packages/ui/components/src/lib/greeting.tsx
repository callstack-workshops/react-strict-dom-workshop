import { css, html } from 'react-strict-dom';
import { createI18n, type I18n } from '@core/i18n';
import { colors } from '@ui/tokens/tokens.css';

export type GreetingProps = {
  name?: string;
  i18n?: I18n;
};

export function Greeting({ name = 'world', i18n = createI18n('en') }: GreetingProps) {
  return (
    <html.div style={styles.container}>
      <html.h1 style={styles.title}>
        {i18n.t('greeting.hello')}, {name}
      </html.h1>
      <html.p style={styles.message}>{i18n.t('greeting.subtitle')}</html.p>
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
    color: colors.actionPrimary,
    fontSize: 16,
    textAlign: 'center',
  },
});
