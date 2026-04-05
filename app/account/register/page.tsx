import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function RegisterPage() {
  return (
    <main className="min-h-[calc(100vh-4.25rem)] flex items-center justify-center bg-[#f4f4f4] py-16 px-4">
      <div className="w-full max-w-[460px] flex flex-col items-center">
        <h1 className="font-display text-2xl md:text-[28px] tracking-[0.25em] text-foreground mb-6 uppercase">
          Sign Up
        </h1>
        
        <p className="text-[14px] md:text-[15px] text-foreground/80 mb-10 text-center">
          Please fill in the information below:
        </p>

        <form className="w-full space-y-4" action="#">
          {/* First Name Field */}
          <div>
            <label htmlFor="firstName" className="sr-only">First name</label>
            <input
              type="text"
              id="firstName"
              placeholder="First name"
              suppressHydrationWarning
              className="w-full bg-transparent border border-foreground/30 px-4 py-3.5 text-[14px] text-foreground placeholder:text-muted/60 focus:outline-none focus:border-black transition-colors"
              required
            />
          </div>

          {/* Last Name Field */}
          <div>
            <label htmlFor="lastName" className="sr-only">Last name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Last name"
              suppressHydrationWarning
              className="w-full bg-transparent border border-foreground/30 px-4 py-3.5 text-[14px] text-foreground placeholder:text-muted/60 focus:outline-none focus:border-black transition-colors"
              required
            />
          </div>

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
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              suppressHydrationWarning
              className="w-full bg-transparent border border-foreground/30 px-4 py-3.5 text-[14px] text-foreground placeholder:text-muted/60 focus:outline-none focus:border-black transition-colors"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="relative overflow-hidden w-full cursor-pointer bg-transparent border border-foreground text-foreground py-3.5 text-[12px] font-semibold tracking-[0.1em] uppercase transition-colors duration-300 hover:text-background z-0 before:absolute before:inset-0 before:bg-foreground before:origin-right before:scale-x-0 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.85,0,0.15,1)] hover:before:origin-left hover:before:scale-x-100 before:-z-10"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="mt-8">
          <p className="text-[14px] text-muted/80">
            Already have an account?{" "}
            <Link href="/account" className="hover:text-foreground transition-colors ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
