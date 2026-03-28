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
    <section className="section-home border-t border-line/50 bg-cream/40">
      <Container>
        <div className="mx-auto max-w-lg text-center sm:max-w-xl">
          <h2 className="font-display font-medium leading-tight tracking-tight text-foreground [font-size:var(--text-h3)] sm:text-3xl">
            Stay Updated
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-stretch sm:gap-3"
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
              placeholder="Email address"
              autoComplete="email"
              className="h-12 min-h-12 w-full touch-manipulation border border-line/85 bg-background/95 px-4 text-[length:var(--text-body)] text-foreground placeholder:text-muted/50 outline-none transition-[border-color,box-shadow,background-color] duration-300 focus-visible:border-gold/45 focus-visible:ring-2 focus-visible:ring-gold/20 sm:min-w-0 sm:flex-1"
            />
            <button
              type="submit"
              className="h-12 min-h-12 shrink-0 touch-manipulation bg-foreground px-8 text-sm font-medium text-background transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-gold motion-safe:hover:shadow-md motion-safe:active:translate-y-0 sm:px-10"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
