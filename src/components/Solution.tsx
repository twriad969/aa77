import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DollarSign, Handshake, Link2, ShoppingCart, Gift } from "lucide-react";

const solutions = [
  {
    icon: DollarSign,
    title: "Business Model Design",
    description: "আপনার কন্টেন্ট থেকে ৪+ Halal ইনকাম মডেল বাছাই এবং সেটআপ করুন।",
  },
  {
    icon: Handshake,
    title: "Brand Sponsorship",
    description: "কিভাবে ব্র্যান্ডদের কাছ থেকে স্পন্সরশিপ ডিল আনতে হয়, তা স্টেপ-বাই-স্টেপ শিখুন।",
  },
  {
    icon: Link2,
    title: "Affiliate Marketing",
    description: "প্রোডাক্ট রিভিউ বা রেকমেন্ডেশনের মাধ্যমে কমিশন আয় করুন।",
  },
  {
    icon: ShoppingCart,
    title: "Dropshipping / Own Product",
    description: "নিজের ব্র্যান্ড বা পণ্য তৈরি করে বিক্রি শুরু করুন।",
  },
  {
    icon: Gift,
    title: "Bonus: Lifetime Update",
    description: "নতুন Halal ইনকাম মেথড এলে ফ্রিতে আপডেট পাবেন।",
  },
];

export const Solution = () => {
  return (
    <Section id="course" className="section-padding border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bangla">
            কোর্সে আপনি যা শিখবেন
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6 h-full card-hover surface-overlay border-border/50 hover:border-primary/30">
                  <div className="mb-4 p-3 rounded-xl bg-primary/10 w-fit">
                    <Icon className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 bangla">{solution.title}</h3>
                  <p className="text-foreground/80 bangla leading-relaxed">{solution.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
};
