'use client';

import { css, html } from 'react-strict-dom';
import { LocalizationProvider } from '@core/i18n/provider';
import { ThemeProvider, ThemeBoundary } from '@core/providers/theme';
import { colors, spacing } from '@ui/tokens/tokens.css';
import { useLocalization } from '@core/i18n/provider';
import { DeparturesList, ExperienceBanner } from '@ui/components';
import { DocumentTheme } from './_components/document-theme';
import { Sidebar } from './_components/sidebar';
import { Topbar } from './_components/topbar';
import { HelpPanel } from './_components/help-panel';
import { BookingScreen } from '@screen/booking';

export default function Index() {
  return (
    <ThemeProvider>
      <ThemeBoundary>
        <DocumentTheme />
        <LocalizationProvider>
          <BookingDashboard />
        </LocalizationProvider>
      </ThemeBoundary>
    </ThemeProvider>
  );
}

function BookingDashboard() {
  const { i18n } = useLocalization();
  return (
    <html.div style={styles.shell}>
      <Sidebar />
      <html.div style={styles.main}>
        <Topbar />
        <html.div style={styles.body}>
          <html.div style={styles.cols}>
            <html.div style={styles.leftCol}>
              <BookingScreen />
              <HelpPanel />
            </html.div>
            <html.div style={styles.rail}>
              <ExperienceBanner
                location="Sintra Coast, Portugal"
                title="Coastal Caves Kayak Tour"
                availability="filling"
                chips={[
                  i18n.t('shell.banner.duration'),
                  i18n.t('shell.banner.group'),
                  'EN · DE',
                ]}
                price="€74"
                priceSub={i18n.t('shell.banner.perPerson')}
                rating="★★★★★ 4.9"
              />
              <DeparturesList />
            </html.div>
          </html.div>
        </html.div>
      </html.div>
    </html.div>
  );
}

const styles = css.create({
  shell: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    backgroundColor: colors.bgSurface,
    color: colors.textPrimary,
  },
  main: { display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 },
  body: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: 0,
    paddingBlock: spacing.x4,
    paddingInline: spacing.x5,
  },
  cols: { display: 'flex', flexDirection: 'row', gap: spacing.x4, flexGrow: 1, minHeight: 0 },
  leftCol: { display: 'flex', flexDirection: 'column', gap: spacing.x3, flexShrink: 0 },
  rail: { display: 'flex', flexDirection: 'column', gap: spacing.x3, flexGrow: 1, minHeight: 0, minWidth: 0 },
});
