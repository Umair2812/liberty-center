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
      className={`flex flex-col gap-4 sm:gap-5 ${isCenter ? "items-center text-center" : "items-start sm:flex-row sm:items-end sm:justify-between"} ${className}`}
    >
      <div className={isCenter ? "max-w-2xl" : "max-w-xl lg:max-w-2xl"}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold sm:text-[11px] sm:tracking-[0.24em]">
          {eyebrow}
        </p>
        <h2 className="font-display mt-3 font-medium leading-[1.12] tracking-tight text-foreground [font-size:var(--text-h2)] sm:mt-3.5">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-prose text-[length:var(--text-body)] leading-relaxed text-muted sm:mt-4 sm:text-[length:var(--text-body-lg)] sm:leading-[1.65]">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <div className={isCenter ? "mt-1 sm:mt-2" : "shrink-0"}>{action}</div>
      ) : null}
    </div>
  );
}
