'use client';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 md:px-16 pt-32">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Центральный контент */}
        <div className="flex flex-col items-center text-center">

          {/* Виджет/Сфера с рукописной надписью */}
          <div className="relative mb-12 md:mb-16">
            {/* Рукописная надпись слева и выше виджета - точно как на референсе */}
            <div className="absolute -left-32 md:-left-40 lg:-left-48 top-0 md:top-4 hidden lg:block">
              <p className="font-handwriting text-xl md:text-2xl text-foreground/50 -rotate-[8deg] whitespace-nowrap">
                Логика подождёт
              </p>
            </div>

            {/* Виджет - размер как помидор на референсе */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-foreground/10 to-foreground/18 shadow-[0_25px_70px_rgba(0,0,0,0.12)]" />
              {/* Лёгкая подсветка для объёма */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 to-transparent" />
            </div>
          </div>

          {/* Заголовок - крупный serif как на референсе */}
          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-light leading-[0.95] tracking-[-0.01em] mb-8 md:mb-10 max-w-5xl">
            Виджет, который знает, чего хочет клиент.
          </h1>

          {/* Маленький текст внизу - моноширинный, узкий */}
          <p className="font-mono text-[10px] md:text-[11px] text-foreground/50 max-w-2xl leading-relaxed tracking-wide">
            Floqly анализирует поведение посетителей и вступает в диалог в нужный момент.
            Превращайте интерес в продажи автоматически.
          </p>
        </div>
      </div>

      {/* Чёрная круглая кнопка справа внизу */}
      <div className="fixed bottom-12 right-12 md:bottom-16 md:right-16">
        <button className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-foreground flex items-center justify-center hover:scale-[0.98] transition-transform duration-200">
          <svg
            width="24"
            height="24"
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
