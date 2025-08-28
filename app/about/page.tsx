import { FC } from 'react';

const AboutPage: FC = () => {
  return (
    <section className="px-4 py-16 max-w-3xl mx-auto text-slate-600 dark:text-slate-300">
      <h1 className="text-4xl font-bold text-center mb-8 text-slate-900 dark:text-slate-100">About Habrio</h1>
      <p className="mb-6">
        Habrio is your trusted companion for making informed purchases. We provide detailed ‘How to Buy’ guides and curated product recommendations to help you shop smarter and buy with confidence.
      </p>
      <div className="space-y-4 mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">How It Works</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <span className="font-semibold">Browse Categories:</span> Choose a product category you’re interested in, such as Electronics or Home &amp; Garden.
          </li>
          <li>
            <span className="font-semibold">Read Guides:</span> Dive into our “How to Buy” guides to learn what factors matter for your purchase.
          </li>
          <li>
            <span className="font-semibold">Get Recommendations:</span> Answer a couple of quick questions and see product suggestions across Budget, Mid-Range, and Premium tiers.
          </li>
          <li>
            <span className="font-semibold">No Account Needed:</span> Everything is available without logging in—just browse and click.
          </li>
        </ol>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        <strong>Affiliate Disclosure:</strong> We may earn a small commission from purchases made through our links, but it doesn’t affect your price or our recommendations.
      </p>
    </section>
  );
};

export default AboutPage;
