'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ShoppingBag } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import LanguageToggle from './LanguageToggle';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    top: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      backdropFilter: 'blur(0px)',
    },
    scrolled: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
    }
  };

  const darkNavVariants = {
    top: {
      backgroundColor: 'rgba(15, 23, 42, 0)',
      backdropFilter: 'blur(0px)',
    },
    scrolled: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(20px)',
    }
  };

  return (
    <>
      <motion.nav
        variants={theme === 'dark' ? darkNavVariants : navVariants}
        animate={isScrolled ? 'scrolled' : 'top'}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 border-b ${
          isScrolled 
            ? 'border-slate-200 dark:border-slate-700' 
            : 'border-transparent'
        } transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" aria-label="Go to home">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Habrio
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation – simplified: no nav links, logo goes home */}
            <div className="hidden md:flex items-center space-x-8" />

            {/* Search removed from header; central search lives in Hero */}

            {/* Language + Theme + Mobile Menu */}
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 bg-white/10 dark:bg-slate-800/10 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/20 dark:hover:bg-slate-800/20 transition-all duration-200"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              <button
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu (links removed) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 md:hidden"
          >
            <div className="px-4 py-6 space-y-2 text-slate-600 dark:text-slate-300">
              <p>No navigation links. Tap the logo to return home.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
