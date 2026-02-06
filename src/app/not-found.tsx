import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
        <p className="text-xl text-gray-500 mb-8">Page not found</p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
