import type { WidgetTheme } from '@/types/widget';

/**
 * Тема: Glassmorphism
 *
 * Современный стиль с эффектом "матового стекла".
 * Характеристики:
 * - Полупрозрачный фон
 * - Backdrop blur (размытие фона за виджетом)
 * - Тонкая светлая граница
 * - Мягкие тени
 * - Премиальный вид
 *
 * Подходит для: современных сайтов, дизайн-студий, tech компаний
 */
export const glassmorphismTheme: WidgetTheme = {
  name: 'glassmorphism',
  displayName: 'Glassmorphism',
  description:
    'Современный стиль с эффектом матового стекла и размытием фона',

  // === СВЕТЛАЯ ВЕРСИЯ ===
  light: {
    colors: {
      // Основной цвет: улучшенный полупрозрачный белый с высокой прозрачностью
      // Вдохновлено Apple macOS Big Sur и ui.glass рекомендациями
      primary: 'rgba(255, 255, 255, 0.7)',

      // Текст: тёмный для контраста (WCAG AA)
      text: '#1f2937',

      // Фон (не используется, т.к. прозрачный)
      background: 'transparent',

      // Акцент: насыщенный индиго для hover (Apple-style)
      accent: 'rgba(99, 102, 241, 0.2)',

      // Граница: белая с более высокой непрозрачностью для чёткости
      border: 'rgba(255, 255, 255, 0.8)',
    },

    shadows: {
      // Многослойная тень для глубины (Apple-style depth)
      // Комбинируем мягкую тень + цветовой glow
      primary:
        '0 8px 32px 0 rgba(31, 38, 135, 0.15), 0 2px 8px 0 rgba(31, 38, 135, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)',

      // Усиленная тень при hover с glow эффектом
      hover:
        '0 16px 48px 0 rgba(31, 38, 135, 0.25), 0 4px 16px 0 rgba(99, 102, 241, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)',
    },

    // Увеличенное размытие для premium эффекта (ui.glass: 10-16px оптимально)
    backdropBlur: '16px',

    // Увеличенная прозрачность для лучшего "стеклянного" эффекта
    backgroundOpacity: 0.7,

    // Граница - тонкая, изящная
    borderWidth: '1px',
    borderStyle: 'solid',

    // Скругления углов для разных форм
    borderRadius: {
      circle: '50%',
      square: '24px', // Увеличили для более мягкого вида
      asymmetric: '30% 70% 70% 30% / 60% 40% 60% 40%',
    },

    // Дополнительные CSS эффекты для glassmorphism
    customCSS: {
      // Лёгкая сатурация для более живого вида
      filter: 'saturate(180%)',
      // Внутренняя подсветка для эффекта стекла
      boxShadow:
        '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
    },
  },

  // === ТЁМНАЯ ВЕРСИЯ ===
  dark: {
    colors: {
      // Основной цвет: глубокий полупрозрачный с тёплым оттенком
      // Вдохновлено Apple macOS тёмной темой
      primary: 'rgba(30, 30, 46, 0.75)',

      // Текст: чистый белый для максимального контраста
      text: '#ffffff',

      // Фон
      background: 'transparent',

      // Акцент: яркий фиолетовый с glow эффектом
      accent: 'rgba(167, 139, 250, 0.3)',

      // Граница: светлая с лёгким glow
      border: 'rgba(255, 255, 255, 0.25)',
    },

    shadows: {
      // Многослойная глубокая тень + внутренняя подсветка
      // Создаёт эффект "светящегося стекла" в темноте
      primary:
        '0 8px 32px 0 rgba(0, 0, 0, 0.5), 0 2px 8px 0 rgba(0, 0, 0, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',

      // Усиленная тень с цветовым glow при hover
      hover:
        '0 16px 48px 0 rgba(0, 0, 0, 0.6), 0 4px 16px 0 rgba(167, 139, 250, 0.3), inset 0 1px 2px 0 rgba(255, 255, 255, 0.15)',
    },

    // Максимальное размытие для тёмной темы (premium эффект)
    backdropBlur: '20px',

    // Высокая непрозрачность для лучшей читаемости на тёмных фонах
    backgroundOpacity: 0.75,

    borderWidth: '1px',
    borderStyle: 'solid',

    borderRadius: {
      circle: '50%',
      square: '24px', // Увеличили для единообразия
      asymmetric: '30% 70% 70% 30% / 60% 40% 60% 40%',
    },

    // Дополнительные эффекты для тёмной темы
    customCSS: {
      // Увеличенная сатурация для компенсации тёмного фона
      filter: 'saturate(200%) brightness(1.1)',
      // Внутренний glow для эффекта "светящегося стекла"
      boxShadow:
        '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 2px 4px 0 rgba(255, 255, 255, 0.05)',
    },
  },

  // Preview скриншоты (будут добавлены позже)
  preview: {
    light: '/themes/glassmorphism-light.png',
    dark: '/themes/glassmorphism-dark.png',
  },
};
