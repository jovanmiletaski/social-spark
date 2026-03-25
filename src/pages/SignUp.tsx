import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function SignUp() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (session) return <Navigate to="/dashboard" replace />;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = "Full name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) e.confirmPassword = "Passwords don't match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: fullName.trim() },
        emailRedirectTo: window.location.origin,
      },
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! Redirecting...");
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-gradient-to-br from-primary/[0.08] via-primary/[0.04] to-background items-center justify-center p-16">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.06] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/[0.04] blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-md">
          <Link to="/" className="flex items-center gap-2.5 mb-12">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm shadow-primary/20">
              <Sparkles className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="text-[17px] font-semibold text-foreground tracking-[-0.01em]">Social Spark</span>
          </Link>
          <h2 className="text-[28px] font-bold text-foreground tracking-[-0.03em] leading-[1.15] mb-4">
            Start tracking your social media growth with AI.
          </h2>
          <p className="text-[15px] text-muted-foreground leading-[1.7]">
            Join thousands of creators and teams growing smarter with unified analytics and AI-powered insights.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[380px]">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm shadow-primary/20">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-[15px] font-semibold text-foreground tracking-[-0.01em]">Social Spark</span>
          </Link>

          <h1 className="text-[26px] font-bold text-foreground tracking-[-0.03em] mb-2">Create your account</h1>
          <p className="text-[14px] text-muted-foreground mb-8">Start tracking your social media growth with AI</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[13px] font-medium text-foreground">Full name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Jane Smith"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); setErrors((p) => ({ ...p, fullName: "" })); }}
                className="h-11 rounded-xl border-border/60 bg-muted/30 text-[14px] placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-primary/20 transition-all duration-200"
              />
              {errors.fullName && <p className="text-[12px] text-destructive">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[13px] font-medium text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                className="h-11 rounded-xl border-border/60 bg-muted/30 text-[14px] placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-primary/20 transition-all duration-200"
              />
              {errors.email && <p className="text-[12px] text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[13px] font-medium text-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
                className="h-11 rounded-xl border-border/60 bg-muted/30 text-[14px] placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-primary/20 transition-all duration-200"
              />
              {errors.password && <p className="text-[12px] text-destructive">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[13px] font-medium text-foreground">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirmPassword: "" })); }}
                className="h-11 rounded-xl border-border/60 bg-muted/30 text-[14px] placeholder:text-muted-foreground/50 focus:border-primary/40 focus:ring-primary/20 transition-all duration-200"
              />
              {errors.confirmPassword && <p className="text-[12px] text-destructive">{errors.confirmPassword}</p>}
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-11 rounded-xl text-[14px] font-medium shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 mt-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4 ml-1.5" /></>}
            </Button>
          </form>

          <p className="mt-8 text-center text-[13px] text-muted-foreground">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}