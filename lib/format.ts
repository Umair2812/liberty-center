export function formatPkr(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Drawer / marketing style: `Rs.6,590` */
export function formatRs(amount: number): string {
  return `Rs.${new Intl.NumberFormat("en-PK").format(amount)}`;
}
