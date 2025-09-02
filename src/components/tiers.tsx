import ItemCard from '@/components/item-card';
import type { Item } from '@/types/catalog';

function Tier({ title, items }: { title: string; items: Item[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((i) => (
          <ItemCard key={i.id} item={i} />
        ))}
      </div>
    </section>
  );
}

export default function Tiers({
  budget = [],
  mid = [],
  premium = [],
}: {
  budget?: Item[];
  mid?: Item[];
  premium?: Item[];
}) {
  return (
    <div>
      <Tier title="Budget" items={budget} />
      <Tier title="Mid-range" items={mid} />
      <Tier title="Premium" items={premium} />
    </div>
  );
}
