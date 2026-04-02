'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-6xl mb-4">⚠️</p>
        <h1 className="text-2xl font-bold text-stone-800 mb-2">Something Went Wrong</h1>
        <p className="text-stone-600 mb-6">
          We apologize for the inconvenience. Please try again or return to the homepage.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium transition-colors text-sm"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-full font-medium transition-colors text-sm"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
