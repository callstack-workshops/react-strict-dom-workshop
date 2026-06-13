import { css, html } from 'react-strict-dom';
import { useLocalization } from '@core/i18n/provider';
import { useTheme } from '@core/providers/theme';
import {
  colors,
  textPlaceholderColor,
  textPlaceholderColorDark,
  textOnActionColor,
} from '@ui/tokens/tokens.css';
import { Icon } from './icon';

const TABS = [
  { key: 'explore', labelKey: 'mobile.tab.explore', fab: false },
  { key: 'cal', labelKey: 'mobile.tab.departures', fab: false },
  { key: 'plus', labelKey: 'mobile.tab.book', fab: true },
  { key: 'bag', labelKey: 'mobile.tab.trips', fab: false },
  { key: 'user', labelKey: 'mobile.tab.profile', fab: false },
] as const;

export function TabBar({ bottomInset }: { bottomInset: number }) {
  const { isDark } = useTheme();
  const { i18n } = useLocalization();
  const inactive = isDark ? textPlaceholderColorDark : textPlaceholderColor;
  return (
    <html.div style={[styles.tabbar, styles.tabbarBottomInset(bottomInset)]}>
      {TABS.map((tab) =>
        tab.fab ? (
          <html.div key={tab.key} style={styles.tabItem}>
            <html.div style={styles.fab}>
              <Icon name={tab.key} size={24} color={textOnActionColor} />
            </html.div>
          </html.div>
        ) : (
          <html.div key={tab.key} style={styles.tabItem}>
            <Icon name={tab.key} size={24} color={inactive} />
            <html.span style={styles.tabLabel}>
              {i18n.t(tab.labelKey)}
            </html.span>
          </html.div>
        ),
      )}
    </html.div>
  );
}

const styles = css.create({
  tabbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBlockStart: 9,
    paddingInline: 8,
    backgroundColor: colors.bgCard,
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tabbarBottomInset: (bottom: number) => ({
    paddingBlockEnd: bottom + 8,
  }),
  tabItem: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: 0,
    alignItems: 'center',
  },
  fab: {
    display: 'flex',
    width: 50,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.actionPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    marginBlockStart: 4,
    fontSize: 10.5,
    fontWeight: 600,
    color: colors.textPlaceholder,
  },
});
