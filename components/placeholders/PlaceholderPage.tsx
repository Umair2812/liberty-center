import Link from "next/link";
import { Container } from "@/components/ui/Container";

type PlaceholderPageProps = {
  title: string;
  description?: string;
};

export function PlaceholderPage({
  title,
  description = "This section is coming soon. We're crafting the full experience for you.",
}: PlaceholderPageProps) {
  return (
    <div className="py-20 lg:py-28">
      <Container className="max-w-lg text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
          Liberty Center
        </p>
        <h1 className="font-display mt-3 text-3xl font-medium text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">{description}</p>
        <Link
          href="/"
          className="mt-10 inline-flex h-11 items-center border-b border-gold/50 pb-0.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-gold hover:text-gold"
        >
          Return home
        </Link>
      </Container>
    </div>
  );
}
