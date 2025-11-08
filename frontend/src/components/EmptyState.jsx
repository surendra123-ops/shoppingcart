export const EmptyState = ({ title, description, action }) => (
  <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-neutral-300 bg-gradient-to-br from-white to-neutral-50 px-8 py-20 text-center">
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
      <svg
        className="h-10 w-10 text-neutral-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    </div>
    <div>
      <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-sm text-neutral-600">{description}</p>
      )}
    </div>
    {action && <div className="mt-4">{action}</div>}
  </div>
);
