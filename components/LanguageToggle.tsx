"use client";

import { useLanguage, type Lang } from '@/i18n/LanguageProvider';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const btn = (code: Lang, label: string) => (
    <button
      onClick={() => setLang(code)}
      className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
        lang === code
          ? 'bg-saffron-100 text-saffron-700 border-saffron-200 dark:bg-slate-700 dark:text-saffron-300 dark:border-slate-600'
          : 'bg-transparent text-slate-600 border-slate-200 hover:bg-slate-100 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800'
      }`}
      aria-pressed={lang === code}
    >
      {label}
    </button>
  );
  return (
    <div className="flex items-center gap-1" aria-label="Language switcher">
      {btn('en', 'EN')}
      {btn('hi', 'हिंदी')}
    </div>
  );
}

