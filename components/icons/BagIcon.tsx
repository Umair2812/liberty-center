type BagIconProps = {
  className?: string;
  /** Pixel width/height; header uses 22 */
  size?: number;
};

export function BagIcon({ className, size = 22 }: BagIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
      shapeRendering="geometricPrecision"
    >
      <path
        d="M6 7h15l-1 12H7L6 7zm0 0L5 3H2M9 11v6M15 11v6M9 7V5a3 3 0 016 0v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
