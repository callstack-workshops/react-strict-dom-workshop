'use client';

import { css, html } from 'react-strict-dom';
import { useLocalization } from '@core/i18n/provider';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';
import { shared } from './shared-styles';

type Role = 'marineBiologist' | 'leadGuide' | 'sunsetSpecialist' | 'safetyLead';
type Spots =
  | { kind: 'left'; n: number }
  | { kind: 'soldout' }
  | { kind: 'sunset'; n: number };

type Departure = {
  date: string;
  time: string;
  guide: string;
  role: Role;
  tone: 'teal' | 'rose' | 'green' | 'violet';
  spots: Spots;
  status: 'available' | 'hot' | 'full';
  price: string;
};

const departures: Departure[] = [
  { date: 'Sat 14 Jun', time: '09:30', guide: 'Inês Carvalho', role: 'marineBiologist', tone: 'rose', spots: { kind: 'left', n: 2 }, status: 'hot', price: '€74' },
  { date: 'Sat 14 Jun', time: '14:00', guide: 'Miguel Santos', role: 'leadGuide', tone: 'teal', spots: { kind: 'soldout' }, status: 'full', price: '€74' },
  { date: 'Sun 15 Jun', time: '09:30', guide: 'Inês Carvalho', role: 'marineBiologist', tone: 'rose', spots: { kind: 'left', n: 5 }, status: 'available', price: '€74' },
  { date: 'Sun 15 Jun', time: '16:30', guide: 'Sofia Marques', role: 'sunsetSpecialist', tone: 'green', spots: { kind: 'sunset', n: 3 }, status: 'hot', price: '€86' },
  { date: 'Tue 17 Jun', time: '10:00', guide: 'João Pereira', role: 'safetyLead', tone: 'violet', spots: { kind: 'left', n: 8 }, status: 'available', price: '€74' },
  { date: 'Wed 18 Jun', time: '09:30', guide: 'Miguel Santos', role: 'leadGuide', tone: 'teal', spots: { kind: 'left', n: 6 }, status: 'available', price: '€74' },
  { date: 'Thu 19 Jun', time: '14:00', guide: 'Sofia Marques', role: 'sunsetSpecialist', tone: 'green', spots: { kind: 'left', n: 1 }, status: 'hot', price: '€74' },
  { date: 'Fri 20 Jun', time: '09:30', guide: 'Inês Carvalho', role: 'marineBiologist', tone: 'rose', spots: { kind: 'left', n: 4 }, status: 'available', price: '€74' },
  { date: 'Sat 21 Jun', time: '09:30', guide: 'João Pereira', role: 'safetyLead', tone: 'violet', spots: { kind: 'soldout' }, status: 'full', price: '€74' },
  { date: 'Sat 21 Jun', time: '16:30', guide: 'Sofia Marques', role: 'sunsetSpecialist', tone: 'green', spots: { kind: 'sunset', n: 5 }, status: 'available', price: '€86' },
  { date: 'Sun 22 Jun', time: '10:00', guide: 'Miguel Santos', role: 'leadGuide', tone: 'teal', spots: { kind: 'left', n: 7 }, status: 'available', price: '€74' },
  { date: 'Tue 24 Jun', time: '09:30', guide: 'Inês Carvalho', role: 'marineBiologist', tone: 'rose', spots: { kind: 'left', n: 3 }, status: 'available', price: '€74' },
];

const avatarTones = css.create({
  teal: { backgroundColor: '#14B8A6' },
  rose: { backgroundColor: '#FB7185' },
  green: { backgroundColor: '#34D399' },
  violet: { backgroundColor: '#A78BFA' },
});

export function DeparturesList() {
  const { i18n } = useLocalization();
  const spotsText = (s: Spots) =>
    s.kind === 'soldout'
      ? i18n.t('shell.spots.soldout')
      : s.kind === 'sunset'
        ? i18n.t('shell.spots.sunset').replace('{n}', String(s.n))
        : i18n.t('shell.spots.left').replace('{n}', String(s.n));
  return (
    <html.div style={styles.list}>
      <html.div style={styles.listHead}>
        <html.div>
          <html.span style={styles.listTitle}>{i18n.t('shell.list.title')}</html.span>
          <html.span style={styles.listSub}>
            {i18n.t('shell.list.sub').replace('{n}', String(departures.length))}
          </html.span>
        </html.div>
        <html.span style={shared.chip}>{i18n.t('shell.list.month')}</html.span>
      </html.div>
      <html.div style={styles.listBody}>
        {departures.map((d, i) => (
          <html.div key={i} style={styles.row}>
            <html.div style={styles.rowDate}>
              <html.span style={styles.rowDateB}>{d.date}</html.span>
              <html.span style={styles.rowDateT}>{d.time}</html.span>
            </html.div>
            <html.div style={styles.rowGuide}>
              <html.div style={[styles.avatarSm, avatarTones[d.tone]]} />
              <html.div>
                <html.span style={styles.rowGuideName}>{d.guide}</html.span>
                <html.span style={styles.rowGuideRole}>
                  {i18n.t(`shell.role.${d.role}`)}
                </html.span>
              </html.div>
            </html.div>
            <html.span style={styles.rowSpots}>{spotsText(d.spots)}</html.span>
            <StatusBadge status={d.status} />
            <html.span style={styles.rowPrice}>{d.price}</html.span>
          </html.div>
        ))}
      </html.div>
    </html.div>
  );
}

function StatusBadge({ status }: { status: Departure['status'] }) {
  const { i18n } = useLocalization();
  const map = {
    available: { style: styles.badgeOk, key: 'shell.status.available' },
    hot: { style: styles.badgeHot, key: 'shell.status.hot' },
    full: { style: styles.badgeFull, key: 'shell.status.full' },
  } as const;
  const b = map[status];
  return <html.span style={[styles.badge, b.style]}>{i18n.t(b.key)}</html.span>;
}

const styles = css.create({
  list: { display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0, backgroundColor: colors.bgCard, borderWidth: 1, borderStyle: 'solid', borderColor: colors.border, borderRadius: radius.xl, overflow: 'hidden' },
  listHead: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBlock: spacing.x3, paddingInline: spacing.x4, borderBottomWidth: 1, borderBottomStyle: 'solid', borderColor: colors.border, flexShrink: 0 },
  listTitle: { display: 'block', fontSize: 15.5, fontWeight: 700, color: colors.textPrimary },
  listSub: { display: 'block', fontSize: 12.5, color: colors.textMuted },
  listBody: { flexGrow: 1, minHeight: 0, overflowY: 'scroll' },
  row: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: spacing.x4, paddingBlock: 13, paddingInline: spacing.x4, borderBottomWidth: 1, borderBottomStyle: 'solid', borderColor: colors.border },
  rowDate: { width: 110, flexShrink: 0 },
  rowDateB: { display: 'block', fontSize: 14, fontWeight: 600, color: colors.textPrimary },
  rowDateT: { display: 'block', fontSize: 12.5, color: colors.textMuted },
  rowGuide: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: spacing.x2, flexGrow: 1, minWidth: 0 },
  rowGuideName: { display: 'block', fontSize: 13.5, fontWeight: 600, color: colors.textPrimary },
  rowGuideRole: { display: 'block', fontSize: 12, color: colors.textMuted },
  rowSpots: { width: 120, flexShrink: 0, fontSize: 13, color: colors.textMuted },
  rowPrice: { width: 64, flexShrink: 0, fontSize: 14, fontWeight: 700, textAlign: 'right', color: colors.textPrimary },
  avatarSm: { width: 32, height: 32, borderRadius: 999, flexShrink: 0 },
  badge: { width: 96, flexShrink: 0, textAlign: 'center', fontSize: 11, fontWeight: 700, borderRadius: 999, paddingBlock: 4 },
  badgeOk: { color: colors.onActionSubtle, backgroundColor: colors.bgActionSubtle },
  badgeHot: { color: colors.onActionSubtle, backgroundColor: colors.bgActionSubtleStrong },
  badgeFull: { color: colors.textPlaceholder, backgroundColor: colors.bgSurface, borderWidth: 1, borderStyle: 'solid', borderColor: colors.border },
});
