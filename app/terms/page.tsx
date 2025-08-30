import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Section from '@/src/components/kit/Section';
import PageHeader from '@/src/components/kit/PageHeader';

export default function TermsPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
            <PageHeader title="Terms of Service" />
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>Welcome to Habrio. By using our website, you agree to these terms. Please read them carefully.</p>
              <h3>Use of Site</h3>
              <p>Content is for informational purposes only. Do not misuse our site or attempt to disrupt its operation.</p>
              <h3>Intellectual Property</h3>
              <p>All trademarks and content belong to their respective owners.</p>
              <h3>Changes</h3>
              <p>We may update these terms at any time. Continued use of the site constitutes acceptance of the revised terms.</p>
              <h3>Contact</h3>
              <p>Questions? Email us at info@habrio.in.</p>
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

