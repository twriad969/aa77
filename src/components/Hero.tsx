import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const Hero = () => {
  const scrollToEnroll = () => {
    document.querySelector("#enroll")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Gradient Accent */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="section-container relative z-10 text-center pt-20 pb-12 sm:pt-24 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8">
            <Sparkles size={14} className="text-primary sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium bangla">৭ দিনের Money-Back Guarantee</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight bangla px-2"
        >
          Views আছে, কিন্তু ইনকাম নাই?{" "}
          <span className="text-gradient">
            এখন সময় এসেছে Halal ভাবে উপার্জন করার!
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto mb-6 sm:mb-8 px-2"
        >
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 mb-3 sm:mb-4 bangla leading-relaxed">
            আপনার ভিডিওতে লাখো ভিউ — কিন্তু ব্যাংক অ্যাকাউন্টে কিছুই না?
          </p>
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 bangla leading-relaxed">
            এই কোর্সে আপনি শিখবেন ৪+ Halal ইনকাম সোর্স যেগুলো দিয়ে নিজের ক্রিয়েটর ক্যারিয়ার থেকে বৈধভাবে আয় করতে পারবেন।
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
        >
          <Button
            size="lg"
            onClick={scrollToEnroll}
            className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-2xl shadow-secondary/30 transition-all hover:scale-105 hover:shadow-secondary/40 bangla"
          >
            👉 Enroll Now — প্রথম ৭ দিন Risk-Free!
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4 bangla"
        >
          (৭ দিনের Money-Back Guarantee!)
        </motion.p>
      </div>
    </section>
  );
};
