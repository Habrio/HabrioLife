'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Grid, List, Search } from 'lucide-react';

type ViewMode = 'grid' | 'list';
type SortType = 'featured' | 'price-low' | 'price-high' | 'rating' | 'discount';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  affiliate: string;
}

const products: Product[] = [
  { id: 1, title: 'MacBook Pro 16-inch', category: 'Electronics', price: 2399, originalPrice: 2499, rating: 4.8, reviews: 1234, image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: 'https://amazon.com/dp/example1' },
  { id: 2, title: 'AirPods Pro 2nd Gen', category: 'Electronics', price: 249, originalPrice: 279, rating: 4.7, reviews: 8967, image: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: 'https://amazon.com/dp/example2' },
  { id: 3, title: 'Gaming Chair Pro', category: 'Furniture', price: 299, originalPrice: 399, rating: 4.6, reviews: 567, image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: 'https://amazon.com/dp/example3' },
  { id: 4, title: 'Instant Pot Duo', category: 'Kitchen', price: 89, originalPrice: 129, rating: 4.5, reviews: 23456, image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: 'https://amazon.com/dp/example4' },
  { id: 5, title: 'Yoga Mat Premium', category: 'Sports', price: 49, originalPrice: 69, rating: 4.4, reviews: 3421, image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: 'https://amazon.com/dp/example5' },
  { id: 6, title: 'Smart LED Bulbs (4-Pack)', category: 'Home', price: 39, originalPrice: 59, rating: 4.3, reviews: 1876, image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: 'https://amazon.com/dp/example6' },
];

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortType>('featured');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // ✅ Convert Set → Array first (avoids TS downlevel iteration error)
  const categories = useMemo<string[]>(
    () => ['All', ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))],
    []
  );

  // ✅ Derive filtered + sorted products from state (no mutations of source array)
  const filteredProducts = useMemo<Product[]>(() => {
    const q = searchQuery.trim().toLowerCase();

    let list = products.slice(); // copy

    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        list.sort((a, b) => {
          const dA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
          const dB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
          return dB - dA;
        });
        break;
      case 'featured':
      default:
        // keep original order
        break;
    }

    return list;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          All Products
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Discover amazing deals on premium products
        </p>
      </motion.div>

      {/* Controls */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Sort and View Controls */}
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Best Discount</option>
            </select>

            <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedCategory}-${sortBy}-${searchQuery}-${viewMode}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className={`group ${
                viewMode === 'list'
                  ? 'flex bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-100 dark:border-slate-700'
                  : 'bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700'
              }`}
            >
              {/* Product Image */}
              <div className={viewMode === 'list' ? 'w-24 h-24 mr-4' : 'mb-4'}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={`${
                    viewMode === 'list'
                      ? 'w-full h-full object-cover rounded-lg'
                      : 'w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300'
                  }`}
                />
              </div>

              {/* Product Info */}
              <div className={viewMode === 'list' ? 'flex-1' : ''}>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                  {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {product.rating} ({product.reviews.toLocaleString()})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    ${product.price}
                  </span>
                  <span className="text-sm text-slate-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                  </span>
                </div>

                {/* CTA Button */}
                <motion.a
                  href={product.affiliate}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${
                    viewMode === 'list' ? 'inline-block px-6 py-2' : 'block w-full py-3'
                  } bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
                >
                  Buy Now
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
          <p className="text-xl text-slate-600 dark:text-slate-400">
            No products found matching your criteria.
          </p>
        </motion.div>
      )}
    </section>
  );
}
