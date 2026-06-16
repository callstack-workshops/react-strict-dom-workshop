import { AccessibilityInfo, ScrollView } from 'react-native';
import { css, html } from 'react-strict-dom';
import { ThemeBoundary } from '@core/providers/theme';
import { PromoCode } from '@screen/booking';
import { colors, spacing, radius } from '@ui/tokens/tokens.css';

export function AccountScreen() {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
      <ThemeBoundary>
        <html.div style={styles.screen}>
          <html.h2 style={styles.heading}>Account</html.h2>
          <html.div style={styles.profileRow}>
            <html.div style={styles.avatar} />
            <html.div style={styles.profileText}>
              <html.span style={styles.name}>John Fanidis</html.span>
              <html.span style={styles.email}>john@example.com</html.span>
            </html.div>
          </html.div>
          <PromoCode
            announce={(message) =>
              AccessibilityInfo.announceForAccessibilityWithOptions(message, {
                queue: true,
              })
            }
          />
        </html.div>
      </ThemeBoundary>
    </ScrollView>
  );
}

const styles = css.create({
  screen: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.x3,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  profileRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
    paddingBlock: spacing.x3,
    paddingInline: spacing.x4,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radius.xl,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: '#34D399',
    flexShrink: 0,
  },
  profileText: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  email: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
