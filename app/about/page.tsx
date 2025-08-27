import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-4xl text-center font-bold mb-8">About {siteConfig.name}</h2>

          <div className="space-y-6 text-lg">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p>
                At {siteConfig.name}, our mission is to provide free, high-quality sound effects, meme audio, and viral clips to everyone. We believe in the power of audio to enhance content, create memorable moments, and bring joy to people's lives. We are passionate about building a comprehensive audio library that serves content creators, gamers, and audio enthusiasts worldwide.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
              <p>
                We are a dedicated team of audio enthusiasts, content creators, and developers who love curating and sharing the best audio content from around the internet. Our journey started with a simple idea: to create a platform where anyone could easily find, play, and download high-quality sound effects and meme audio without any barriers or costs.
              </p>
              <p className="mt-4">
                {siteConfig.name} is the culmination of our passion for audio and our commitment to making great sounds accessible to everyone.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Our Audio Library</h2>
              <p>
                From trending viral sounds to classic meme audio, from practical sound effects to hilarious reaction clips, we strive to deliver quality and variety. Our carefully organized categories include Trending, Memes, Sound Effects, and Reactions, each curated to help you find the perfect audio for any situation. We are constantly updating our library with new trending sounds and viral content.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">Our Commitment</h2>
              <p>
                We are committed to providing a safe, enjoyable, and completely free audio platform for our users. All our sounds are free to play and download directly in your browser, with no hidden costs, registration requirements, or intrusive ads. We value your feedback and encourage you to reach out to us with any suggestions or comments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
              <p>
                Have questions, feedback, or just want to say hello? We'd love to hear from you!
              </p>
              <p className="mt-2">
                You can reach us by email at: <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">{siteConfig.email}</a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
