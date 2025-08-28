'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QandA({
  categorySlug,
  postSlug,
}: {
  categorySlug: string;
  postSlug: string;
}) {
  const [budgetChoice, setBudgetChoice] = useState<string>('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!budgetChoice) return;
    router.push(`/categories/${categorySlug}/${postSlug}/recommendations#${budgetChoice}`);
  };

  return (
    <section>
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
  );
}

