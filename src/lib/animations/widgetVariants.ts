/**
 * Framer Motion варианты анимаций для виджетов
 *
 * Вывод: Все анимации премиальные, быстрые и ненавязчивые
 */

import type { Variants } from 'framer-motion';
import type { EntranceAnimation, AnimationSpeed } from '@/types/widget';
import { prefersReducedMotion, isMobile } from '@/lib/utils/deviceDetection';

/**
 * Карта скоростей анимаций (в секундах)
 */
const ANIMATION_DURATIONS: Record<AnimationSpeed, number> = {
  slow: 0.4,
  medium: 0.3,
  fast: 0.2,
};

/**
 * Получить длительность анимации с учётом устройства
 */
function getDuration(speed: AnimationSpeed): number {
  // На мобильных быстрее
  const baseDuration = ANIMATION_DURATIONS[speed];
  return isMobile() ? baseDuration * 0.8 : baseDuration;
}

/**
 * Проверить, нужно ли упрощать анимации
 */
function shouldSimplify(): boolean {
  return prefersReducedMotion() || isMobile();
}

// ============================================================================
// ВАРИАНТЫ ПОЯВЛЕНИЯ ВИДЖЕТА
// ============================================================================

/**
 * Fade (затухание)
 */
export const fadeVariants = (speed: AnimationSpeed = 'medium'): Variants => ({
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: getDuration(speed),
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: getDuration(speed) * 0.7,
      ease: 'easeIn',
    },
  },
});

/**
 * Slide (скольжение снизу-справа)
 */
export const slideVariants = (speed: AnimationSpeed = 'medium'): Variants => ({
  initial: {
    opacity: 0,
    x: 50,
    y: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: getDuration(speed),
      ease: [0.25, 0.46, 0.45, 0.94], // Кастомная cubic-bezier для плавности
    },
  },
  exit: {
    opacity: 0,
    x: 50,
    y: 50,
    transition: {
      duration: getDuration(speed) * 0.7,
      ease: 'easeIn',
    },
  },
});

/**
 * Scale (масштабирование)
 */
export const scaleVariants = (speed: AnimationSpeed = 'medium'): Variants => ({
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: getDuration(speed),
      ease: [0.34, 1.56, 0.64, 1], // Spring-like easing
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: getDuration(speed) * 0.7,
      ease: 'easeIn',
    },
  },
});

/**
 * Bounce (подпрыгивание)
 */
export const bounceVariants = (speed: AnimationSpeed = 'medium'): Variants => {
  // На упрощённых устройствах используем обычный scale
  if (shouldSimplify()) {
    return scaleVariants(speed);
  }

  return {
    initial: {
      opacity: 0,
      scale: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: getDuration(speed) * 1.2,
        ease: [0.68, -0.55, 0.265, 1.55], // Bounce easing
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: getDuration(speed) * 0.7,
        ease: 'easeIn',
      },
    },
  };
};

/**
 * Получить варианты анимации по типу
 */
export function getEntranceVariants(
  type: EntranceAnimation,
  speed: AnimationSpeed = 'medium'
): Variants | undefined {
  if (type === 'none') return undefined;

  switch (type) {
    case 'fade':
      return fadeVariants(speed);
    case 'slide':
      return slideVariants(speed);
    case 'scale':
      return scaleVariants(speed);
    case 'bounce':
      return bounceVariants(speed);
    default:
      return fadeVariants(speed);
  }
}

// ============================================================================
// HOVER И TAP ЭФФЕКТЫ
// ============================================================================

/**
 * Hover эффект для виджета
 */
export const hoverVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

/**
 * Tap эффект (для мобильных)
 */
export const tapVariants: Variants = {
  initial: {
    scale: 1,
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: 'easeInOut',
    },
  },
};

// ============================================================================
// ПУЛЬСАЦИЯ (PULSE)
// ============================================================================

/**
 * Pulse анимация для привлечения внимания
 */
export const pulseVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  pulse: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Subtle pulse (более мягкая пульсация)
 */
export const subtlePulseVariants: Variants = {
  initial: {
    scale: 1,
  },
  pulse: {
    scale: [1, 1.03, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ============================================================================
// РАСКРЫТИЕ МЕНЮ КОНТАКТОВ
// ============================================================================

/**
 * Вертикальное раскрытие (сверху виджета)
 */
export const verticalExpandVariants = (
  index: number,
  speed: AnimationSpeed = 'medium'
): Variants => ({
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: getDuration(speed),
      delay: index * 0.05, // Stagger эффект
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.8,
    transition: {
      duration: getDuration(speed) * 0.7,
      ease: 'easeIn',
    },
  },
});

/**
 * Горизонтальное раскрытие (слева от виджета)
 */
export const horizontalExpandVariants = (
  index: number,
  speed: AnimationSpeed = 'medium'
): Variants => ({
  initial: {
    opacity: 0,
    x: 20,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: getDuration(speed),
      delay: index * 0.05,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: 10,
    scale: 0.8,
    transition: {
      duration: getDuration(speed) * 0.7,
      ease: 'easeIn',
    },
  },
});

/**
 * Радиальное раскрытие (слева и сверху от виджета, 1/4 круга)
 * Вывод: Каждая иконка летит из центра в свою позицию, формируя четверть круга
 * Виджет в правом нижнем углу, иконки раскрываются слева-сверху
 */
export function getRadialPosition(
  index: number,
  total: number,
  radius: number = 100
): { x: number; y: number } {
  // Вывод: Четверть круга от 180° (слева) до 270° (сверху)
  // 180° = -1, 0 (слева), 270° = 0, -1 (сверху)
  const startAngle = Math.PI; // 180° (слева)
  const endAngle = Math.PI * 1.5; // 270° (сверху)

  // Интерполяция угла для каждой иконки
  const angle = startAngle + (index / Math.max(total - 1, 1)) * (endAngle - startAngle);

  return {
    x: Math.cos(angle) * radius, // Отрицательное x = слева
    y: Math.sin(angle) * radius, // Отрицательное y = сверху
  };
}

export const radialExpandVariants = (
  index: number,
  total: number,
  speed: AnimationSpeed = 'medium'
): Variants => {
  const position = getRadialPosition(index, total);

  return {
    initial: {
      opacity: 0,
      x: 0,
      y: 0,
      scale: 0,
    },
    animate: {
      opacity: 1,
      x: position.x,
      y: position.y,
      scale: 1,
      transition: {
        duration: getDuration(speed),
        delay: index * 0.05,
        ease: [0.34, 1.56, 0.64, 1], // Spring easing
      },
    },
    exit: {
      opacity: 0,
      x: 0,
      y: 0,
      scale: 0,
      transition: {
        duration: getDuration(speed) * 0.7,
        ease: 'easeIn',
      },
    },
  };
};

// ============================================================================
// УТИЛИТЫ
// ============================================================================

/**
 * Получить transition настройки для Framer Motion
 */
export function getSpringTransition(speed: AnimationSpeed = 'medium') {
  const duration = getDuration(speed);

  return {
    type: 'spring',
    stiffness: 300,
    damping: 25,
    duration,
  };
}
