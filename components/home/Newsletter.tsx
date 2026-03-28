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
    <section className="bg-blush/50 py-16 lg:py-20">
      <Container className="max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
          Newsletter
        </p>
        <h2 className="font-display mt-2 text-3xl font-medium text-foreground sm:text-4xl">
          Be first to shop new drops
        </h2>
        <p className="mt-3 text-sm text-muted">
          Early access to sales, styling notes, and limited capsules — no clutter, we promise.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:gap-2"
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
            placeholder="Your email"
            className="h-12 flex-1 border border-line bg-background px-4 text-sm text-foreground placeholder:text-muted/70 outline-none transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-gold/40"
          />
          <button
            type="submit"
            className="h-12 shrink-0 bg-foreground px-8 text-sm font-medium text-background transition-colors duration-300 hover:bg-gold"
          >
            Join
          </button>
        </form>
      </Container>
    </section>
  );
}
