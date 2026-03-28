import Image from "next/image";
import Link from "next/link";
import { featuredCollections } from "@/data/home";
import { Container } from "@/components/ui/Container";

export function FeaturedCollections() {
  const [hero, ...rest] = featuredCollections;

  return (
    <section className="bg-cream/50 py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            Featured
          </p>
          <h2 className="font-display mt-2 text-3xl font-medium text-foreground sm:text-4xl">
            This season&apos;s collections
          </h2>
          <p className="mt-3 text-sm text-muted">
            Editorial drops inspired by garden parties, velvet evenings, and heirloom craft.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:gap-5">
          <Link
            href={hero.href}
            className="group relative aspect-[4/5] overflow-hidden bg-blush lg:aspect-auto lg:min-h-[520px]"
          >
            <Image
              src={hero.image}
              alt={hero.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 p-8 text-background lg:p-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-soft">
                Signature
              </p>
              <h3 className="font-display mt-2 text-3xl font-medium lg:text-4xl">{hero.title}</h3>
              <p className="mt-2 max-w-sm text-sm text-background/85">{hero.subtitle}</p>
              <span className="mt-6 inline-block text-sm font-medium underline decoration-gold-soft/60 underline-offset-4 transition-colors group-hover:text-gold-soft">
                Explore collection
              </span>
            </div>
          </Link>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
            {rest.map((col) => (
              <Link
                key={col.id}
                href={col.href}
                className="group relative aspect-[3/4] overflow-hidden bg-blush sm:aspect-[4/5] lg:aspect-[16/10] lg:min-h-0"
              >
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-foreground/65 to-transparent opacity-90"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-6 text-background">
                  <h3 className="font-display text-2xl font-medium">{col.title}</h3>
                  <p className="mt-1 text-sm text-background/85">{col.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
