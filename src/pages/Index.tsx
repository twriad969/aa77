import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Pain } from "@/components/Pain";
import { Solution } from "@/components/Solution";
import { Value } from "@/components/Value";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { CheckoutForm } from "@/components/CheckoutForm";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
      <Hero />
      <Pain />
      <Solution />
      <Value />
      <Testimonials />
      <Pricing />
      <CheckoutForm />
      <FAQ />
      <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
