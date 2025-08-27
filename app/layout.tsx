import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { siteConfig } from "@/config/site";
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} | Free Sound Buttons & Soundboards | ${siteConfig.domain}`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | Free Sound Buttons & Soundboards | ${siteConfig.domain}`,
    description: siteConfig.description,
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.images.og,
        alt: `${siteConfig.name} Screenshot`,
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SoundBoard.run - Free Sound Buttons & Soundboards',
    description: 'Download free MP3 sound effects, meme sounds, and viral audio clips',
    images: [siteConfig.images.og],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href={siteConfig.images.icon.apple} />
        <link rel="icon" type="image/png" sizes="32x32" href={siteConfig.images.icon.favicon32} />
        <link rel="icon" type="image/png" sizes="16x16" href={siteConfig.images.icon.favicon16} />
        <link rel="manifest" href={siteConfig.metadata.manifestPath} />
        {/* <link rel="mask-icon" href={siteConfig.images.icon.safari} color="#5bbad5" /> */}
        <link rel="shortcut icon" href={siteConfig.images.icon.favicon} />
        <meta name="theme-color" content={siteConfig.metadata.themeColor} />
        {/* Google Analytics - 只在有GA ID时加载 */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

