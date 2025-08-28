'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { categories, guides } from '@/lib/data';

interface GuidePageProps {
  params: { category: string; post: string };
}

export default function GuidePage({ params }: GuidePageProps) {
  const { category: categorySlug, post: postSlug } = params;
  const router = useRouter();

  const guide = guides.find((g) => g.slug === postSlug && g.category === categorySlug);
  const category = categories.find((c) => c.slug === categorySlug);

  const [budgetChoice, setBudgetChoice] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!budgetChoice) return;
    router.push(`/categories/${categorySlug}/${postSlug}/recommendations#${budgetChoice}`);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              {guide?.title ?? 'Guide'}
            </h1>
            {category?.name && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Category: {category.name}</p>
            )}

            {/* Introduction */}
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              {guide?.product
                ? `Buying a ${guide.product.toLowerCase()} can be overwhelming with so many options and features. This guide highlights the most important factors so you can choose the right ${guide.product.toLowerCase()} for your needs.`
                : 'Buying the right product can be overwhelming with so many options and features. This guide highlights the most important factors so you can choose confidently.'}
            </p>

            {/* Major Criteria Sections */}
            <h2 className="text-2xl font-semibold mt-6 mb-2 text-slate-900 dark:text-slate-100">1. Budget and Usage</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Start by setting a realistic budget and clarifying your primary use-cases. Consider how often you’ll use it and which features are truly essential versus nice-to-have.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2 text-slate-900 dark:text-slate-100">2. Key Specifications</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Focus on the core specs that impact performance and experience. Here are common items to evaluate:
            </p>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-4">
              <li><strong>Performance:</strong> Match the power (e.g., CPU/Motor) to your workload or intensity.</li>
              <li><strong>Capacity/Size:</strong> Ensure it fits your space and meets your capacity needs.</li>
              <li><strong>Durability & Build:</strong> Look for sturdy materials and reliable components.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2 text-slate-900 dark:text-slate-100">3. Brand, Support, and Warranty</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Reputable brands often provide better quality control and after-sales support. Check warranty terms and service networks, and skim user reviews to learn about real-world reliability.
            </p>

            {/* Optional: product-tailored bullets */}
            {guide?.product?.toLowerCase() === 'laptop' && (
              <>
                <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-900 dark:text-slate-100">Key Features to Consider:</h3>
                <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-4">
                  <li><strong>Processor:</strong> Aim for Intel i5/Ryzen 5 or better for balanced performance.</li>
                  <li><strong>RAM:</strong> 8GB minimum for multitasking; 16GB+ for longevity.</li>
                  <li><strong>Storage:</strong> Prefer SSDs; 256GB+ recommended.</li>
                </ul>
              </>
            )}

            {guide?.product?.toLowerCase() === 'running shoes' && (
              <>
                <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-900 dark:text-slate-100">Fit and Comfort:</h3>
                <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-4">
                  <li>Choose the right size with a thumb’s width at the toe.</li>
                  <li>Match cushioning to your distance and terrain (road vs trail).</li>
                  <li>Consider stability features if you overpronate.</li>
                </ul>
              </>
            )}

            {guide?.product?.toLowerCase() === 'air conditioner' && (
              <>
                <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-900 dark:text-slate-100">Room Size and Efficiency:</h3>
                <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-4">
                  <li>Match tonnage to room size for effective cooling.</li>
                  <li>Prefer higher star ratings for energy efficiency.</li>
                  <li>Consider inverter technology for quieter, efficient operation.</li>
                </ul>
              </>
            )}

            {/* Wrap-up */}
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              By keeping these factors in mind, you’ll be well on your way to choosing the right option. Next, let’s tailor recommendations based on your budget.
            </p>

            {/* Q&A Section */}
            <hr className="my-8 border-t border-slate-200 dark:border-slate-700" />
            <section className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-2 text-slate-900 dark:text-slate-100">Find Your Perfect Match</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Answer a quick question to get personalized product recommendations:
              </p>

              <form onSubmit={handleSubmit}>
                <p className="font-medium text-slate-800 dark:text-slate-200 mb-2">What is your budget range for this purchase?</p>

                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="budget"
                      value="budget"
                      className="form-radio text-blue-600 mr-2"
                      onChange={() => setBudgetChoice('budget')}
                      checked={budgetChoice === 'budget'}
                    />
                    <span className="text-slate-800 dark:text-slate-200">Budget</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="budget"
                      value="mid-range"
                      className="form-radio text-blue-600 mr-2"
                      onChange={() => setBudgetChoice('mid-range')}
                      checked={budgetChoice === 'mid-range'}
                    />
                    <span className="text-slate-800 dark:text-slate-200">Mid-Range</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="budget"
                      value="premium"
                      className="form-radio text-blue-600 mr-2"
                      onChange={() => setBudgetChoice('premium')}
                      checked={budgetChoice === 'premium'}
                    />
                    <span className="text-slate-800 dark:text-slate-200">Premium</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!budgetChoice}
                  className={`mt-2 px-6 py-3 rounded-lg text-white font-semibold transition ${
                    budgetChoice ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600/60 cursor-not-allowed'
                  }`}
                >
                  View Recommendations
                </button>
              </form>
            </section>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

