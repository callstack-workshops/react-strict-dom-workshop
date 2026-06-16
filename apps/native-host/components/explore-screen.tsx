import { ScrollView } from 'react-native';
import { css, html } from 'react-strict-dom';
import { ThemeBoundary } from '@core/providers/theme';
import { ExperienceBanner } from '@ui/components';
import type { Availability } from '@ui/components';
import { colors, spacing } from '@ui/tokens/tokens.css';

type Experience = {
  title: string;
  location: string;
  availability: Availability;
  chips: string[];
  price: string;
  priceSub: string;
  rating: string;
};

const EXPERIENCES: Experience[] = [
  {
    title: 'Coastal Caves Kayak Tour',
    location: 'Sintra Coast, Portugal',
    availability: 'filling',
    chips: ['3.5 hours', 'Up to 8', 'EN · DE'],
    price: '€74',
    priceSub: 'per person · incl. tax',
    rating: '★★★★★ 4.9',
  },
  {
    title: 'Old Town Food & Wine Walk',
    location: 'Lisbon, Portugal',
    availability: 'available',
    chips: ['3 hours', 'Up to 10', 'EN · PT'],
    price: '€52',
    priceSub: 'per person · incl. tax',
    rating: '★★★★★ 4.8',
  },
  {
    title: 'Sunrise Hot Air Balloon',
    location: 'Cappadocia, Türkiye',
    availability: 'soldout',
    chips: ['1 hour', 'Up to 16', 'EN'],
    price: '€165',
    priceSub: 'per person · incl. tax',
    rating: '★★★★★ 4.9',
  },
  {
    title: 'Douro Valley Vineyard E-Bike',
    location: 'Douro, Portugal',
    availability: 'available',
    chips: ['5 hours', 'Up to 6', 'EN · DE · PT'],
    price: '€88',
    priceSub: 'per person · incl. tax',
    rating: '★★★★☆ 4.7',
  },
];

export function ExploreScreen() {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
      <ThemeBoundary>
        <html.div style={styles.feed}>
          <html.span style={styles.heading}>Explore experiences</html.span>
          {EXPERIENCES.map((experience, i) => (
            <ExperienceBanner key={i} {...experience} />
          ))}
        </html.div>
      </ThemeBoundary>
    </ScrollView>
  );
}

const styles = css.create({
  feed: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.x3,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBlockEnd: spacing.x1,
  },
});
