'use client'
import "./globals.css";
import { TonConnectUIProvider } from '@tonconnect/ui-react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <TonConnectUIProvider manifestUrl={'http://localhost:3000/tonconnect-manifest.json'}>
      <html lang="en">
        <body>
          {children}
        </body>
        </html>
      </TonConnectUIProvider>

  );
}
