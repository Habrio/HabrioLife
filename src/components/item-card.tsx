import { publicImageUrl } from '@/lib/supabase';
import type { Item } from '@/types/catalog';

export default function ItemCard({ item }: { item: Item }) {
  const src = item.image_path?.startsWith('http')
    ? item.image_path
    : publicImageUrl(item.image_path ?? '');
  return (
    <a
      href={item.affiliate_url ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl border p-4 hover:shadow transition"
    >
      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl mb-3 bg-slate-50">
        {src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={item.title} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="text-base font-semibold">{item.title}</div>
      {item.brand && (
        <div className="text-sm text-slate-500">
          {item.brand} {item.model ?? ''}
        </div>
      )}
      <div className="mt-1 text-sm">
        {typeof item.price_inr === 'number' ? `₹${item.price_inr.toLocaleString('en-IN')}` : ''}
      </div>
      {typeof item.rating === 'number' && (
        <div className="mt-1 text-xs text-amber-600">★ {item.rating.toFixed(1)}</div>
      )}
    </a>
  );
}
