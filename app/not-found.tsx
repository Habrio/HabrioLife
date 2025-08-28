import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white">404 - Page Not Found</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">
        Go back to Home
      </Link>
    </div>
  );
}

