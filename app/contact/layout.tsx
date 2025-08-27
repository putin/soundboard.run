import { Metadata } from 'next';
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Contact Us - ${siteConfig.name}`,
  description: `Get in touch with the team at ${siteConfig.name}. We'd love to hear from you!`,
  alternates: {
    canonical: '/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
