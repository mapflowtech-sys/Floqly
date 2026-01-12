import type { WidgetTheme } from '@/types/widget';

/**
 * Тема: Neomorphism (Soft UI)
 *
 * Стиль с мягкими объёмными элементами.
 * Характеристики:
 * - Фон почти совпадает с фоном сайта
 * - Двойная тень (светлая + тёмная) для объёма
 * - Выпуклый вид (или вдавленный при нажатии)
 * - Минималистичный и элегантный
 * - Почти плоский, но с глубиной
 *
 * Подходит для: минималистичных сайтов, SaaS продуктов, премиум бренды
 */
export const neomorphismTheme: WidgetTheme = {
  name: 'neomorphism',
  displayName: 'Neomorphism',
  description:
    'Мягкий объёмный стиль с эффектом выпуклости и двойными тенями',

  // === СВЕТЛАЯ ВЕРСИЯ ===
  light: {
    colors: {
      // Основной цвет: светло-серый (близок к фону сайта)
      primary: '#e0e5ec',

      // Текст: мягкий тёмно-серый
      text: '#4a5568',

      // Фон
      background: '#e0e5ec',

      // Акцент: лёгкий фиолетовый
      accent: '#6366f1',

      // Граница: нет (тени создают объём)
      border: 'transparent',
    },

    shadows: {
      // Двойная тень для neomorphism эффекта
      // Светлая тень сверху-слева + тёмная тень снизу-справа
      primary: `
        9px 9px 16px rgba(163, 177, 198, 0.6),
        -9px -9px 16px rgba(255, 255, 255, 0.5)
      `,

      // Вторичная тень (для вдавленного состояния)
      secondary: `
        inset 4px 4px 8px rgba(163, 177, 198, 0.5),
        inset -4px -4px 8px rgba(255, 255, 255, 0.5)
      `,

      // Hover: более выраженные тени
      hover: `
        12px 12px 20px rgba(163, 177, 198, 0.7),
        -12px -12px 20px rgba(255, 255, 255, 0.6)
      `,
    },

    // Нет backdrop blur
    backdropBlur: undefined,

    // Непрозрачный фон
    backgroundOpacity: 1,

    // Нет границы
    borderWidth: '0px',
    borderStyle: 'none',

    // Мягкие скругления
    borderRadius: {
      circle: '50%',
      square: '24px', // Более округлые чем glassmorphism
      asymmetric: '40% 60% 60% 40% / 60% 40% 60% 40%',
    },
  },

  // === ТЁМНАЯ ВЕРСИЯ ===
  dark: {
    colors: {
      // Основной цвет: тёмно-серый
      primary: '#2d3748',

      // Текст: светлый
      text: '#e2e8f0',

      // Фон
      background: '#2d3748',

      // Акцент
      accent: '#8b5cf6',

      // Граница: нет
      border: 'transparent',
    },

    shadows: {
      // Двойная тень для тёмной темы
      primary: `
        9px 9px 16px rgba(0, 0, 0, 0.4),
        -9px -9px 16px rgba(55, 65, 81, 0.3)
      `,

      // Вдавленное состояние
      secondary: `
        inset 4px 4px 8px rgba(0, 0, 0, 0.5),
        inset -4px -4px 8px rgba(55, 65, 81, 0.4)
      `,

      // Hover
      hover: `
        12px 12px 20px rgba(0, 0, 0, 0.5),
        -12px -12px 20px rgba(55, 65, 81, 0.4)
      `,
    },

    backdropBlur: undefined,
    backgroundOpacity: 1,
    borderWidth: '0px',
    borderStyle: 'none',

    borderRadius: {
      circle: '50%',
      square: '24px',
      asymmetric: '40% 60% 60% 40% / 60% 40% 60% 40%',
    },
  },

  preview: {
    light: '/themes/neomorphism-light.png',
    dark: '/themes/neomorphism-dark.png',
  },
};
