import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Section from '@/src/components/kit/Section';
import PageHeader from '@/src/components/kit/PageHeader';
import { guides } from '@/lib/data';
import PostsGrid from '@/components/PostsGrid';

export default function PostsPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <PageHeader title="All Posts" description="Browse all buying guides and product roundups." />
            <PostsGrid guides={guides as any[]} />
          </Section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
