import { Section } from "./Section";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const painPoints = [
  "মনিটাইজেশন এখন বন্ধ বা পাওয়া যাচ্ছে না",
  "Sponsorship পাচ্ছেন না",
  "Affiliate কিভাবে শুরু করবেন বুঝছেন না",
  "Dropshipping বা নিজের প্রোডাক্ট আইডিয়া নেই",
  "হারাম বা সন্দেহজনক ইনকাম সিস্টেমে যেতে চান না",
];

export const Pain = () => {
  return (
    <Section className="section-padding border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bangla">
            আপনার ভিডিও ভাইরাল হয়, কিন্তু টাকা আসে না?
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="space-y-4"
          >
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-card/50 surface-overlay border border-border/50 hover:border-primary/30 transition-colors"
              >
                <AlertCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                <p className="text-foreground/90 bangla text-lg">{point}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 p-6 rounded-2xl bg-primary/10 border border-primary/20"
          >
            <p className="text-lg text-foreground bangla leading-relaxed">
              👉 এই কারণেই আমরা এনেছি <span className="font-bold text-primary">Halal Income Mastery for Content Creators</span> — যাতে আপনি হালাল উপায়ে নিজের ভিউ কে ইনকামে রূপান্তর করতে পারেন।
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
