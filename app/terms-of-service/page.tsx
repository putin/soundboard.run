import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: "Terms of Service for SoundBoard.run - Read our terms and conditions for using our sound effects and meme soundboard service.",
};

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">Terms of Service</h1>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
              <strong>Last updated:</strong> September 2, 2025
            </p>

            <p className="mb-8">
              Welcome to soundboard.run ("Website", "Service", "we", "our", or "us"). By accessing or using this Website, you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use our Website.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">1. Use of Service</h2>
            <p className="mb-4">
              Our Website provides free access to soundboards, including meme soundboards and other types in the future.
            </p>
            <p className="mb-4">
              The Service is provided for personal, non-commercial use only, unless you have obtained prior written consent from us.
            </p>
            <p className="mb-4">You agree not to misuse the Service, including but not limited to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Attempting to hack, disrupt, or overload our servers.</li>
              <li>Using automated tools (bots, crawlers, scrapers) to excessively download content.</li>
              <li>Uploading or sharing harmful, illegal, or infringing content.</li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">2. Intellectual Property</h2>
            <p className="mb-4">
              All soundboards, audio files, website design, and related content are protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mb-4">
              Some audio content may be user-contributed or sourced from public domains. We do not claim ownership over third-party content, but we provide access for fair use, parody, or educational purposes.
            </p>
            <p className="mb-6">
              You may download and use sound files for personal entertainment. Redistribution, resale, or commercial use without permission is prohibited.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">3. User Responsibilities</h2>
            <p className="mb-4">
              You are responsible for ensuring that your use of our Website complies with your local laws and regulations.
            </p>
            <p className="mb-4">
              You agree not to use the Website for any unlawful, offensive, or harmful purposes.
            </p>
            <p className="mb-6">
              If you submit or suggest content, you grant us a non-exclusive, royalty-free license to use, display, and distribute that content on the Website.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">4. Disclaimer of Warranties</h2>
            <p className="mb-4">
              The Service is provided "as is" and "as available", without warranties of any kind.
            </p>
            <p className="mb-4">
              We do not guarantee that the Website will always be available, error-free, secure, or free of harmful components.
            </p>
            <p className="mb-6">
              Soundboard.run is not responsible for how you use the downloaded sound files.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">5. Limitation of Liability</h2>
            <p className="mb-4">
              To the fullest extent permitted by law, we are not liable for any damages (direct, indirect, incidental, consequential, or special) arising from your use of the Service.
            </p>
            <p className="mb-6">
              You use the Website at your own risk.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">6. Third-Party Links</h2>
            <p className="mb-6">
              Our Website may contain links to third-party websites or resources. We are not responsible for the availability, content, or practices of those external sites.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">7. Termination</h2>
            <p className="mb-6">
              We reserve the right to suspend or terminate your access to the Service at any time, with or without notice, if you violate these Terms.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">8. Changes to Terms</h2>
            <p className="mb-4">
              We may update these Terms from time to time. Changes will be effective when posted on this page.
            </p>
            <p className="mb-6">
              Continued use of the Website after changes means you accept the updated Terms.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">9. Governing Law</h2>
            <p className="mb-6">
              These Terms shall be governed by and construed in accordance with the laws of Singapore, without regard to its conflict of law principles.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">10. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms, you may contact us at:
            </p>
            <p className="mb-8">
              📧 <a href="mailto:soundboardrun@gmail.com" className="text-blue-600 hover:underline">soundboardrun@gmail.com</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;