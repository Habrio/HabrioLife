'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ page, pages }: { page: number; pages: number }) {
  const router = useRouter();
  const sp = useSearchParams();

  const go = (n: number) => {
    const p = new URLSearchParams(sp.toString());
    p.set('page', String(n));
    router.push('?' + p.toString());
  };

  if (pages <= 1) return null;
  return (
    <div className="mt-8 flex items-center gap-2">
      <button
        onClick={() => go(Math.max(1, page - 1))}
        className="px-3 py-1 rounded-lg border hover:bg-slate-50 disabled:opacity-50"
        disabled={page <= 1}
      >
        Prev
      </button>
      <span className="text-sm text-slate-600">
        Page {page} of {pages}
      </span>
      <button
        onClick={() => go(Math.min(pages, page + 1))}
        className="px-3 py-1 rounded-lg border hover:bg-slate-50 disabled:opacity-50"
        disabled={page >= pages}
      >
        Next
      </button>
    </div>
  );
}

