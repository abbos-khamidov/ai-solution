'use client';

export function PricingToggle({
  isAnnual,
  onToggle,
  monthlyLabel,
  annualLabel,
  discountText,
}: {
  isAnnual: boolean;
  onToggle: () => void;
  monthlyLabel: string;
  annualLabel: string;
  discountText: string;
}) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
      <span
        className={`text-sm font-medium transition-colors ${
          !isAnnual ? 'text-gray-900' : 'text-gray-400'
        }`}
      >
        {monthlyLabel}
      </span>
      <button
        onClick={onToggle}
        className="relative w-14 h-7 bg-blue-600 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        role="switch"
        aria-checked={isAnnual}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${
            isAnnual ? 'translate-x-7' : ''
          }`}
        />
      </button>
      <span
        className={`text-sm font-medium transition-colors ${
          isAnnual ? 'text-gray-900' : 'text-gray-400'
        }`}
      >
        {annualLabel}
      </span>
      {isAnnual && (
        <span className="text-sm text-green-600 font-medium animate-pulse">
          {discountText}
        </span>
      )}
    </div>
  );
}
