import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
};

export function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[1280px] px-5 sm:px-6 md:px-8 lg:px-10 xl:max-w-[1360px] xl:px-12 ${className}`}
    >
      {children}
    </Tag>
  );
}
