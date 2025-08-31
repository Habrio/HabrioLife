'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
      <p className="text-slate-600">{error.message}</p>
    </div>
  );
}

