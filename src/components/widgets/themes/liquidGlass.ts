import type { WidgetTheme } from '@/types/widget';

/**
 * Тема: Liquid Glass
 *
 * Эффект жидкого стекла с плавными градиентами.
 * Характеристики:
 * - Плавные цветовые переходы (градиенты)
 * - Полупрозрачность + размытие
 * - Текучие органические формы
 * - Яркие насыщенные цвета
 * - Динамичный премиальный вид
 *
 * Подходит для: креативных агентств, современных стартапов, смелых брендов
 */
export const liquidGlassTheme: WidgetTheme = {
  name: 'liquidGlass',
  displayName: 'Liquid Glass',
  description:
    'Эффект жидкого стекла с плавными градиентами и органическими формами',

  // === СВЕТЛАЯ ВЕРСИЯ ===
  light: {
    colors: {
      // Основной цвет: будет перекрыт градиентом
      primary: 'rgba(255, 255, 255, 0.2)',

      // Текст: тёмный
      text: '#1f2937',

      // Фон
      background: 'transparent',

      // Акцент: яркий фиолетовый
      accent: '#8b5cf6',

      // Граница: радужная (будет задана через градиент)
      border: 'rgba(255, 255, 255, 0.3)',
    },

    shadows: {
      // Яркая цветная тень
      primary: '0 8px 32px rgba(139, 92, 246, 0.2)',

      // Hover: более интенсивная
      hover: '0 12px 48px rgba(139, 92, 246, 0.3)',
    },

    // Сильное размытие для liquid эффекта
    backdropBlur: '20px',

    backgroundOpacity: 0.2,

    borderWidth: '1.5px',
    borderStyle: 'solid',

    borderRadius: {
      circle: '50%',
      square: '28px', // Очень округлые углы
      asymmetric: '45% 55% 60% 40% / 55% 45% 55% 45%', // Более органическая форма
    },

    // Градиент - ключевая особенность liquid glass
    gradient: {
      type: 'linear',
      angle: 135, // Диагональ
      colors: [
        'rgba(99, 102, 241, 0.3)',  // Индиго
        'rgba(139, 92, 246, 0.3)',  // Фиолетовый
        'rgba(236, 72, 153, 0.3)',  // Розовый
      ],
    },

    // Кастомные CSS свойства для анимированных бликов
    customCSS: {
      '--liquid-glow': '0 0 40px rgba(139, 92, 246, 0.4)',
      '--liquid-animation': 'liquid-shimmer 8s ease-in-out infinite',
    },
  },

  // === ТЁМНАЯ ВЕРСИЯ ===
  dark: {
    colors: {
      primary: 'rgba(17, 24, 39, 0.3)',
      text: '#f9fafb',
      background: 'transparent',
      accent: '#a78bfa',
      border: 'rgba(139, 92, 246, 0.4)',
    },

    shadows: {
      // Более яркая тень для тёмного фона
      primary: '0 8px 32px rgba(139, 92, 246, 0.4)',
      hover: '0 12px 48px rgba(139, 92, 246, 0.5)',
    },

    backdropBlur: '24px',
    backgroundOpacity: 0.3,
    borderWidth: '1.5px',
    borderStyle: 'solid',

    borderRadius: {
      circle: '50%',
      square: '28px',
      asymmetric: '45% 55% 60% 40% / 55% 45% 55% 45%',
    },

    // Более яркий градиент для тёмной темы
    gradient: {
      type: 'linear',
      angle: 135,
      colors: [
        'rgba(99, 102, 241, 0.4)',   // Индиго
        'rgba(139, 92, 246, 0.4)',   // Фиолетовый
        'rgba(236, 72, 153, 0.4)',   // Розовый
        'rgba(251, 146, 60, 0.3)',   // Оранжевый акцент
      ],
    },

    customCSS: {
      '--liquid-glow': '0 0 60px rgba(139, 92, 246, 0.6)',
      '--liquid-animation': 'liquid-shimmer 8s ease-in-out infinite',
    },
  },

  preview: {
    light: '/themes/liquid-glass-light.png',
    dark: '/themes/liquid-glass-dark.png',
  },
};

/**
 * CSS Keyframes для анимации бликов (используется в customCSS)
 *
 * Вывод: добавить в глобальные стили:
 *
 * @keyframes liquid-shimmer {
 *   0%, 100% {
 *     background-position: 0% 50%;
 *   }
 *   50% {
 *     background-position: 100% 50%;
 *   }
 * }
 */
