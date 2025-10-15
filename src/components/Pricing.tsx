import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Shield, Check } from "lucide-react";

const features = [
  "✅ সম্পূর্ণ কোর্স ম্যাটেরিয়াল (ভিডিও + লিখিত গাইড)",
  "✅ Halal Sponsorship & Affiliate Templates",
  "✅ লাইফটাইম আপডেট + কমিউনিটি সাপোর্ট",
];

export const Pricing = () => {
  const scrollToEnroll = () => {
    document.querySelector("#enroll")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section id="pricing" className="section-padding border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bangla">
            বিশেষ অফার প্রাইসিং
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 surface-overlay border-2 border-primary/30 relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>

              <div className="text-center mb-8">
                <Badge className="bg-secondary text-secondary-foreground mb-4 bangla">
                  🔥 Early Bird অফার
                </Badge>
                <div className="mb-4">
                  <p className="text-muted-foreground line-through text-2xl bangla">
                    Regular Price: ৳3999
                  </p>
                  <div className="flex items-baseline justify-center gap-2 mt-2">
                    <span className="text-5xl sm:text-6xl font-bold bangla">৳1999</span>
                    <span className="text-xl text-muted-foreground bangla">BDT Only!</span>
                  </div>
                </div>
                <p className="text-foreground/80 bangla">আজকের অফারে মাত্র</p>
              </div>

              <div className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="bangla text-foreground/90">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                onClick={scrollToEnroll}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg py-6 shadow-xl shadow-secondary/30 transition-all hover:scale-105 bangla"
              >
                এখনই Enroll করুন
              </Button>

              <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <div className="flex items-start gap-3 mb-3">
                  <Shield className="text-primary flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-lg mb-2 bangla">
                      🛡️ ৭ দিনের 100% Money-Back Guarantee
                    </h4>
                    <p className="text-sm text-foreground/80 bangla leading-relaxed">
                      কোর্সটি আপনার জন্য না হলে ৭ দিনের মধ্যে সম্পূর্ণ টাকা ফেরত পাবেন — কোনো প্রশ্ন ছাড়াই।
                    </p>
                  </div>
                </div>
                <p className="text-sm text-foreground/70 bangla leading-relaxed">
                  আমরা বিশ্বাস করি আপনি এই কোর্স থেকে উপকৃত হবেন। তাই আমরা আপনাকে Risk-Free ট্রাই করার সুযোগ দিচ্ছি।
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
