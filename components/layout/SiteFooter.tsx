import Link from "next/link";
import { Container } from "@/components/ui/Container";

const footerColumns = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All pieces" },
      { href: "/collections", label: "Collections" },
      { href: "/new-arrivals", label: "New arrivals" },
      { href: "/sale", label: "Sale" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/shipping", label: "Shipping" },
      { href: "/returns", label: "Returns" },
      { href: "/size-guide", label: "Size guide" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/stores", label: "Stores" },
      { href: "/careers", label: "Careers" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-cream/60">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="font-display text-2xl font-semibold tracking-[0.02em] text-foreground"
            >
              Liberty Atelier
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Pakistani lawn, unstitched, and pret — curated with a quiet sense of luxury.
              Crafted for women who dress with intention.
            </p>
            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
              Karachi · Lahore · Online
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:justify-items-end">
            {footerColumns.map((col) => (
              <div key={col.title} className="lg:w-40">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
                  {col.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors duration-300 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Liberty Atelier. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
