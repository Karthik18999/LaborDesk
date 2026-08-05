import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">404 - Page Not Found</h1>
      <p className="text-sm text-slate-500 mb-6">The requested page does not exist or has been moved.</p>
      <Link href="/" className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-semibold">
        Return to Home Page
      </Link>
    </div>
  );
}
