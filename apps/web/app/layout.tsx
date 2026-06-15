import '@fontsource/hanken-grotesk/400.css';
import '@fontsource/hanken-grotesk/500.css';
import '@fontsource/hanken-grotesk/600.css';
import '@fontsource/hanken-grotesk/700.css';
import './strict.css';
import './global.css';
import { surfaceColor, fontFamily } from '@ui/tokens/tokens.css';

export const metadata = {
  title: 'RSD Workshop',
  description: 'React Strict DOM on Next.js 16',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: surfaceColor,
          fontFamily: `${fontFamily}, sans-serif`,
        }}
      >
        {children}
      </body>
    </html>
  );
}