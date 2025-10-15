import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { verifyPayment, VerifyPaymentResponse } from "@/services/payment";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [paymentData, setPaymentData] = useState<VerifyPaymentResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const invoiceId = searchParams.get('invoice_id');
    
    if (!invoiceId) {
      setStatus('error');
      setErrorMessage('Invoice ID not found in URL');
      return;
    }

    const verifyPaymentStatus = async () => {
      try {
        const result = await verifyPayment(invoiceId);
        
        if (result.status === 'COMPLETED') {
          // Update customer payment status in database
          const { supabase } = await import("@/integrations/supabase/client");
          
          await supabase
            .from('customers')
            .update({
              payment_status: 'completed',
              invoice_id: result.invoice_id,
              transaction_id: result.transaction_id,
              payment_method: result.payment_method,
              purchased_at: new Date().toISOString()
            })
            .eq('email', result.email);
          
          setPaymentData(result);
          setStatus('success');
        } else if (result.status === 'PENDING') {
          setStatus('error');
          setErrorMessage('Payment is still pending. Please wait or contact support.');
        } else {
          setStatus('error');
          setErrorMessage('Payment verification failed. Please contact support.');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setErrorMessage('Failed to verify payment. Please contact support with your transaction details.');
      }
    };

    verifyPaymentStatus();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--brand-bg)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-8 surface-overlay border-border/50 text-center">
          {status === 'loading' && (
            <div className="space-y-4">
              <Loader2 className="h-16 w-16 animate-spin mx-auto text-primary" />
              <h1 className="text-2xl font-bold bangla">পেমেন্ট যাচাই করা হচ্ছে...</h1>
              <p className="text-muted-foreground bangla">অনুগ্রহ করে অপেক্ষা করুন</p>
            </div>
          )}

          {status === 'success' && paymentData && (
            <div className="space-y-6">
              <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
              <div>
                <h1 className="text-3xl font-bold mb-2 bangla">পেমেন্ট সফল হয়েছে! 🎉</h1>
                <p className="text-lg text-muted-foreground bangla">
                  আপনার এনরোলমেন্ট সম্পন্ন হয়েছে
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-muted-foreground bangla">নাম:</span>
                  <span className="font-semibold">{paymentData.full_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground bangla">ইমেইল:</span>
                  <span className="font-semibold">{paymentData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground bangla">পরিমাণ:</span>
                  <span className="font-semibold">৳{paymentData.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground bangla">পেমেন্ট মেথড:</span>
                  <span className="font-semibold capitalize">{paymentData.payment_method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground bangla">ট্রানজেকশন ID:</span>
                  <span className="font-semibold">{paymentData.transaction_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground bangla">Invoice ID:</span>
                  <span className="font-semibold text-xs">{paymentData.invoice_id}</span>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-sm bangla">
                  📧 আমরা শীঘ্রই আপনার ইমেইলে কোর্স অ্যাক্সেস লিংক পাঠাবো।
                  যেকোনো সমস্যার জন্য আমাদের সাথে যোগাযোগ করুন।
                </p>
              </div>

              <div className="flex gap-4">
                <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Link to="/course" className="bangla">কোর্সে যান</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/" className="bangla">হোমে ফিরে যান</Link>
                </Button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-6">
              <XCircle className="h-16 w-16 mx-auto text-destructive" />
              <div>
                <h1 className="text-3xl font-bold mb-2 bangla">পেমেন্ট যাচাই করতে সমস্যা</h1>
                <p className="text-muted-foreground bangla">{errorMessage}</p>
              </div>

              <div className="space-y-2">
                <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full">
                  <Link to="/" className="bangla">হোমে ফিরে যান</Link>
                </Button>
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
