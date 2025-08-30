"use client";

import PageHeader from '@/src/components/kit/PageHeader';
import { useLanguage } from '@/src/i18n/LanguageProvider';
import { getCategories } from '@/src/i18n/data-translations';

export default function CategoryHeader({ slug, fallbackName, fallbackDescription }: { slug: string; fallbackName: string; fallbackDescription?: string }) {
  const { lang } = useLanguage();
  const cat = getCategories(lang).find((c) => c.slug === slug);
  return <PageHeader title={cat?.name || fallbackName} description={cat?.description || fallbackDescription} />;
}

