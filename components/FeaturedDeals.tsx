'use client';

import { motion } from 'framer-motion';
import { Star, Clock, Tag } from 'lucide-react';

const featuredProducts = [
  {
    id: 1,
    title: 'Premium Wireless Headphones',
    originalPrice: 299,
    discountedPrice: 199,
    rating: 4.8,
    reviews: 2834,
    discount: 33,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Best Seller',
    timeLeft: '2d 14h',
    affiliate: 'https://amazon.com/dp/example1'
  },
  {
    id: 2,
    title: 'Smart Fitness Watch',
    originalPrice: 249,
    discountedPrice: 149,
    rating: 4.6,
    reviews: 1567,
    discount: 40,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Limited Time',
    timeLeft: '1d 8h',
    affiliate: 'https://amazon.com/dp/example2'
  },
  {
    id: 3,
    title: 'Professional Camera Lens',
    originalPrice: 899,
    discountedPrice: 549,
    rating: 4.9,
    reviews: 892,
    discount: 39,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    badge: 'Editor\'s Choice',
    timeLeft: '3d 22h',
    affiliate: 'https://amazon.com/dp/example3'
  },
];

export default function FeaturedDeals() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-full border border-orange-200 dark:border-orange-800 mb-6">
          <Tag className="w-4 h-4 mr-2 text-orange-600 dark:text-orange-400" />
          <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
            🔥 Featured Deals
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          Trending Products
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Hand-picked deals with massive savings
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative"
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-700 overflow-hidden">
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full">
                  {product.badge}
                </span>
              </div>

              {/* Discount Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                  -{product.discount}%
                </span>
              </div>

              {/* Product Image */}
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2">
                  {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
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
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    ${product.discountedPrice}
                  </span>
                  <span className="text-lg text-slate-500 line-through">
                    ${product.originalPrice}
                  </span>
                </div>

                {/* Time Left */}
                <div className="flex items-center text-orange-600 dark:text-orange-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">{product.timeLeft} left</span>
                </div>

                {/* CTA Button */}
                <motion.a
                  href={product.affiliate}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Buy on Amazon
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-600 dark:to-slate-700 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300"
        >
          View All Deals
        </motion.button>
      </motion.div>
    </section>
  );
}