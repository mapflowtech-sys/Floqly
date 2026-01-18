'use client';

/**
 * ThreeDotsIcon - Иконка троеточия для виджета
 *
 * Особенности:
 * - Три круглых точки на равном расстоянии
 * - Адаптируется к любой теме и цвету
 * - Опциональная анимация
 * - Работает в light и dark режимах
 */

import { motion } from 'framer-motion';

interface ThreeDotsIconProps {
  /** Цвет точек (из темы) */
  color: string;

  /** Размер иконки (определяет размер точек) */
  size: number;

  /** Включить анимацию */
  shouldAnimate?: boolean;
}

export function ThreeDotsIcon({
  color,
  size,
  shouldAnimate = true,
}: ThreeDotsIconProps) {
  // Вывод: Размер одной точки = 20% от размера иконки
  const dotSize = size * 0.2;

  // Расстояние между точками = 25% от размера иконки
  const gap = size * 0.25;

  // Subtle анимация пульсации
  const dotVariants = {
    initial: {
      opacity: 1,
      scale: 1,
    },
    animate: (index: number) => ({
      opacity: [1, 0.6, 1],
      scale: [1, 0.9, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: index * 0.15, // Stagger эффект
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: `${gap}px`,
      }}
    >
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          custom={index}
          variants={shouldAnimate ? dotVariants : undefined}
          initial="initial"
          animate={shouldAnimate ? 'animate' : undefined}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            backgroundColor: color,
            // Добавляем небольшую тень для depth
            boxShadow: `0 1px 2px rgba(0, 0, 0, 0.1)`,
          }}
        />
      ))}
    </div>
  );
}

export default ThreeDotsIcon;
