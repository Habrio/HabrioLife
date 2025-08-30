'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Newsletter from '@/components/Newsletter';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HomeCategories from '@/components/HomeCategories';
import PostsPreview from '@/components/PostsPreview';

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Hero />
          <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <HomeCategories />
          </section>
          
          <Newsletter />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
