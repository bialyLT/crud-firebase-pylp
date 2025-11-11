import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CRUD Firebase - Users',
  description: 'User management with Firebase and Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
