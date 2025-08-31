export default function EmptyState({ title = 'Nothing found', subtitle }: { title?: string; subtitle?: string }) {
  return (
    <div className="text-center py-16 border rounded-2xl">
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>}
    </div>
  );
}

