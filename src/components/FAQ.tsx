import { Section } from "./Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "আমি যদি নতুন হই, তাহলেও কি এই কোর্স আমার জন্য?",
    answer: "হ্যাঁ! এই কোর্সটি বিশেষভাবে নতুনদের জন্য ডিজাইন করা হয়েছে। Step-by-step tutorials এবং templates দিয়ে আপনি সহজেই শুরু করতে পারবেন।",
  },
  {
    question: "Money-Back Guarantee কীভাবে কাজ করে?",
    answer: "কোর্স কিনার পর ৭ দিনের মধ্যে যদি আপনার মনে হয় এটি আপনার জন্য না, তাহলে সম্পূর্ণ টাকা ফেরত পাবেন — কোনো প্রশ্ন ছাড়াই। শুধু আমাদের ইমেইল করুন।",
  },
  {
    question: "কোর্সে Access কতদিনের জন্য?",
    answer: "আপনি Lifetime Access পাবেন। যত দিন খুশি কোর্সটি দেখতে পারবেন, এবং নতুন কন্টেন্ট যুক্ত হলে সেটাও ফ্রি পাবেন।",
  },
];

export const FAQ = () => {
  return (
    <Section id="faq" className="section-padding border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bangla">
            প্রায়শই জিজ্ঞাসিত প্রশ্ন
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="multiple" className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-2xl px-6 surface-overlay hover:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 bangla text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 bangla pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </Section>
  );
};
