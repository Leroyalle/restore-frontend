import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useCompare } from '@/entities/compare';
import { Container } from '@/shared/ui/container';
import { Header } from '@/widgets/header';

type DetailValue = string | number | boolean | null;
type DetailMap = Record<string, DetailValue>;

const EMPTY_VALUE = '-';

export const ComparePage = () => {
  const { products, remove } = useCompare();
  const slots = [products[0], products[1], products[2]];

  const characteristicRows = useMemo(() => {
    const keySet = new Set<string>();

    products.forEach(product => {
      Object.keys(toDetailMap(product.details)).forEach(key => keySet.add(key));
    });

    return Array.from(keySet);
  }, [products]);

  return (
    <div className="min-h-screen bg-ink-950 text-text-primary">
      <Header />

      <Container className="py-6 md:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">Сравнение товаров</h1>
          <Link
            to="/"
            className="inline-flex w-fit self-start items-center justify-center rounded-2xl border border-stroke-500 bg-white/5 px-4 py-2.5 text-sm font-semibold text-text-primary hover:bg-white/10 sm:self-auto sm:px-5 sm:py-3">
            ← Назад
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-stroke-500 bg-ink-900/50">
          <div className="lg:hidden space-y-4 p-4">
            {slots.map((product, index) => (
              <div key={product?.id ?? `mobile-slot-${index}`} className="rounded-2xl border border-stroke-500 bg-ink-900/70">
                {product ? (
                  <>
                    <div className="grid grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-3 border-b border-stroke-500 p-4">
                      <div className="h-14 w-14 overflow-hidden rounded-xl bg-ink-800/90">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{product.name}</p>
                        <p className="mt-1 text-base font-semibold text-brand-300">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                      <button
                        onClick={() => remove(product.id)}
                        className="rounded-lg border border-pink-500/50 bg-pink-500/10 px-3 py-1.5 text-xs font-medium text-pink-300">
                        Убрать
                      </button>
                    </div>
                    <div className="divide-y divide-stroke-500">
                      {characteristicRows.length === 0 ? (
                        <div className="p-4 text-sm text-text-muted">Нет характеристик</div>
                      ) : (
                        characteristicRows.map(characteristic => (
                          <div key={`${product.id}-${characteristic}`} className="flex items-start justify-between gap-4 p-4 text-sm">
                            <span className="text-text-secondary">{characteristic}</span>
                            <span className="text-right">{formatValue(toDetailMap(product.details)[characteristic] ?? null)}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <div className="p-6 text-sm text-text-muted">Добавьте товар</div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="grid grid-cols-[220px_repeat(3,minmax(0,1fr))] bg-gradient-to-r from-brand-500/10 to-brand-300/10">
              <div className="flex items-center px-6 py-10 text-lg font-semibold text-text-secondary">
                Характеристика
              </div>
              {slots.map((product, index) => (
                <div
                  key={product?.id ?? `slot-${index}`}
                  className="flex flex-col items-center border-l border-stroke-500 px-6 py-6 text-center">
                  {product ? (
                    <>
                      <div className="h-20 w-20 overflow-hidden rounded-2xl bg-ink-800/90">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                      <p className="mt-4 text-lg font-semibold">{product.name}</p>
                      <p className="mt-2 text-2xl font-semibold text-brand-300">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </p>
                      <button
                        onClick={() => remove(product.id)}
                        className="mt-4 rounded-lg border border-pink-500/50 bg-pink-500/10 px-3 py-1.5 text-sm font-medium text-pink-300 hover:bg-pink-500/20">
                        Убрать
                      </button>
                    </>
                  ) : (
                    <div className="flex h-full min-h-[170px] items-center text-sm text-text-muted">
                      Добавьте товар
                    </div>
                  )}
                </div>
              ))}
            </div>

            {characteristicRows.length === 0 ? (
              <div className="border-t border-stroke-500 px-6 py-10 text-center text-text-muted">
                Пока нет товаров для сравнения
              </div>
            ) : (
              <div>
                {characteristicRows.map(characteristic => (
                  <div
                    key={characteristic}
                    className="grid grid-cols-[220px_repeat(3,minmax(0,1fr))] border-t border-stroke-500">
                    <div className="px-6 py-5 text-base text-text-secondary">{characteristic}</div>
                    {slots.map((product, index) => (
                      <div
                        key={`${characteristic}-${product?.id ?? index}`}
                        className="border-l border-stroke-500 px-6 py-5 text-center text-base">
                        {formatValue(toDetailMap(product?.details ?? null)[characteristic] ?? null)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

const toDetailMap = (details: unknown): DetailMap => {
  if (!details || typeof details !== 'object' || Array.isArray(details)) {
    return {};
  }

  return Object.entries(details as Record<string, unknown>).reduce<DetailMap>((acc, [key, value]) => {
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      value === null
    ) {
      acc[key] = value;
    }

    return acc;
  }, {});
};

const formatValue = (value: DetailValue) => {
  if (value === null) {
    return EMPTY_VALUE;
  }

  if (typeof value === 'boolean') {
    return value ? 'Да' : 'Нет';
  }

  return String(value);
};
