import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Section from '@/src/components/kit/Section';
import PageHeader from '@/src/components/kit/PageHeader';

export default function PrivacyPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-all duration-500">
        <Navigation />
        <main>
          <Section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
            <PageHeader title="Privacy Policy" />
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>Your privacy is important to us. This policy explains what data we collect and how we use it.</p>
              <h3>Information We Collect</h3>
              <p>We may collect basic analytics and any information you choose to submit via forms or email.</p>
              <h3>How We Use Information</h3>
              <p>To improve our content and provide support. We do not sell your personal data.</p>
              <h3>Contact</h3>
              <p>For questions, contact us at info@habrio.in.</p>
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

