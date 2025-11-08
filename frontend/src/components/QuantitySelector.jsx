import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

export const QuantitySelector = ({ value, onChange, min = 1, disabled = false }) => {
  const handleDecrease = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (!disabled) {
      onChange(value + 1);
    }
  };

  return (
    <div className="inline-flex items-center rounded-full border-2 border-neutral-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={disabled || value <= min}
        className="flex h-10 w-10 items-center justify-center border-r border-neutral-200 text-neutral-500 transition hover:bg-neutral-50 hover:text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <span className="w-12 text-center text-sm font-bold text-neutral-700">{value}</span>
      <button
        type="button"
        onClick={handleIncrease}
        disabled={disabled}
        className="flex h-10 w-10 items-center justify-center border-l border-neutral-200 text-neutral-500 transition hover:bg-neutral-50 hover:text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
};
