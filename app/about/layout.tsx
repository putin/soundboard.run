import { Metadata } from 'next';
import { siteConfig } from "@/config/site"; // Assuming siteConfig provides the domain/name

export const metadata: Metadata = {
  title: `About Us - ${siteConfig.name}`,
  description: `Learn more about ${siteConfig.name}, our mission, and the team behind the games.`,
  alternates: {
    canonical: '/about',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
