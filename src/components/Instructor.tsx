import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Quote, Users } from "lucide-react";

export const Instructor = () => {
  return (
    <Section id="instructor" className="section-padding border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bangla">
            কেন আমাদের বিশ্বাস করবেন
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="p-8 surface-overlay border-border/50">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-accent mb-6 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary-foreground">BM</span>
              </div>

              <h3 className="text-2xl font-bold mb-2 bangla">
                [আপনার নাম]
              </h3>
              <p className="text-muted-foreground mb-6 bangla">
                Founder, Bastob Marketing
              </p>

              <div className="mb-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 bangla">
                  <Users size={14} className="mr-1" />
                  ১০,০০০+ উদ্যোক্তা ট্রেইনড
                </Badge>
              </div>

              <div className="relative p-6 rounded-2xl bg-muted/30 border border-border/50">
                <Quote className="text-primary/20 absolute top-4 left-4" size={32} />
                <p className="text-lg font-medium bangla relative z-10 leading-relaxed pt-4">
                  বিশ্বাস করেন — "Halal কাজেও বড় সাফল্য সম্ভব।"
                </p>
              </div>

              <p className="mt-6 text-foreground/80 bangla leading-relaxed">
                আমরা শুধু কোর্স বিক্রি করি না — আমরা আপনার হালাল ব্যবসায়িক সাফল্যের পার্টনার।
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
};
