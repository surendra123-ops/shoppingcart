export const PageContainer = ({ title, subtitle, action, children }) => (
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-base text-neutral-600 sm:text-lg">{subtitle}</p>
        )}
      </div>
      {action && <div className="mt-4 sm:mt-0">{action}</div>}
    </div>
    <div className="animate-fade-in">{children}</div>
  </div>
);
