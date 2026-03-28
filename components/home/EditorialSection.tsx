import Image from "next/image";
import Link from "next/link";
import { editorialBlock } from "@/data/home";
import { Container } from "@/components/ui/Container";

export function EditorialSection() {
  return (
    <section className="border-y border-line bg-background py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-cream lg:order-2 lg:aspect-[3/4]">
            <Image
              src={editorialBlock.image}
              alt={editorialBlock.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="lg:order-1 lg:py-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              {editorialBlock.eyebrow}
            </p>
            <h2 className="font-display mt-3 text-3xl font-medium leading-tight text-foreground sm:text-4xl">
              {editorialBlock.title}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">
              {editorialBlock.body}
            </p>
            <Link
              href={editorialBlock.cta.href}
              className="mt-8 inline-flex h-11 items-center border-b border-gold/60 pb-0.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              {editorialBlock.cta.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
