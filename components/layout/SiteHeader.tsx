"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/new-arrivals", label: "New" },
  { href: "/sale", label: "Sale" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between sm:h-16 lg:h-[4.25rem]">
        <div className="flex items-center gap-6 lg:gap-10">
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-expanded={open}
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-px w-5 bg-foreground transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-5 bg-foreground transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-5 bg-foreground transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>

          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-[0.02em] text-foreground transition-colors duration-300 hover:text-gold sm:text-2xl"
          >
            Liberty Center
          </Link>

          <nav
            className="hidden items-center gap-8 text-sm font-medium text-foreground/80 lg:flex"
            aria-label="Main"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-1 transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-colors duration-300 hover:bg-cream hover:text-foreground"
            aria-label="Search"
          >
            <SearchIcon />
          </Link>
          <Link
            href="/account"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-colors duration-300 hover:bg-cream hover:text-foreground sm:flex"
            aria-label="Account"
          >
            <UserIcon />
          </Link>
          <Link
            href="/cart"
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-colors duration-300 hover:bg-cream hover:text-foreground"
            aria-label="Cart"
          >
            <BagIcon />
          </Link>
        </div>
      </Container>

      <div
        className={`border-t border-line bg-background lg:hidden ${open ? "max-h-[320px] border-b opacity-100" : "max-h-0 overflow-hidden border-b-0 opacity-0"} transition-all duration-300 ease-out`}
      >
        <nav className="flex flex-col px-4 py-4 text-sm font-medium" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-line py-3.5 text-foreground/90 transition-colors hover:text-gold"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/account"
            className="py-3.5 text-foreground/90 transition-colors hover:text-gold"
            onClick={() => setOpen(false)}
          >
            Account
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 7h15l-1 12H7L6 7zm0 0L5 3H2M9 11v6M15 11v6M9 7V5a3 3 0 016 0v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
