type CartItemProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  onDecrement: () => void;
  onIncrement: () => void;
  onRemove: () => void;
};

export const CartItem = ({
  name,
  price,
  quantity,
  onDecrement,
  onIncrement,
  image,
  onRemove,
}: CartItemProps) => {
  const handleDecrease = () => {
    if (quantity > 1) onDecrement();
  };

  return (
    <div className="bg-ink-850/40 border border-stroke-500 rounded-2xl p-5 sm:p-6 hover:bg-ink-850/60 transition">
      <div className="flex gap-4 sm:gap-6">
        {/* Product Image */}
        {image && (
          <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl bg-ink-900/80 flex items-center justify-center overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-text-primary truncate">{name}</h3>
          {/* <p className="text-sm text-text-muted mt-1 line-clamp-2">{description}</p> */}

          {/* Price */}
          <div className="mt-3 sm:mt-4">
            <p className="text-lg sm:text-2xl font-bold text-brand-400">
              {price.toLocaleString('ru-RU')} ₽
            </p>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col items-end justify-between">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2 bg-ink-900/80 rounded-lg p-1">
            <button
              onClick={handleDecrease}
              disabled={quantity === 1}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-stroke-500/20 text-text-secondary hover:text-text-primary transition disabled:opacity-50 disabled:cursor-not-allowed">
              −
            </button>
            <span className="w-6 text-center text-sm font-medium text-text-primary">
              {quantity}
            </span>
            <button
              onClick={onIncrement}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-stroke-500/20 text-text-secondary hover:text-text-primary transition">
              +
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={onRemove}
            className="text-xs sm:text-sm px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition">
            🗑️ Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
