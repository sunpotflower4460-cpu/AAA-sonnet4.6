import { ZanshinMark } from './ZanshinMark';
import { copy } from '../lib/i18n';

interface EmptyStateProps {
  onCreateNote: () => void;
  isSearching?: boolean;
}

export function EmptyState({ onCreateNote, isSearching = false }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-[89px] px-[21px] text-center animate-fade-slide-up">
      <div className="relative mb-[34px]">
        <ZanshinMark size={89} opacity={0.10} animate={!isSearching} />
      </div>
      <p className="font-mincho text-[18px] text-sumi mb-[8px] leading-golden">
        {isSearching ? '言葉が見つかりませんでした。' : copy.emptyTitle}
      </p>
      <p className="text-[13px] text-ink-muted mb-[34px] leading-golden" style={{ opacity: 0.7 }}>
        {isSearching ? 'No words found.' : copy.emptySubtitle}
      </p>
      {!isSearching && (
        <button
          onClick={onCreateNote}
          aria-label={copy.emptyAction}
          className="
            text-[13px] text-indigo
            border border-[var(--color-indigo)]
            rounded-[4px]
            px-[21px] py-[10px]
            hover:bg-indigo hover:text-paper
            active:scale-95
            transition-all duration-300
          "
          style={{ opacity: 0.8 }}
        >
          {copy.emptyAction}
        </button>
      )}
    </div>
  );
}
