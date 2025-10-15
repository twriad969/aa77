import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "রাফি হোসেন",
    role: "Content Creator",
    content: "আমি আগে শুধু কনটেন্ট বানাতাম কিন্তু ইনকাম আসতো না। এই কোর্সের পর ৩টি ইনকাম সোর্স চালু করেছি, এবং প্রতি মাসে স্থিতিশীল আয় হচ্ছে — সব Halal!",
    rating: 5,
  },
  {
    name: "তানভীর আহমেদ",
    role: "YouTuber",
    content: "কোর্সটি অসাধারণ! Templates এবং step-by-step guidance পেয়ে খুব সহজে affiliate marketing শুরু করতে পেরেছি।",
    rating: 5,
  },
  {
    name: "সাদিয়া ইসলাম",
    role: "Digital Marketer",
    content: "Community support এবং lifetime updates সত্যিই helpful। নতুন income methods যুক্ত হওয়ার সাথে সাথে আমরা শিখতে পারি।",
    rating: 5,
  },
];

export const Testimonials = () => {
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
            শিক্ষার্থীরা কী বলছেন
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 h-full surface-overlay border-border/50 card-hover">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="text-secondary fill-secondary" size={18} />
                  ))}
                </div>
                <p className="text-foreground/90 bangla mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="pt-4 border-t border-border/50">
                  <p className="font-semibold bangla">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground bangla">{testimonial.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};
