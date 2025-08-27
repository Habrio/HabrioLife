'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import FeaturedDeals from '@/components/FeaturedDeals';
import Newsletter from '@/components/Newsletter';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Hero />
          <FeaturedDeals />
          <ProductGrid />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}