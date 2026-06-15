import { css, html } from 'react-strict-dom';
import { useLocalization } from '@core/i18n/provider';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';

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

// A plausible "demand" metric for a departure (price weighted by scarcity). The loop stands in for
// the real arithmetic a derived metric would do.
function demandScore(d: Departure): number {
  const price = parseInt(d.price.replace(/\D/g, ''), 10);
  const spots = d.spots.kind === 'soldout' ? 0 : d.spots.n;
  let s = 0;
  for (let k = 0; k < 40; k++) s += (price * (k + 1)) / (spots + 1) - Math.sqrt(k + price);
  return s;
}

// Where this departure ranks by demand among the whole list (1 = highest).
function computeDemandRank(d: Departure, all: Departure[]): number {
  const scores = all.map(demandScore).sort((a, b) => b - a);
  return scores.indexOf(demandScore(d)) + 1;
}

const TONE_HEX: Record<Departure['tone'], string> = {
  teal: '#14B8A6',
  rose: '#FB7185',
  green: '#34D399',
  violet: '#A78BFA',
};

// dynamic (parameterized) css.create styles: resolved on every call instead of reusing a
// precomputed atomic variant (see cause 2 in the row below).
const dyn = css.create({
  avatarTone: (bg: string) => ({ backgroundColor: bg }),
  priceTone: (c: string) => ({ color: c }),
});

export type DeparturesListProps = { count?: number };

export function DeparturesList({ count = 12 }: DeparturesListProps) {
  const { i18n } = useLocalization();
  const departures = makeDepartures(count);
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
        {departures.map((d, i) => {
          // WORKSHOP-TODO(X3) cause 3 of 3, the compute foil: computeDemandRank re-scores the WHOLE
          // list on every row, every render. That is generic O(n^2) JavaScript and has nothing to do
          // with RSD; the profiler shows demandScore as a hot non-RSD leaf. Fix: compute the ranks once
          // for the list (useMemo) and look each row up. The lesson is the diagnosis: not everything
          // slow in an RSD app is the RSD tax. Memoizing fixes this; it would do nothing for cause 1.
          const rank = computeDemandRank(d, departures);
          // WORKSHOP-TODO(X3) cause 2 of 3, dynamic styles: dyn.avatarTone / dyn.priceTone below are
          // dynamic css.create styles, resolved on every render instead of reusing a precomputed
          // atomic variant. Fix: move them to static css.create variants keyed by tone / status
          // (see avatarTones in the solution, and X1's variant-vs-dynamic decision).
          return (
            <html.div key={i} style={styles.row}>
              {/* WORKSHOP-TODO(X3) cause 1 of 3, per-element fan-out: every cell is wrapped in its own
                  layout-only <html.div> (cellAvatar / cell / cellEnd). On web that is free (StyleX
                  atomic CSS, zero added runtime). On native each html.* element runs useStyleProps on
                  every render (four React contexts plus a style-inheritance walk), so the redundant
                  wrappers multiply the per-element tax across the list. Fix: drop the wrappers and
                  render the leaves directly. The lever is element COUNT. */}
              <html.div style={styles.cellAvatar}>
                <html.div style={[styles.avatarSm, dyn.avatarTone(TONE_HEX[d.tone])]} />
              </html.div>
              <html.div style={styles.rowMid}>
                <html.div style={styles.cell}>
                  <html.span style={styles.rowGuideName}>{d.guide}</html.span>
                </html.div>
                <html.div style={styles.cell}>
                  <html.span style={styles.rowGuideRole}>
                    {i18n.t(`shell.role.${d.role}`)}
                  </html.span>
                </html.div>
                <html.div style={styles.cell}>
                  <html.span style={styles.rowMeta}>
                    {d.date} · {d.time} · {spotsText(d.spots)} · #{rank}
                  </html.span>
                </html.div>
              </html.div>
              <html.div style={styles.rowEnd}>
                <html.div style={styles.cellEnd}>
                  <html.span
                    style={[
                      styles.rowPrice,
                      dyn.priceTone(d.status === 'hot' ? '#E11D48' : colors.textPrimary),
                    ]}
                  >
                    {d.price}
                  </html.span>
                </html.div>
                <html.div style={styles.cellEnd}>
                  <StatusBadge status={d.status} />
                </html.div>
              </html.div>
            </html.div>
          );
        })}
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
  avatarSm: { width: 36, height: 36, borderRadius: 999, flexShrink: 0 },
  cellAvatar: { display: 'flex', flexShrink: 0, alignSelf: 'center' },
  cell: { display: 'flex' },
  cellEnd: { display: 'flex', alignSelf: 'flex-end' },
  rowMid: { display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0, gap: 2 },
  rowGuideName: { display: 'block', fontSize: 14, fontWeight: 600, color: colors.textPrimary },
  rowGuideRole: { display: 'block', fontSize: 12.5, color: colors.textMuted },
  rowMeta: { display: 'block', fontSize: 12, color: colors.textPlaceholder },
  rowEnd: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0, gap: 5 },
  rowPrice: { fontSize: 14, fontWeight: 700, textAlign: 'right', color: colors.textPrimary },
  badge: { flexShrink: 0, textAlign: 'center', fontSize: 11, fontWeight: 700, borderRadius: 999, paddingBlock: 4, paddingInline: 10 },
  badgeOk: { color: colors.onActionSubtle, backgroundColor: colors.bgActionSubtle },
  badgeHot: { color: colors.onActionSubtle, backgroundColor: colors.bgActionSubtleStrong },
  badgeFull: { color: colors.textPlaceholder, backgroundColor: colors.bgSurface, borderWidth: 1, borderStyle: 'solid', borderColor: colors.border },
});
