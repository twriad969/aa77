import { Section } from "./Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { createPaymentCharge, redirectToPayment } from "@/services/payment";

const formSchema = z.object({
  fullName: z.string().trim().min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে").max(100, "নাম সর্বোচ্চ ১০০ অক্ষরের হতে হবে"),
  email: z.string().trim().email("সঠিক ইমেইল প্রদান করুন").max(255),
  phone: z.string().trim().regex(/^01[3-9]\d{8}$/, "সঠিক বাংলাদেশী ফোন নম্বর প্রদান করুন (01XXXXXXXXX)"),
});

type FormData = z.infer<typeof formSchema>;

export const CheckoutForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Create payment charge via UddoktaPay
      const paymentResponse = await createPaymentCharge({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        amount: "1999",
        metadata: {
          course: "Halal Income Mastery for Content Creators",
          timestamp: new Date().toISOString(),
        },
      });

      if (paymentResponse.status && paymentResponse.payment_url) {
        // Redirect to UddoktaPay payment page
        redirectToPayment(paymentResponse.payment_url);
      } else {
        throw new Error(paymentResponse.message || "Payment creation failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("পেমেন্ট এ সমস্যা হয়েছে", {
        description: "দয়া করে আবার চেষ্টা করুন অথবা সাপোর্টে যোগাযোগ করুন।",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="enroll" className="section-padding border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bangla">
            এখনই Enroll করুন
          </h2>
          <p className="text-lg text-muted-foreground bangla">
            আপনার তথ্য প্রদান করুন এবং Halal Income Journey শুরু করুন
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="p-8 surface-overlay border-border/50">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="fullName" className="bangla">
                  পূর্ণ নাম *
                </Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  placeholder="আপনার পূর্ণ নাম লিখুন"
                  className="mt-2 bangla"
                  aria-invalid={errors.fullName ? "true" : "false"}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive mt-1 bangla">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="bangla">
                  ইমেইল অ্যাড্রেস *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="example@email.com"
                  className="mt-2"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1 bangla">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="bangla">
                  ফোন নম্বর *
                </Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="01XXXXXXXXX"
                  className="mt-2"
                  aria-invalid={errors.phone ? "true" : "false"}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive mt-1 bangla">{errors.phone.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg py-6 shadow-xl shadow-secondary/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bangla"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    প্রসেসিং...
                  </>
                ) : (
                  "Proceed to Payment — ৳১৯৯৯"
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
};
