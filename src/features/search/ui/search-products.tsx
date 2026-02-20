import { usePopularProducts } from '@/entities/product';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { TextField } from '@/shared/ui/input';
import { useState } from 'react';

interface Props {
  className?: string;
}

export const SearchProducts = ({ className }: Props) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);

  const { data, isFetching } = usePopularProducts({ query: debouncedValue, limit: 5 });

  return (
    <div className={['relative flex-1 group', className].filter(Boolean).join(' ')}>
      <div className="relative z-20">
        <div className="flex justify-center gap-x-2">
          <TextField
            name="поиск"
            type="text"
            value={value}
            onChange={setValue}
            placeholder="Поиск товаров..."
            className="w-full rounded-2xl border border-stroke-500 bg-ink-850/80 py-2.5 pl-11 pr-10 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-brand-400 focus:bg-ink-900 focus:ring-4 focus:ring-brand-400/10"
          />
          {value && <button onClick={() => setValue('')}>X</button>}
        </div>
        {isFetching && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-400 border-t-transparent" />
          </div>
        )}
      </div>

      {data && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-10 overflow-hidden rounded-2xl border border-stroke-500 bg-ink-900/95 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-[380px] overflow-y-auto p-2 custom-scrollbar">
            {isFetching && !data.pages[0].items.length ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="flex animate-pulse items-center gap-3 rounded-xl p-2">
                  <div className="h-12 w-12 rounded-lg bg-ink-800" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-2/3 rounded bg-ink-800" />
                    <div className="h-3 w-1/4 rounded bg-ink-800" />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col gap-1">
                <span className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Результаты поиска
                </span>
                {data.pages.map(page =>
                  page.items.map(item => (
                    <button
                      key={item.id}
                      className="group/item flex items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-white/5 active:scale-[0.98]">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-ink-800 border border-white/5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform group-hover/item:scale-110"
                        />
                      </div>
                      <div className="flex flex-1 flex-col overflow-hidden">
                        <span className="truncate text-sm font-medium text-text-primary">
                          {item.name}
                        </span>
                        <span className="text-xs font-semibold text-brand-400">
                          {item.price.toLocaleString()} ₽
                        </span>
                      </div>
                      <div className="opacity-0 transition-opacity group-hover/item:opacity-100 pr-2">
                        <ArrowIcon className="h-4 w-4 text-text-muted" />
                      </div>
                    </button>
                  )),
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
