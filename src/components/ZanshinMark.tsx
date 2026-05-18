interface ZanshinMarkProps {
  size?: number;
  opacity?: number;
  className?: string;
  animate?: boolean;
}

export function ZanshinMark({ size = 89, opacity = 0.08, className = '', animate = false }: ZanshinMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 89 89"
      fill="none"
      className={`${animate ? 'animate-breathe' : ''} ${className}`}
      aria-hidden="true"
    >
      <circle
        cx="44.5"
        cy="44.5"
        r="40"
        stroke="#1F1B18"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={opacity}
        fill="none"
        strokeDasharray="251.3"
        strokeDashoffset="30"
      />
    </svg>
  );
}
