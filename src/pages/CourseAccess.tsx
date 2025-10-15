import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CourseContent } from "@/components/course/CourseContent";

export default function CourseAccess() {
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerData, setCustomerData] = useState<any>(null);

  useEffect(() => {
    // Check if already authenticated in session
    const authEmail = sessionStorage.getItem("course_access_email");
    if (authEmail) {
      verifyAccess(authEmail);
    }
  }, []);

  const verifyAccess = async (emailToVerify: string) => {
    setIsVerifying(true);
    
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('email', emailToVerify)
        .eq('payment_status', 'completed')
        .single();

      if (error || !data) {
        toast.error("অ্যাক্সেস পাওয়া যায়নি", {
          description: "এই ইমেইলে কোনো পেমেন্ট রেকর্ড পাওয়া যায়নি।",
        });
        setIsAuthenticated(false);
      } else {
        setCustomerData(data);
        setIsAuthenticated(true);
        sessionStorage.setItem("course_access_email", emailToVerify);
        toast.success("স্বাগতম!", {
          description: "কোর্সে অ্যাক্সেস পেয়েছেন।",
        });
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("যাচাই করতে সমস্যা হয়েছে");
      setIsAuthenticated(false);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("ইমেইল প্রদান করুন");
      return;
    }
    verifyAccess(email);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("course_access_email");
    setIsAuthenticated(false);
    setCustomerData(null);
    setEmail("");
    toast.success("লগ আউট সফল হয়েছে");
  };

  if (isAuthenticated && customerData) {
    return <CourseContent customerData={customerData} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--brand-bg)' }}>
      <Card className="w-full max-w-md p-8 surface-overlay">
        <div className="text-center mb-6">
          <GraduationCap className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-bold mb-2 bangla">কোর্স অ্যাক্সেস</h1>
          <p className="text-muted-foreground bangla">
            আপনার পার্চেজ করা ইমেইল দিয়ে লগইন করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="bangla">ইমেইল অ্যাড্রেস</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="mt-2"
              disabled={isVerifying}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground"
            disabled={isVerifying}
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                যাচাই করা হচ্ছে...
              </>
            ) : (
              "অ্যাক্সেস করুন"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
