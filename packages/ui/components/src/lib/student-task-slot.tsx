import { css, html } from 'react-strict-dom';
import { useLocalization } from '@core/i18n/provider';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';

export function StudentTaskSlot() {
  const { i18n } = useLocalization();
  return (
    <html.div style={styles.slot}>
      <html.span style={styles.slotPill}>{i18n.t('shell.pill')}</html.span>
    </html.div>
  );
}

const styles = css.create({
  slot: {
    position: 'relative',
    width: 470,
    maxWidth: '100%',
    minHeight: 494,
    flexShrink: 0,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.actionPrimary,
    borderRadius: radius.xl,
    backgroundColor: colors.bgCard,
    paddingBlock: spacing.x4,
    paddingInline: spacing.x4,
  },
  slotPill: {
    position: 'absolute',
    insetBlockStart: -12,
    insetInlineStart: 20,
    display: 'flex',
    alignItems: 'center',
    height: '15px',
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.textOnAction,
    backgroundColor: colors.actionPrimary,
    borderRadius: 999,
    paddingBlock: 4,
    paddingInline: 10,
  },
});
