"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { ArrowRight, Tag, BookOpen, Search as SearchIcon } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';
import { fetchAllCategoriesMap, fetchAllSubcategoriesMap } from '@/src/lib/queries';

type SuggestionState = {
  cats: { name: string; slug: string }[];
  posts: { title: string; slug: string; categorySlug: string; subcategorySlug: string }[];
};

export default function SearchBox() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<SuggestionState>({ cats: [], posts: [] });
  const [catSlugMap, setCatSlugMap] = useState<Map<string, string>>(new Map());
  const [subSlugMap, setSubSlugMap] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    (async () => {
      const catMap = await fetchAllCategoriesMap();
      const subMap = await fetchAllSubcategoriesMap();
      setCatSlugMap(new Map(Array.from(catMap.entries()).map(([id, c]: any) => [id, c.slug])));
      setSubSlugMap(new Map(Array.from(subMap.entries()).map(([id, s]: any) => [id, s.slug])));
    })();
  }, []);

  useEffect(() => {
    const term = q.trim();
    if (!term) {
      setSuggestions({ cats: [], posts: [] });
      return;
    }
    let active = true;
    (async () => {
      const { data: cats } = await supabase
        .from('categories')
        .select('name,slug')
        .eq('is_active', true)
        .ilike('name', `%${term}%`)
        .limit(5);
      const { data: posts } = await supabase
        .from('blogs')
        .select('title,slug,category_id,subcategory_id')
        .eq('status', 'published')
        .ilike('title', `%${term}%`)
        .limit(7);
      if (!active) return;
      const mappedPosts = (posts || []).map((p: any) => ({
        title: p.title,
        slug: p.slug,
        categorySlug: catSlugMap.get(p.category_id) || '',
        subcategorySlug: subSlugMap.get(p.subcategory_id) || '',
      }));
      setSuggestions({ cats: cats || [], posts: mappedPosts });
    })();
    return () => {
      active = false;
    };
  }, [q, catSlugMap, subSlugMap]);

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
                          key={`${g.categorySlug}-${g.slug}`}
                          onSelect={() => {
                            router.push(`/categories/${g.categorySlug}/${g.subcategorySlug}/${g.slug}`);
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
