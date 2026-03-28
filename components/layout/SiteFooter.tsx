import Link from "next/link";
import { Container } from "@/components/ui/Container";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/sale", label: "Sale" },
  { href: "/about", label: "About" },
];

const customerServiceLinks = [
  { href: "/contact", label: "Contact us" },
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns" },
  { href: "/size-guide", label: "Size guide" },
  { href: "/stores", label: "Store locator" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    icon: FacebookIcon,
  },
  {
    label: "X",
    href: "https://www.x.com",
    icon: XIcon,
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/20 bg-linear-to-b from-blush from-0% via-cream via-45% to-gold-soft/35">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:gap-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-5">
            <Link
              href="/"
              className="font-display inline-block text-2xl font-semibold tracking-tight text-foreground transition-colors duration-300 hover:text-gold"
            >
              Liberty Center
            </Link>
            <p className="mt-5 max-w-[22rem] text-sm leading-[1.65] text-muted">
              Timeless Pakistani fashion — lawn, unstitched, and pret — curated with care for the way you
              live and celebrate.
            </p>
          </div>

          {/* Quick links */}
          <nav className="lg:col-span-2" aria-labelledby="footer-quick-heading">
            <h2
              id="footer-quick-heading"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground"
            >
              Quick links
            </h2>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-[color,transform] duration-300 motion-safe:hover:translate-x-0.5 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Customer service */}
          <nav className="lg:col-span-3" aria-labelledby="footer-service-heading">
            <h2
              id="footer-service-heading"
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground"
            >
              Customer service
            </h2>
            <ul className="mt-5 space-y-3">
              {customerServiceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-[color,transform] duration-300 motion-safe:hover:translate-x-0.5 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="flex flex-col md:col-span-2 lg:col-span-2 lg:items-end lg:justify-self-end">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground">
              Follow us
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2 sm:gap-3 lg:justify-end">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 min-h-10 min-w-10 touch-manipulation items-center justify-center rounded-full border border-line/90 bg-background/60 text-foreground/70 transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:border-gold/40 motion-safe:hover:bg-background motion-safe:hover:text-foreground motion-safe:hover:shadow-md"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-line/80 pt-8 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="text-xs text-muted">© {year} Liberty Center. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs">
            <Link
              href="/privacy"
              className="text-muted transition-colors duration-300 hover:text-foreground"
            >
              Privacy policy
            </Link>
            <Link href="/terms" className="text-muted transition-colors duration-300 hover:text-foreground">
              Terms of use
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v9h4v-9h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 4l16 16M20 4L4 20"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
