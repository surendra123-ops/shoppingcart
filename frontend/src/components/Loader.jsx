export const Loader = ({ label = 'Loading' }) => (
  <div className="flex h-64 flex-col items-center justify-center gap-4">
    <div className="relative">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-neutral-200 border-t-primary-dark border-r-primary" />
      <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full border-4 border-primary-light opacity-20" />
    </div>
    <p className="text-sm font-medium text-neutral-600">{label}...</p>
  </div>
);
