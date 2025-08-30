import { Suspense } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SearchClient from './SearchClient';

export default function SearchPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Suspense fallback={null}>
            <SearchClient />
          </Suspense>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

