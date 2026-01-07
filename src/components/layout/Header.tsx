import Link from 'next/link';

export function Header() {
  // Текущее время МСК для отображения в хедере
  const currentTime = new Date().toLocaleTimeString('ru-RU', {
    timeZone: 'Europe/Moscow',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="max-w-[1920px] mx-auto px-8 md:px-16 py-6 md:py-8">
        <div className="flex items-start justify-between">
          {/* Логотип слева + маленькая инфо */}
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className="font-mono text-sm md:text-base tracking-[0.2em] hover:opacity-70 transition-opacity duration-200"
            >
              FLOQLY
            </Link>
            <p className="font-mono text-[9px] md:text-[10px] text-foreground/50 tracking-wider leading-tight">
              Умный виджет для вашего сайта
            </p>
          </div>

          {/* Время/инфо справа */}
          <div className="text-right">
            <p className="font-mono text-[9px] md:text-[10px] text-foreground/50 tracking-wider">
              ПН-ПТ 10-19 МСК
            </p>
            <p className="font-mono text-[9px] md:text-[10px] text-foreground/50 tracking-wider">
              {currentTime}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
