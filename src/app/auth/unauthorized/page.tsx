import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">403</div>
          <h1 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
            접근 권한이 없습니다
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            이 페이지에 접근할 수 있는 권한이 없습니다.
            <br />
            허가된 계정으로 로그인해 주세요.
          </p>
        </div>

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-light-accent dark:bg-dark-accent text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
