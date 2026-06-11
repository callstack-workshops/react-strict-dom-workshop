import { css, html } from 'react-strict-dom';
import { useLocalization } from '@core/i18n/provider';
import type { Locale } from '@core/i18n';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';
import { Flag } from './flag.js';

type Option = {
  locale: Locale;
  country: string;
  width: number;
  height: number;
  label: string;
};

const OPTIONS: Option[] = [
  { locale: 'en', country: 'gb', width: 36, height: 18, label: 'English' },
  { locale: 'de', country: 'de', width: 36, height: 22, label: 'Deutsch' },
];

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocalization();
  return (
    <html.div style={styles.bar}>
      {OPTIONS.map((opt) => (
        <html.button
          key={opt.locale}
          onClick={() => setLocale(opt.locale)}
          aria-label={opt.label}
          style={[styles.chip, opt.locale === locale ? styles.chipActive : null]}
        >
          <Flag code={opt.country} width={opt.width} height={opt.height} alt={opt.label} />
        </html.button>
      ))}
    </html.div>
  );
}

const styles = css.create({
  bar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2,
  },
  chip: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.x1,
    borderRadius: radius.md,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'transparent',
    backgroundColor: colors.bgCard,
    cursor: 'pointer',
  },
  chipActive: {
    borderColor: colors.actionPrimary,
  },
});
