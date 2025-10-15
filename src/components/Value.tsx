import { Section } from "./Section";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const values = [
  "১০০% Halal-Certified ইনকাম মেথড — কোনো সন্দেহজনক সিস্টেম নেই",
  "Step-by-Step ভিডিও টিউটোরিয়াল + Templates",
  "Private Community Support (Lifetime Access)",
  "নতুন ইনকাম মেথড ফ্রি আপডেট পাবেন",
  "৭ দিনের Money-Back Guarantee",
];

export const Value = () => {
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
            কেন এই কোর্স আলাদা
          </h2>
        </motion.div>

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
          className="max-w-3xl mx-auto space-y-4"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="flex items-start gap-4 p-5 rounded-2xl bg-card/50 surface-overlay border border-border/50 hover:border-primary/30 transition-all card-hover"
            >
              <div className="p-1 rounded-full bg-primary/20 flex-shrink-0">
                <Check className="text-primary" size={20} />
              </div>
              <p className="text-lg text-foreground bangla">{value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};
