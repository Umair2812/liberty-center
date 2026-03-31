"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { Container } from "@/components/ui/Container";

type MegaMenuSection = {
  title: string;
  links: { label: string; href: string }[];
};

type MegaMenu = {
  sections: MegaMenuSection[];
  featured?: {
    image: string;
    title: string;
    href: string;
  };
};

type NavLink = {
  href: string;
  label: string;
  megaMenu?: MegaMenu;
};

const navLinks: NavLink[] = [
  { 
    href: "/stitched", 
    label: "Stitched",
    megaMenu: {
      sections: [
        {
          title: "Women",
          links: [
            { label: "Ready to Wear", href: "/stitched/women/ready-to-wear" },
            { label: "Bottoms", href: "/stitched/women/bottoms" },
            { label: "Sleepwear", href: "/stitched/women/sleepwear" },
          ]
        },
        {
          title: "Men",
          links: [
            { label: "Kurta/Shalwar Kameez", href: "/stitched/men/kurta-shalwar-kameez" },
            { label: "Waistcoats", href: "/stitched/men/waistcoats" },
            { label: "Bottoms", href: "/stitched/men/bottoms" },
          ]
        },
        {
          title: "Kids",
          links: [
            { label: "Girls", href: "/stitched/kids/girls" },
            { label: "Boys", href: "/stitched/kids/boys" },
          ]
        }
      ],
      featured: {
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
        title: "Latest Stitched",
        href: "/stitched/latest",
      }
    }
  },
  { 
    href: "/unstitched", 
    label: "Un-Stitched",
    megaMenu: {
      sections: [
        {
          title: "Fabric",
          links: [
            { label: "Lawn", href: "/unstitched/lawn" },
            { label: "Silk", href: "/unstitched/silk" },
            { label: "Chiffon", href: "/unstitched/chiffon" },
            { label: "Cotton", href: "/unstitched/cotton" },
            { label: "Cambric", href: "/unstitched/cambric" },
          ]
        },
        {
          title: "Pieces",
          links: [
            { label: "1 Piece", href: "/unstitched/1-piece" },
            { label: "2 Piece", href: "/unstitched/2-piece" },
            { label: "3 Piece", href: "/unstitched/3-piece" },
          ]
        }
      ],
      featured: {
        image: "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?q=80&w=800&auto=format&fit=crop",
        title: "Premium Unstitched",
        href: "/unstitched/premium",
      }
    }
  },
  { 
    href: "/premium", 
    label: "Premium",
    megaMenu: {
      sections: [
        {
          title: "Collections",
          links: [
            { label: "Bridal", href: "/premium/bridal" },
            { label: "Formals", href: "/premium/formals" },
            { label: "Luxury Pret", href: "/premium/luxury-pret" },
          ]
        },
        {
          title: "Categories",
          links: [
            { label: "Women's Premium", href: "/premium/women" },
            { label: "Men's Premium", href: "/premium/men" },
          ]
        }
      ],
      featured: {
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
        title: "The Bloom Affair",
        href: "/premium",
      }
    }
  },
  {
    href: "/accessories",
    label: "Accessories",
    megaMenu: {
      sections: [
        {
          title: "Bags",
          links: [
            { label: "Clutches", href: "/accessories/clutches" },
            { label: "Hand Bags", href: "/accessories/hand-bags" },
            { label: "Backpacks", href: "/accessories/backpacks" },
            { label: "Phone Bags", href: "/accessories/phone-bags" },
            { label: "Tote Bags", href: "/accessories/tote-bags" },
            { label: "Wallets", href: "/accessories/wallets" },
            { label: "Vanity Bags", href: "/accessories/vanity-bags" },
          ],
        },
        {
          title: "Footwear",
          links: [
            { label: "Slides", href: "/accessories/slides" },
            { label: "Heels", href: "/accessories/heels" },
            { label: "Block Heels", href: "/accessories/block-heels" },
            { label: "Canvas", href: "/accessories/canvas" },
            { label: "Khussa", href: "/accessories/khussa" },
            { label: "Mules", href: "/accessories/mules" },
            { label: "Loafers", href: "/accessories/loafers" },
          ],
        },
        {
          title: "Wraps",
          links: [{ label: "Scarf", href: "/accessories/scarf" }],
        },
        {
          title: "Camisole",
          links: [{ label: "All Camisoles", href: "/accessories/camisole" }],
        },
      ],
      featured: {
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
        title: "Accessories",
        href: "/accessories",
      },
    },
  },
  { 
    href: "/sale", 
    label: "Sale",
    megaMenu: {
      sections: [
        {
          title: "Discounts",
          links: [
            { label: "Up to 50% Off", href: "/sale/up-to-50-off" },
            { label: "Up to 70% Off", href: "/sale/up-to-70-off" },
            { label: "Clearance", href: "/sale/clearance" },
          ]
        },
        {
          title: "Categories",
          links: [
            { label: "Women's Sale", href: "/sale/women" },
            { label: "Men's Sale", href: "/sale/men" },
            { label: "Accessories Sale", href: "/sale/accessories" },
          ]
        }
      ],
      featured: {
        image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=800&auto=format&fit=crop",
        title: "End of Season Sale",
        href: "/sale",
      }
    }
  }
];

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
      <header className="group/header sticky top-0 z-50 border-b border-line bg-background/90 shadow-[0_1px_0_rgba(44,40,37,0.04)] backdrop-blur-md transition-all duration-300 hover:bg-background supports-[backdrop-filter]:bg-background/80 hover:supports-[backdrop-filter]:bg-background">
        <div className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] w-full px-4 md:px-8 lg:px-8 xl:px-10 h-14 items-center gap-4 sm:h-16 sm:gap-6 lg:h-[4.25rem] lg:gap-6 xl:gap-8">
          {/* Left Block: Mobile Menu & Desktop Nav */}
          <div className="flex h-full min-w-0 items-center justify-start">
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

            <nav
              className="hidden h-full max-w-none items-center text-[10px] sm:text-[11px] font-medium text-foreground/85 lg:flex lg:text-[12px]"
              aria-label="Main"
            >
              {navLinks.map((link) => (
                <div key={link.href} className="group flex h-full items-center">
                  <Link
                    href={link.href}
                    className="relative flex h-full items-center px-1.5 lg:px-2 xl:px-3 whitespace-nowrap transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-[1px] after:h-[2px] after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 after:ease-out hover:text-foreground group-hover:after:scale-x-100"
                  >
                    <span className={`uppercase tracking-wider text-xs ${link.label === "Sale" ? "text-red-500 hover:text-red-600" : ""}`}>{link.label}</span>
                  </Link>

                  {link.megaMenu && (
                    <div className="absolute left-0 top-full w-full bg-background opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border-t border-line shadow-xl">
                      <Container>
                        <div className="flex py-12 justify-between">
                          <div className="flex gap-16 xl:gap-24">
                            {link.megaMenu.sections.map((section) => (
                              <div key={section.title}>
                                <h4 className="text-[11px] tracking-[0.2em] font-semibold mb-6 text-foreground/90 uppercase">
                                  {section.title}
                                </h4>
                                <ul className="flex flex-col gap-4">
                                  {section.links.map((sublink) => (
                                    <li key={sublink.href}>
                                      <Link
                                        href={sublink.href}
                                        className="text-[13px] text-muted hover:text-gold transition-colors font-medium uppercase tracking-wide"
                                      >
                                        {sublink.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          {link.megaMenu.featured && (
                            <div className="flex flex-col w-[26rem] shrink-0">
                                <Link href={link.megaMenu.featured.href} className="group/feat overflow-hidden">
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream mb-4">
                                  <Image
                                    src={link.megaMenu.featured.image}
                                    alt={link.megaMenu.featured.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover/feat:scale-105"
                                  />
                                </div>
                                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-foreground group-hover/feat:text-gold transition-colors block mt-2">
                                  {link.megaMenu.featured.title}
                                </span>
                              </Link>
                            </div>
                          )}
                        </div>
                      </Container>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Central Block: Brand Logo */}
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="font-display truncate text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 hover:text-gold sm:text-xl lg:text-3xl lg:-mt-1"
              onClick={close}
            >
              Liberty Center
            </Link>
          </div>

          {/* Right Block: Utilities */}
          <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2">
            <Link
              href="/search"
              className="flex h-10 w-10 min-h-10 min-w-10 touch-manipulation items-center justify-center rounded-full text-foreground/80 transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:text-gold"
              aria-label="Search"
            >
              <SearchIcon />
            </Link>
            <Link
              href="/account"
              className="flex h-10 w-10 min-h-10 min-w-10 touch-manipulation items-center justify-center rounded-full text-foreground/80 transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:text-gold"
              aria-label="Account"
            >
              <UserIcon />
            </Link>
            <Link
              href="/cart"
              className="flex h-10 w-10 min-h-10 min-w-10 touch-manipulation items-center justify-center rounded-full text-foreground/80 transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:text-gold"
              aria-label="Cart"
            >
              <BagIcon />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer + overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-foreground/40 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${open ? "opacity-100" : "opacity-0"}`}
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={close}
        />

        <div
          id={drawerId}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`absolute inset-y-0 left-0 flex w-[min(100%,22rem)] max-w-[85vw] flex-col border-r border-line bg-background shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-line px-5 sm:h-16">
            <span className="font-display text-lg font-semibold text-foreground">
              Liberty Center
            </span>
            <button
              type="button"
              className="flex h-10 w-10 -mr-2 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-cream"
              aria-label="Close menu"
              onClick={close}
            >
              <CloseIcon />
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col overflow-y-auto px-3 py-6"
            aria-label="Mobile main"
          >
            {navLinks.map((link) => (
              <div key={link.href} className="border-b border-line/50 last:border-none">
                <Link
                  href={link.href}
                  className="flex w-full items-center justify-between py-4 px-2 text-[15px] font-medium uppercase tracking-wide text-foreground/90 transition-colors hover:text-gold"
                  onClick={close}
                >
                  {link.label}
                </Link>
                {link.megaMenu && (
                  <div className="pl-4 pb-4 space-y-6">
                    {link.megaMenu.sections.map((section) => (
                      <div key={section.title}>
                        <h4 className="text-[11px] tracking-[0.2em] font-semibold mb-3 text-foreground/70 uppercase">
                          {section.title}
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                          {section.links.map((sublink) => (
                            <li key={sublink.href}>
                              <Link
                                href={sublink.href}
                                className="text-[13px] text-muted hover:text-gold transition-colors uppercase"
                                onClick={close}
                              >
                                {sublink.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
