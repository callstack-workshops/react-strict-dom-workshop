import { css, html } from 'react-strict-dom';
import { useTheme } from '@core/providers/theme';
import { LocaleSwitcher } from '@ui/components';
import {
  colors,
  textPrimaryColor,
  textPrimaryColorDark,
} from '@ui/tokens/tokens.css';
import { Icon } from './icon';

export function Navbar({ topInset }: { topInset: number }) {
  const { isDark, toggleTheme } = useTheme();
  const iconColor = isDark ? textPrimaryColorDark : textPrimaryColor;
  return (
    <html.div style={[styles.navbar, styles.navbarTopInset(topInset)]}>
      <html.div style={styles.brand}>
        <html.div style={styles.brandMark}>
          <html.div style={styles.brandRing} />
        </html.div>
        <html.span style={styles.brandText}>RSD Workshop</html.span>
      </html.div>
      <html.div style={styles.spacer} />
      <LocaleSwitcher />
      <html.button
        style={styles.toggle}
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        <Icon name={isDark ? 'sun' : 'moon'} size={17} color={iconColor} />
      </html.button>
    </html.div>
  );
}

const styles = css.create({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingInline: 16,
    paddingBlockEnd: 12,
    backgroundColor: colors.bgCard,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  navbarTopInset: (top: number) => ({
    paddingBlockStart: top + 8,
  }),
  brand: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandMark: {
    display: 'flex',
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: colors.actionPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandRing: {
    width: 9,
    height: 9,
    borderRadius: 9,
    borderStyle: 'solid',
    borderWidth: 2.2,
    borderColor: colors.textOnAction,
  },
  brandText: {
    marginInlineStart: 9,
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: -0.3,
    color: colors.textPrimary,
  },
  spacer: {
    flexGrow: 1,
  },
  toggle: {
    display: 'flex',
    marginInlineStart: 10,
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgCard,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.border,
  },
});
