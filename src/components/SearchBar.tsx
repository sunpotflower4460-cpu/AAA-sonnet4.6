import { copy } from '../lib/i18n';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={copy.searchPlaceholder}
        aria-label={copy.searchPlaceholder}
        className="
          w-full
          bg-paper
          border border-[var(--color-line)]
          rounded-[4px]
          px-[13px] py-[8px]
          text-[15px] text-sumi
          placeholder:text-ink-muted
          focus:outline-none focus:border-[var(--color-ink-muted)]
          transition-colors duration-200
        "
      />
    </div>
  );
}
