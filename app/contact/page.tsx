import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import Link from "next/link"; // Import Link for internal navigation

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-4xl text-center font-bold mb-10">Contact Us</h2> {/* Increased mb slightly */}

          {/* Retaining simpler structure, applying richer text content */}
          <div className="space-y-8 text-lg"> {/* Increased space-y for more separation between sections */}
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Need Assistance? We're Here to Help!</h2>
              <p className="leading-relaxed">
                If you have any inquiries, comments, or proposals on how we can improve our audio platform, please don't hesitate to contact us. 
                You can drop us a line at <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline font-medium">{siteConfig.email}</a>, and we'll make every effort to reply promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">About {siteConfig.name}</h2>
              <p className="leading-relaxed">
                {siteConfig.name} is dedicated to providing free, high-quality sound effects, meme audio, and viral clips to everyone. Our goal is to create an accessible and comprehensive audio library that serves content creators, gamers, and audio enthusiasts. We are passionate about building a community around our platform and continuously improving based on user experiences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Feedback and Suggestions</h2>
              <p className="leading-relaxed">
                We highly value your feedback! If you have suggestions for improving our website, ideas for new audio categories, or any other thoughts you'd like to share, please let us know. Your input helps us make {siteConfig.name} better for everyone.
              </p>
            </section>
            
            <section className="mt-6 bg-muted/50 p-6 rounded-lg border border-border"> {/* Styled thank you block */}
              <p className="italic text-foreground/80 leading-relaxed">
                Thank you for visiting {siteConfig.name}. We hope you enjoy our vast collection of free audio content!
              </p>
            </section>

            <section className="mt-8 border-t border-border pt-8">
              <p className="leading-relaxed">
                For more information about our site, please visit our <Link href="/about" className="text-primary hover:underline font-medium">About Us</Link> page. 
                You can also review our <Link href="/privacy-policy" className="text-primary hover:underline font-medium">Privacy Policy</Link> and <Link href="/terms-of-service" className="text-primary hover:underline font-medium">Terms of Service</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
