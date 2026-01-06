'use client';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 md:px-16 pt-24">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Центральный контент */}
        <div className="flex flex-col items-center text-center">

          {/* Виджет/Сфера с рукописной надписью */}
          <div className="relative mb-8 md:mb-12">
            {/* Рукописная надпись слева */}
            <div className="absolute -left-20 md:-left-28 top-8 md:top-12 hidden lg:block">
              <p className="font-handwriting text-lg md:text-xl text-foreground/60 -rotate-[15deg]">
                Логика
                <br />
                подождёт
              </p>
            </div>

            {/* Сфера - увеличенная и более заметная */}
            <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-foreground/12 to-foreground/20 shadow-[0_20px_60px_rgba(0,0,0,0.15)]" />
              {/* Лёгкая подсветка сверху для объёма */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
            </div>
          </div>

          {/* Заголовок - уменьшенный размер, меньше tracking */}
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-light leading-[0.92] tracking-[-0.02em] mb-6 md:mb-8">
            Виджет, который
            <br />
            знает, чего хочет
            <br />
            клиент.
          </h1>

          {/* Маленький текст внизу - ближе к заголовку */}
          <p className="font-mono text-[11px] md:text-xs text-foreground/60 max-w-lg leading-relaxed">
            Floqly анализирует поведение посетителей и вступает в диалог
            в нужный момент. Превращайте интерес в продажи автоматически.
          </p>
        </div>
      </div>

      {/* Иконка в правом нижнем углу */}
      <div className="fixed bottom-8 right-8 md:bottom-12 md:right-12">
        <button className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-foreground flex items-center justify-center hover:opacity-90 transition-opacity">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-background"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
