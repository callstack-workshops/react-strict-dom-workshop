import './strict.css';
import './global.css';

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
      <body>{children}</body>
    </html>
  );
}
