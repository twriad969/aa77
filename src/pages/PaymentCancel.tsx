import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--brand-bg)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-8 surface-overlay border-border/50 text-center">
          <div className="space-y-6">
            <XCircle className="h-16 w-16 mx-auto text-yellow-500" />
            <div>
              <h1 className="text-3xl font-bold mb-2 bangla">পেমেন্ট বাতিল করা হয়েছে</h1>
              <p className="text-lg text-muted-foreground bangla">
                আপনি পেমেন্ট প্রক্রিয়া বাতিল করেছেন
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
              <p className="text-sm bangla">
                কোনো সমস্যা হলে অথবা আবার চেষ্টা করতে চাইলে নিচের বাটনে ক্লিক করুন।
              </p>
            </div>

            <div className="space-y-3">
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full">
                <Link to="/#enroll" className="bangla">আবার এনরোল করুন</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/" className="bangla">হোমে ফিরে যান</Link>
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
