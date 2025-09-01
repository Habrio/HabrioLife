'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';

export default function SearchForm({
  initialQ,
  initialCategory,
  initialSub,
}: {
  initialQ: string;
  initialCategory: string;
  initialSub: string;
}) {
  const [q, setQ] = useState(initialQ);
  const [category, setCategory] = useState(initialCategory);
  const [sub, setSub] = useState(initialSub);
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    setQ(initialQ);
    setCategory(initialCategory);
    setSub(initialSub);
  }, [initialQ, initialCategory, initialSub]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const p = new URLSearchParams(sp.toString());
    q ? p.set('q', q) : p.delete('q');
    category ? p.set('category', category) : p.delete('category');
    sub ? p.set('sub', sub) : p.delete('sub');
    p.delete('page');
    router.push('?' + p.toString());
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by title or excerpt…"
        className="rounded-xl border px-3 py-2"
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="category slug (optional)"
        className="rounded-xl border px-3 py-2"
      />
      <input
        value={sub}
        onChange={(e) => setSub(e.target.value)}
        placeholder="subcategory slug (optional)"
        className="rounded-xl border px-3 py-2"
      />
      <button className="rounded-xl border px-3 py-2 hover:bg-slate-50">Search</button>
    </form>
  );
}

