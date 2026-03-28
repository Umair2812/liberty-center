import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col gap-4 ${isCenter ? "items-center text-center" : "items-start sm:flex-row sm:items-end sm:justify-between"} ${className}`}
    >
      <div className={isCenter ? "max-w-2xl" : "max-w-xl"}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
          {eyebrow}
        </p>
        <h2 className="font-display mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight tracking-tight text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className={isCenter ? "mt-2" : "shrink-0"}>{action}</div> : null}
    </div>
  );
}
