'use client';

import { css, html } from 'react-strict-dom';
import { useLocalization } from '@core/i18n/provider';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';
import { shared } from './shared-styles';

export function Sidebar() {
  const { i18n } = useLocalization();
  return (
    <html.div style={styles.side}>
      <Brand />
      <html.nav style={styles.sideNav}>
        <html.span style={styles.sideLabel}>{i18n.t('shell.group.operations')}</html.span>
        <SideLink label={i18n.t('shell.nav.dashboard')} />
        <SideLink label={i18n.t('shell.nav.bookings')} active badge="5" />
        <SideLink label={i18n.t('shell.nav.experiences')} />
        <html.span style={styles.sideLabel}>{i18n.t('shell.group.manage')}</html.span>
        <SideLink label={i18n.t('shell.nav.guides')} />
        <SideLink label={i18n.t('shell.nav.settings')} />
      </html.nav>
      <html.div style={styles.sideFoot}>
        <html.div style={[shared.avatar, shared.avatarGreen]} />
        <html.div>
          <html.span style={styles.sideFootName}>John Fanidis</html.span>
          <html.span style={styles.sideFootRole}>{i18n.t('shell.user.role')}</html.span>
        </html.div>
      </html.div>
    </html.div>
  );
}

function SideLink({
  label,
  active = false,
  badge,
}: {
  label: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <html.button
      type="button"
      aria-current={active ? 'page' : undefined}
      style={[styles.sideLink, active && styles.sideLinkActive]}
    >
      <html.span style={[styles.sideLinkText, active && styles.sideLinkTextActive]}>
        {label}
      </html.span>
      {badge != null ? <html.span style={styles.sideBadge}>{badge}</html.span> : null}
    </html.button>
  );
}

function Brand() {
  return (
    <html.div style={styles.brand}>
      <html.div style={styles.brandMark}>
        <html.div style={styles.brandRing} />
      </html.div>
      <html.span style={styles.brandName}>RSD Workshop</html.span>
    </html.div>
  );
}

const styles = css.create({
  side: {
    display: 'flex',
    flexDirection: 'column',
    width: 248,
    flexShrink: 0,
    paddingBlock: spacing.x4,
    paddingInline: spacing.x3,
    backgroundColor: colors.bgCard,
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderColor: colors.border,
  },
  brand: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: spacing.x2, paddingInline: spacing.x2, marginBlockEnd: spacing.x4 },
  brandMark: { width: 30, height: 30, borderRadius: radius.lg, backgroundColor: colors.actionPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  brandRing: { width: 11, height: 11, borderRadius: 999, borderWidth: 2.5, borderStyle: 'solid', borderColor: colors.textOnAction },
  brandName: { fontSize: 19, fontWeight: 700, color: colors.textPrimary },
  sideNav: { display: 'flex', flexDirection: 'column' },
  sideLabel: { fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: colors.textPlaceholder, paddingInline: spacing.x2, marginBlockStart: spacing.x3, marginBlockEnd: spacing.x1 },
  sideLink: { display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', paddingBlock: 10, paddingInline: spacing.x2, borderWidth: 0, borderRadius: radius.lg, marginBlockEnd: 2, backgroundColor: 'transparent', fontFamily: 'inherit', cursor: 'pointer' },
  sideLinkActive: { backgroundColor: colors.bgActionSubtle },
  sideLinkText: { fontSize: 15, fontWeight: 500, color: colors.textMuted },
  sideLinkTextActive: { color: colors.onActionSubtle, fontWeight: 600 },
  sideBadge: { marginInlineStart: 'auto', fontSize: 11, fontWeight: 700, color: colors.textOnAction, backgroundColor: colors.actionPrimary, borderRadius: 999, paddingBlock: 2, paddingInline: 7 },
  sideFoot: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: spacing.x2, marginBlockStart: 'auto', paddingBlockStart: spacing.x3, borderTopWidth: 1, borderTopStyle: 'solid', borderColor: colors.border },
  sideFootName: { display: 'block', fontSize: 14, fontWeight: 600, color: colors.textPrimary },
  sideFootRole: { display: 'block', fontSize: 12, color: colors.textMuted },
});
