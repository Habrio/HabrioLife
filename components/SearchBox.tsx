"use client";

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/src/i18n/LanguageProvider';
import { getCategories, getGuides } from '@/src/i18n/data-translations';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { ArrowRight, Tag, BookOpen, Search as SearchIcon } from 'lucide-react';

export default function SearchBox() {
  const [q, setQ] = useState('');
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const suggestions = useMemo(() => {
    const term = q.trim().toLowerCase();
    const catsAll = getCategories(lang);
    const postsAll = getGuides(lang);
    const cats = (term
      ? catsAll.filter((c) => c.name.toLowerCase().includes(term) || c.slug.includes(term))
      : catsAll
    ).slice(0, 5);
    const posts = (term
      ? postsAll.filter(
          (g: any) =>
            g.title.toLowerCase().includes(term) ||
            g.product?.toLowerCase().includes(term) ||
            g.category.toLowerCase().includes(term),
        )
      : postsAll
    ).slice(0, 7);
    return { cats, posts };
  }, [q, lang]);

  const submit = () => {
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    setOpen(false);
  };

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="relative flex items-center gap-2"
        role="search"
        aria-label="Search guides"
      >
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={q}
          onChange={(e) => {
            const val = e.target.value;
            setQ(val);
            setOpen(val.trim().length > 0);
          }}
          onFocus={() => {
            if (q.trim().length > 0) setOpen(true);
          }}
          placeholder="Search products, e.g. Laptop, AC, Shoes..."
          className="w-full rounded-2xl border border-slate-200 bg-white/70 pl-12 pr-40 py-3 text-base shadow-sm outline-none backdrop-blur placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100"
        />
        <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-6 md:px-8">
          Search
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </form>

      {open && q.trim().length > 0 && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-700/80 dark:bg-slate-800/80">
          <Command shouldFilter={false} className="bg-transparent">
            <CommandList>
              {!suggestions.cats.length && !suggestions.posts.length ? (
                <CommandEmpty>No results.</CommandEmpty>
              ) : (
                <>
                  {suggestions.cats.length ? (
                    <CommandGroup heading="Categories">
                      {suggestions.cats.map((c) => (
                        <CommandItem
                          key={c.slug}
                          onSelect={() => {
                            router.push(`/categories/${c.slug}`);
                            setOpen(false);
                          }}
                        >
                          <Tag className="mr-2 h-4 w-4" /> {c.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ) : null}
                  {suggestions.posts.length ? (
                    <CommandGroup heading="Guides">
                      {suggestions.posts.map((g) => (
                        <CommandItem
                          key={`${g.category}-${g.slug}`}
                          onSelect={() => {
                            router.push(`/categories/${g.category}/${g.slug}`);
                            setOpen(false);
                          }}
                        >
                          <BookOpen className="mr-2 h-4 w-4" /> {g.title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ) : null}
                </>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
