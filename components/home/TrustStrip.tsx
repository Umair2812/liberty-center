import { Container } from "@/components/ui/Container";

const items = [
  { title: "Complimentary shipping", subtitle: "On orders over Rs. 15,000" },
  { title: "Easy returns", subtitle: "Within 14 days" },
  { title: "Secure checkout", subtitle: "Cards & bank transfer" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-line bg-blush/40">
      <Container className="grid gap-8 py-10 sm:grid-cols-3 sm:gap-6 sm:py-12">
        {items.map((item) => (
          <div
            key={item.title}
            className="text-center sm:border-r sm:border-line sm:last:border-r-0 sm:px-4 sm:first:pl-0 sm:last:pr-0"
          >
            <p className="text-sm font-medium text-foreground">{item.title}</p>
            <p className="mt-1 text-xs text-muted">{item.subtitle}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
