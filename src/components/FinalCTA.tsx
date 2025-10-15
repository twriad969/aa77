import { Section } from "./Section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const FinalCTA = () => {
  const scrollToEnroll = () => {
    document.querySelector("#enroll")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section className="section-padding border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="p-12 rounded-3xl surface-overlay border border-primary/30 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>

            <Sparkles className="text-primary mx-auto mb-6" size={48} />

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bangla">
              আজই শুরু করুন আপনার Halal Income Journey!
            </h2>

            <p className="text-lg sm:text-xl text-foreground/80 mb-4 bangla leading-relaxed">
              Views আছে, কিন্তু ইনকাম নাই? এখনই সময় এসেছে পরিবর্তনের।
            </p>

            <p className="text-lg sm:text-xl text-foreground/80 mb-8 bangla leading-relaxed">
              Halal Income Mastery for Content Creators এ Enroll করুন এবং শিখুন কীভাবে আপনার কনটেন্ট থেকে বৈধভাবে আয় করা যায়।
            </p>

            <Button
              size="lg"
              onClick={scrollToEnroll}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg px-10 py-7 shadow-2xl shadow-secondary/30 transition-all hover:scale-105 bangla mb-4"
            >
              Enroll Now — ৭ দিন Risk-Free!
            </Button>

            <p className="text-sm text-primary font-semibold bangla flex items-center justify-center gap-2">
              <span>🔥</span>
              সীমিত সময়ের জন্য Early Bird অফার চলছে!
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
