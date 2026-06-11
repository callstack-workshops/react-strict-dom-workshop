import './strict.css';
import './global.css';
import { surfaceColor } from '@ui/tokens/tokens.css';

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
      <body style={{ backgroundColor: surfaceColor }}>{children}</body>
    </html>
  );
}
