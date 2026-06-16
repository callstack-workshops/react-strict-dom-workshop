import { useMemo } from 'react';
import { css, html } from 'react-strict-dom';
import { useLocalization } from '@core/i18n/provider';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';
import { Avatar } from './avatar.js';

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

const base: Departure[] = [
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

// repeat the seed data to a requested length so the same list drives the dashboard rail (default 12)
// and longer measurement / departures-tab views without new fixtures.
function makeDepartures(count: number): Departure[] {
  const out: Departure[] = [];
  for (let i = 0; i < count; i++) out.push(base[i % base.length]);
  return out;
}

// A plausible "demand" metric for a departure (price weighted by scarcity).
function demandScore(d: Departure): number {
  const price = parseInt(d.price.replace(/\D/g, ''), 10);
  const spots = d.spots.kind === 'soldout' ? 0 : d.spots.n;
  let s = 0;
  for (let k = 0; k < 40; k++) s += (price * (k + 1)) / (spots + 1) - Math.sqrt(k + price);
  return s;
}

export type DeparturesListProps = { count?: number };

export function DeparturesList({ count = 12 }: DeparturesListProps) {
  const { i18n } = useLocalization();
  const departures = makeDepartures(count);
  // ranks computed once for the whole list (not per row), so the O(n^2) demand scan is gone
  const ranks = useMemo(() => {
    const scores = makeDepartures(count).map(demandScore);
    const sorted = [...scores].sort((a, b) => b - a);
    return scores.map((sc) => sorted.indexOf(sc) + 1);
  }, [count]);
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
        <html.span style={styles.chip}>{i18n.t('shell.list.month')}</html.span>
      </html.div>
      <html.div style={styles.listBody}>
        {departures.map((d, i) => (
          <html.div key={i} style={styles.row}>
            <Avatar tone={d.tone} />
            <html.div style={styles.rowMid}>
              <html.span style={styles.rowGuideName}>{d.guide}</html.span>
              <html.span style={styles.rowGuideRole}>{i18n.t(`shell.role.${d.role}`)}</html.span>
              <html.span style={styles.rowMeta}>
                {d.date} · {d.time} · {spotsText(d.spots)} · #{ranks[i]}
              </html.span>
            </html.div>
            <html.div style={styles.rowEnd}>
              <html.span style={[styles.rowPrice, d.status === 'hot' && styles.rowPriceHot]}>
                {d.price}
              </html.span>
              <StatusBadge status={d.status} />
            </html.div>
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
  chip: { alignSelf: 'flex-start', fontSize: 12.5, fontWeight: 600, color: colors.textMuted, backgroundColor: colors.bgSurface, borderWidth: 1, borderStyle: 'solid', borderColor: colors.border, borderRadius: 999, paddingBlock: 5, paddingInline: 10 },
  listBody: { flexGrow: 1, minHeight: 0 },
  row: { display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: spacing.x3, paddingBlock: 12, paddingInline: spacing.x4, borderBottomWidth: 1, borderBottomStyle: 'solid', borderColor: colors.border },
  rowMid: { display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0, gap: 2 },
  rowGuideName: { display: 'block', fontSize: 14, fontWeight: 600, color: colors.textPrimary },
  rowGuideRole: { display: 'block', fontSize: 12.5, color: colors.textMuted },
  rowMeta: { display: 'block', fontSize: 12, color: colors.textPlaceholder },
  rowEnd: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0, gap: 5 },
  rowPrice: { fontSize: 14, fontWeight: 700, textAlign: 'right', color: colors.textPrimary },
  rowPriceHot: { color: '#E11D48' },
  badge: { flexShrink: 0, textAlign: 'center', fontSize: 11, fontWeight: 700, borderRadius: 999, paddingBlock: 4, paddingInline: 10 },
  badgeOk: { color: colors.onActionSubtle, backgroundColor: colors.bgActionSubtle },
  badgeHot: { color: colors.onActionSubtle, backgroundColor: colors.bgActionSubtleStrong },
  badgeFull: { color: colors.textPlaceholder, backgroundColor: colors.bgSurface, borderWidth: 1, borderStyle: 'solid', borderColor: colors.border },
});
