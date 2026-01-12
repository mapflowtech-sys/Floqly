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
      // Основной цвет: полупрозрачный белый
      primary: 'rgba(255, 255, 255, 0.25)',

      // Текст: тёмный для контраста
      text: '#1f2937',

      // Фон (не используется, т.к. прозрачный)
      background: 'transparent',

      // Акцент: лёгкий голубой для hover
      accent: 'rgba(99, 102, 241, 0.1)',

      // Граница: белая полупрозрачная
      border: 'rgba(255, 255, 255, 0.3)',
    },

    shadows: {
      // Основная тень: мягкая, ненавязчивая
      primary: '0 8px 32px rgba(0, 0, 0, 0.1)',

      // Тень при hover: чуть более выраженная
      hover: '0 12px 48px rgba(0, 0, 0, 0.15)',
    },

    // Размытие фона - ключевая особенность glassmorphism
    backdropBlur: '12px',

    // Прозрачность фона
    backgroundOpacity: 0.25,

    // Граница
    borderWidth: '1px',
    borderStyle: 'solid',

    // Скругления углов для разных форм
    borderRadius: {
      circle: '50%',
      square: '20px', // Google Material Design стиль
      asymmetric: '30% 70% 70% 30% / 60% 40% 60% 40%', // Органическая форма
    },
  },

  // === ТЁМНАЯ ВЕРСИЯ ===
  dark: {
    colors: {
      // Основной цвет: полупрозрачный тёмный
      primary: 'rgba(17, 24, 39, 0.4)',

      // Текст: светлый
      text: '#f9fafb',

      // Фон
      background: 'transparent',

      // Акцент: лёгкий фиолетовый
      accent: 'rgba(139, 92, 246, 0.15)',

      // Граница: светлая полупрозрачная
      border: 'rgba(255, 255, 255, 0.15)',
    },

    shadows: {
      // Основная тень: более выраженная чем в светлой теме
      primary: '0 8px 32px rgba(0, 0, 0, 0.4)',

      // Тень при hover
      hover: '0 12px 48px rgba(0, 0, 0, 0.5)',
    },

    // Более сильное размытие для тёмной темы
    backdropBlur: '16px',

    backgroundOpacity: 0.4,

    borderWidth: '1px',
    borderStyle: 'solid',

    borderRadius: {
      circle: '50%',
      square: '20px',
      asymmetric: '30% 70% 70% 30% / 60% 40% 60% 40%',
    },
  },

  // Preview скриншоты (будут добавлены позже)
  preview: {
    light: '/themes/glassmorphism-light.png',
    dark: '/themes/glassmorphism-dark.png',
  },
};
