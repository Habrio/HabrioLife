// Server Component: keeps UI the same, allows async children
import Hero from '@/components/Hero';
import Newsletter from '@/components/Newsletter';
import HomeCategoriesServer from '@/components/HomeCategoriesServer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
      <main>
        <Hero />
        <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Server-fetched categories from Supabase; UI unchanged */}
          <HomeCategoriesServer />
        </section>

        <Newsletter />
      </main>
    </div>
  );
}
