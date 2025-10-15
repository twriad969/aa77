import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ⚠️ HARDCODED CREDENTIALS - INSECURE FOR PRODUCTION
    if (username === "ronok" && password === "tazul") {
      sessionStorage.setItem("admin_authenticated", "true");
      toast.success("Login successful!");
      navigate("/admin");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--brand-bg)' }}>
      <Card className="w-full max-w-md p-8 surface-overlay">
        <div className="text-center mb-6">
          <Lock className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-2">
            ⚠️ This uses hardcoded credentials for demo only
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-2"
            />
          </div>

          <Button type="submit" className="w-full bg-primary text-primary-foreground">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
