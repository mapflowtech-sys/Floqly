import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="max-w-[1920px] mx-auto px-8 md:px-16 py-6 md:py-8">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link
            href="/"
            className="font-mono text-xs md:text-sm tracking-wider hover:opacity-70 transition-opacity duration-200"
          >
            FLOQLY
          </Link>

          {/* Навигация по центру */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              className="font-mono text-[10px] tracking-wider hover:opacity-70 transition-opacity duration-200"
            >
              ГЛАВНАЯ
            </Link>
            <Link
              href="/tools"
              className="font-mono text-[10px] tracking-wider hover:opacity-70 transition-opacity duration-200"
            >
              ИНСТРУМЕНТЫ
            </Link>
            <Link
              href="/contacts"
              className="font-mono text-[10px] tracking-wider hover:opacity-70 transition-opacity duration-200"
            >
              КОНТАКТЫ
            </Link>
          </nav>

          {/* Вход справа */}
          <Link
            href="/login"
            className="font-mono text-[10px] tracking-wider hover:opacity-70 transition-opacity duration-200"
          >
            ВОЙТИ
          </Link>
        </div>
      </div>
    </header>
  );
}
