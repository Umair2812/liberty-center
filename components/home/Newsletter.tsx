"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

export function Newsletter() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmail("");
  }

  return (
    <section className="border-t border-line bg-gradient-to-b from-blush/40 to-background py-20 lg:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-line bg-background/80 p-8 shadow-[0_1px_0_rgba(44,40,37,0.06)] sm:p-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-12 lg:pr-14">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-blush/80 blur-3xl"
            aria-hidden
          />

          <div className="relative max-w-lg">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              Newsletter
            </p>
            <h2 className="font-display mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium leading-tight tracking-tight text-foreground">
              First access to drops &amp; private sales
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[15px]">
              Styling notes, restocks, and limited capsules — one thoughtful email at a time. Unsubscribe
              anytime.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-2 lg:mt-0"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              autoComplete="email"
              className="h-12 flex-1 rounded-lg border border-line bg-background px-4 text-sm text-foreground placeholder:text-muted/60 outline-none transition-shadow duration-300 focus-visible:border-gold/40 focus-visible:ring-2 focus-visible:ring-gold/25"
            />
            <button
              type="submit"
              className="h-12 shrink-0 rounded-lg bg-foreground px-8 text-sm font-semibold tracking-wide text-background transition-colors duration-300 hover:bg-gold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
