import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

export default function AccountPage() {
  return (
    <main className="min-h-[calc(100vh-4.25rem)] flex items-center justify-center bg-[#f4f4f4] py-16 px-4">
      <div className="w-full max-w-[460px] flex flex-col items-center">
        <h1 className="font-display text-2xl md:text-[28px] tracking-[0.25em] text-foreground mb-6 uppercase">
          Login
        </h1>
        
        <p className="text-[14px] md:text-[15px] text-foreground/80 mb-10 text-center">
          Enter your email and password to login:
        </p>

        <form className="w-full space-y-4" action="#">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="sr-only">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              suppressHydrationWarning
              className="w-full bg-transparent border border-foreground/30 px-4 py-3.5 text-[14px] text-foreground placeholder:text-muted/60 focus:outline-none focus:border-black transition-colors"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              suppressHydrationWarning
              className="w-full bg-transparent border border-foreground/30 px-4 py-3.5 text-[14px] text-foreground placeholder:text-muted/60 focus:outline-none focus:border-black transition-colors pr-40"
              required
            />
            <Link 
              href="/account/recover" 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-muted/70 hover:text-foreground transition-colors z-10"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="relative overflow-hidden w-full cursor-pointer bg-transparent border border-foreground text-foreground py-3.5 text-[12px] font-semibold tracking-[0.1em] uppercase transition-colors duration-300 hover:text-background z-0 before:absolute before:inset-0 before:bg-foreground before:origin-right before:scale-x-0 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.85,0,0.15,1)] hover:before:origin-left hover:before:scale-x-100 before:-z-10"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-8">
          <p className="text-[14px] text-muted/80">
            Don&apos;t have an account?{" "}
            <Link href="/account/register" className="hover:text-foreground transition-colors ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
