import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Building2, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { toast } from "sonner";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

function PasswordStrengthBar({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters", ok: password.length >= 8 },
    { label: "Uppercase", ok: /[A-Z]/.test(password) },
    { label: "Number", ok: /[0-9]/.test(password) },
    { label: "Symbol", ok: /[^a-zA-Z0-9]/.test(password) },
  ];
  const passed = checks.filter((c) => c.ok).length;
  const colors = [
    "bg-destructive",
    "bg-warning",
    "bg-warning",
    "bg-success",
    "bg-success",
  ];

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < passed ? colors[passed] : "bg-muted"}`}
          />
        ))}
      </div>
      <div className="flex gap-3 flex-wrap">
        {checks.map((c) => (
          <span
            key={c.label}
            className={`text-xs flex items-center gap-1 ${c.ok ? "text-success" : "text-muted-foreground"}`}
          >
            {c.ok && <Check className="w-3 h-3" />}
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const password = watch("password", "");

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      await api.register(data.name, data.email, data.password);
      setSuccess(true);
      toast.success("Account created! Redirecting to login…");
      setTimeout(() => navigate("/login"), 2500);
    } catch (err: any) {
      toast.error(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left visual panel */}
      <div
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center p-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, hsl(224 76% 20%) 0%, hsl(224 76% 35%) 50%, hsl(224 60% 45%) 100%)",
        }}
      >
        <div
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-10"
          style={{ background: "hsl(224 76% 60%)" }}
        />
        <div
          className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full opacity-10"
          style={{ background: "hsl(224 76% 70%)" }}
        />

        <div className="relative z-10 text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Join PropManager
          </h1>
          <p className="text-blue-200 text-lg max-w-sm mx-auto">
            Start managing your real estate portfolio today. It's free to get
            started.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 text-left">
            {[
              "✓ Unlimited property listings",
              "✓ Real-time approval tracking",
              "✓ Role-based team access",
              "✓ Advanced reporting tools",
              "✓ Secure document storage",
              "✓ 24/7 support access",
            ].map((f) => (
              <div key={f} className="text-sm text-blue-100">
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-background overflow-y-auto">
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <Building2 className="w-7 h-7 text-primary" />
          <span className="text-xl font-bold text-foreground">PropManager</span>
        </div>

        <div className="w-full max-w-md">
          {success ? (
            <div className="text-center py-12 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Account Created!
              </h2>
              <p className="text-muted-foreground">
                Redirecting you to the login page…
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Create an account
                </h2>
                <p className="text-muted-foreground">
                  Fill in the details below to get started
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className={
                      errors.name
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={
                      errors.email
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`pr-10 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {password && <PasswordStrengthBar password={password} />}
                  {errors.password && (
                    <p className="text-xs text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      className={`pr-10 ${errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      {...register("confirmPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showConfirm ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-destructive">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Creating account…
                    </>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
