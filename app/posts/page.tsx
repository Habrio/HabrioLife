import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Section from '@/src/components/kit/Section';
import PageHeader from '@/src/components/kit/PageHeader';
import Link from 'next/link';
import { guides } from '@/lib/data';
import { motion } from 'framer-motion';
import { container, item, hover, spring } from '@/src/lib/motion';

function heroFor(g: any) {
  const r = g?.recommendations as any;
  return r?.['mid-range']?.[0]?.image || r?.['budget']?.[0]?.image || r?.['premium']?.[0]?.image;
}

export default function PostsPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <PageHeader title="All Posts" description="Browse all buying guides and product roundups." />
            <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guides.map((g) => (
                <motion.article key={`${g.category}-${g.slug}`} variants={item} whileHover={hover} transition={spring}>
                  <Link href={`/categories/${g.category}/${g.slug}`} className="group block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {heroFor(g) ? (
                      <img src={heroFor(g)} alt={g.title} className="h-56 w-full rounded-2xl object-cover" loading="lazy" />
                    ) : (
                      <div className="h-56 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
                    )}
                    <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-800 group-hover:text-saffron-700 dark:text-slate-100 dark:group-hover:text-saffron-400">
                      {g.title}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">By Habrio • {g.category}</p>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </Section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

