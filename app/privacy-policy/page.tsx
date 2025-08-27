import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-3xl text-center font-bold mb-6">Privacy Policy</h2>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
              <p>
                Welcome to our website. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we handle your personal data when you visit our website and tell you about your privacy rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
              <p className="mb-4">
                Like most website operators, we collect non-personally-identifying information that web browsers and servers typically make available. This information includes:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Browser type and version</li>
                <li>Language preferences</li>
                <li>Referring site</li>
                <li>Date and time of each visitor request</li>
                <li>Screen resolution</li>
                <li>Operating system</li>
                <li>Device type</li>
              </ul>
              <p className="mb-4">
                Our purpose in collecting non-personally identifying information is to better understand how our visitors use the website. This helps us improve our services and enhance the gaming experience for all users.
              </p>
              <p>
                From time to time, we may release non-personally-identifying information in the aggregate, for example, by publishing reports on trends in website usage and game popularity. This aggregated information does not identify individual users and is used solely for analytical purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p>We use the collected data for various purposes:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve our service</li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
              </p>
              <p className="mt-2">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Third-Party Services</h2>
              <p>
                We may employ third-party companies and individuals due to the following reasons:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>To facilitate our service</li>
                <li>To provide the service on our behalf</li>
                <li>To perform service-related services</li>
                <li>To assist us in analyzing how our service is used</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Security</h2>
              <p>
                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Children's Privacy</h2>
              <p>
                Our service is intended for general audiences and does not knowingly collect personal information from children under 13 years of age. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. Changes are effective when they are posted on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <p className="mt-2">
                By email: support@crazy-cattle.net
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;



