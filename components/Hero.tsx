'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, Shield } from 'lucide-react';

const easingOut: [number, number, number, number] = [0.16, 1, 0.3, 1]; // ≈ easeOut
const easingInOut: [number, number, number, number] = [0.42, 0, 0.58, 1]; // ≈ easeInOut

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easingOut },
  },
};

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function Hero(): JSX.Element {
  const stats: { icon: IconType; value: string; label: string; color: string }[] = [
    { icon: Star, value: '4.9/5', label: 'Customer Rating', color: 'text-yellow-500' },
    { icon: Shield, value: '50K+', label: 'Happy Customers', color: 'text-green-500' },
    { icon: TrendingUp, value: '70%', label: 'Average Savings', color: 'text-blue-500' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-72 h-72 bg-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full border border-blue-200 dark:border-blue-800">
              <TrendingUp className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                🔥 Premium Deals Live Now
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-5xl font-bold leading-tight md:text-7xl"
          >
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-white">
              Discover Premium
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Products & Deals
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-300 md:text-2xl"
          >
            Curated selection of the best products from top brands.
            <br className="hidden md:block" />
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              Save up to 70% with exclusive deals
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="group rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <span className="flex items-center">
                Browse All Deals
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-2xl border border-slate-200 bg-white/10 px-8 py-4 text-lg font-semibold text-slate-700 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 dark:border-slate-700 dark:bg-slate-800/20 dark:text-slate-300 dark:hover:bg-slate-800/30"
            >
              How It Works
            </motion.button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3"
          >
            {stats.map(({ icon: Icon, value, label, color }, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-slate-200/20 bg-white/5 p-6 text-center backdrop-blur-sm dark:border-slate-700/20 dark:bg-slate-800/20"
              >
                <Icon className={`mx-auto mb-3 h-8 w-8 ${color}`} />
                <div className="mb-1 text-2xl font-bold text-slate-900 dark:text-white">
                  {value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'loop', ease: easingInOut }}
        className="absolute left-8 top-1/4 hidden h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 lg:block"
      />
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'loop', ease: easingInOut, delay: 2 }}
        className="absolute bottom-1/4 right-12 hidden h-16 w-16 rounded-full bg-gradient-to-br from-pink-400 to-orange-500 opacity-20 lg:block"
      />
    </section>
  );
}
