'use client';

import { css, html } from 'react-strict-dom';
import { useLocalization } from '@core/i18n/provider';
import { useTheme } from '@core/providers/theme';
import { LocaleSwitcher } from '@ui/components';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';
import { shared } from './shared-styles';
import { IconSearch, IconSun, IconMoon, IconBell } from './icons';

export function Topbar() {
  const { isDark, toggleTheme } = useTheme();
  const { i18n } = useLocalization();
  return (
    <html.div style={styles.top}>
      <html.span style={styles.crumbMuted}>{i18n.t('shell.crumb.bookings')}</html.span>
      <html.span style={styles.crumbSep}>/</html.span>
      <html.span style={styles.crumbActive}>{i18n.t('shell.crumb.new')}</html.span>
      <html.div style={styles.spacer} />
      <html.button type="button" style={styles.search}>
        <IconSearch />
        <html.span style={styles.searchText}>{i18n.t('shell.search')}</html.span>
      </html.button>
      <LocaleSwitcher />
      {/* WORKSHOP-TODO(X2 A2): inspect this toggle. The on/off rides on aria-pressed - it announces on
          web but is dropped silently on native (RN accessibilityState has no 'pressed' field). Fix: the
          accessible Toggle primitive that carries its state in the label, shared by navbar and topbar. */}
      <html.button onClick={toggleTheme} aria-label="Dark mode" aria-pressed={isDark} style={styles.iconBtn}>
        {isDark ? <IconSun /> : <IconMoon />}
      </html.button>
      <html.button aria-label="Notifications" style={styles.iconBtn}>
        <IconBell />
      </html.button>
      <html.div style={styles.topDivider} />
      <html.div style={[shared.avatar, shared.avatarGreen]} />
    </html.div>
  );
}

const styles = css.create({
  top: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2,
    height: 64,
    flexShrink: 0,
    paddingInline: spacing.x4,
    backgroundColor: colors.bgCard,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderColor: colors.border,
  },
  crumbMuted: { fontSize: 14, color: colors.textMuted },
  crumbSep: { fontSize: 14, color: colors.textPlaceholder },
  crumbActive: { fontSize: 14, fontWeight: 600, color: colors.textPrimary },
  spacer: { flexGrow: 1 },
  search: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x2,
    height: 38,
    width: 220,
    paddingInline: spacing.x3,
    borderRadius: radius.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.bgSurface,
    color: colors.textPlaceholder,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  searchText: { fontSize: 13.5, color: colors.textPlaceholder },
  iconBtn: {
    width: 38,
    height: 38,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.bgSurface,
    color: colors.textPrimary,
    cursor: 'pointer',
  },
  topDivider: { width: 1, height: 26, backgroundColor: colors.border, marginInline: spacing.x1 },
});
