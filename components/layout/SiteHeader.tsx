"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/unstitched-clothes", label: "Unstitched clothes" },
  { href: "/accessories", label: "Accessories" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/sale", label: "Sale" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const drawerId = useId();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
        <Container className="flex h-14 items-center justify-between gap-3 sm:h-16 lg:h-[4.25rem]">
          <div className="flex min-w-0 flex-1 items-center gap-3 lg:gap-8">
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full text-foreground transition-colors hover:bg-cream lg:hidden"
              aria-expanded={open}
              aria-controls={drawerId}
              aria-label={open ? "Close menu" : "Open menu"}
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
              className="font-display truncate text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 hover:text-gold sm:text-xl lg:text-2xl"
              onClick={close}
            >
              Liberty Center
            </Link>

            <nav
              className="ml-auto hidden max-w-none items-center gap-2.5 text-[11px] font-medium text-foreground/85 min-[1100px]:gap-4 min-[1100px]:text-[13px] lg:flex xl:gap-6 xl:text-sm"
              aria-label="Main"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative whitespace-nowrap py-1 transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <Link
              href="/search"
              className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-colors duration-300 hover:bg-cream hover:text-foreground"
              aria-label="Search"
            >
              <SearchIcon />
            </Link>
            <Link
              href="/account"
              className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-colors duration-300 hover:bg-cream hover:text-foreground"
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
      </header>

      {/* Mobile drawer + overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-foreground/40 backdrop-blur-[2px] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={close}
        />

        <div
          id={drawerId}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`absolute inset-y-0 left-0 flex w-[min(100%,20rem)] max-w-[85vw] flex-col border-r border-line bg-background shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-line px-4 sm:h-16">
            <span className="font-display text-lg font-semibold text-foreground">
              Menu
            </span>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-cream"
              aria-label="Close menu"
              onClick={close}
            >
              <CloseIcon />
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col overflow-y-auto px-2 py-4 text-[15px] font-medium"
            aria-label="Mobile main"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3.5 text-foreground/90 transition-colors hover:bg-cream hover:text-foreground"
                onClick={close}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
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

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
