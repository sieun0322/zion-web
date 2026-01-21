import { auth, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';
import StockCalculator from '@/components/StockCalculator';

export default async function SplendorPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
              Splendor
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              수익률 계산기
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {session.user?.email}
            </span>
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
              }}
            >
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                로그아웃
              </button>
            </form>
          </div>
        </div>

        {/* Calculator */}
        <StockCalculator />
      </div>
    </div>
  );
}
