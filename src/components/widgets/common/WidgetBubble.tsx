'use client';

/**
 * WidgetBubble - Основной компонент виджета (bubble/кнопка)
 *
 * Поддерживает:
 * - 3 формы: круг, квадрат, ассиметрия
 * - 3 размера: small, medium, large
 * - Все темы: glassmorphism, neomorphism, liquidGlass
 * - Полная адаптивность для мобильных
 * - Анимации с Framer Motion
 * - Accessibility
 */

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type {
  WidgetShape,
  WidgetSize,
  ThemeName,
  ThemeMode,
  EntranceAnimation,
  AnimationSpeed,
  WidgetColors,
  WidgetDimensions,
} from '@/types/widget';
import {
  WIDGET_DIMENSIONS,
  WIDGET_DIMENSIONS_MOBILE,
  MOBILE_BREAKPOINT,
} from '@/types/widget';
import { getWidgetStyles, getThemeClassName } from '@/lib/utils/themeHelpers';
import {
  getEntranceVariants,
  subtlePulseVariants,
  hoverVariants,
} from '@/lib/animations/widgetVariants';
import { isMobile, isTouchDevice } from '@/lib/utils/deviceDetection';
import { ThreeDotsIcon } from './ThreeDotsIcon';

// ============================================================================
// ТИПЫ PROPS
// ============================================================================

export interface WidgetBubbleProps {
  /** Тема оформления */
  theme: ThemeName;

  /** Режим темы (light/dark/auto) */
  themeMode?: ThemeMode;

  /** Форма виджета */
  shape?: WidgetShape;

  /** Размер виджета */
  size?: WidgetSize;

  /** Анимация появления */
  entranceAnimation?: EntranceAnimation;

  /** Скорость анимаций */
  animationSpeed?: AnimationSpeed;

  /** Включить пульсацию */
  enablePulse?: boolean;

  /** Кастомные цвета (переопределяют тему) */
  customColors?: Partial<WidgetColors>;

  /** Кастомная иконка внутри виджета (по умолчанию троеточие) */
  icon?: React.ReactNode;

  /** Обработчик клика */
  onClick?: () => void;

  /** CSS класс */
  className?: string;

  /** Aria label для accessibility */
  ariaLabel?: string;

  /** Disabled состояние */
  disabled?: boolean;
}

// ============================================================================
// КОМПОНЕНТ
// ============================================================================

export function WidgetBubble({
  theme,
  themeMode = 'light',
  shape = 'circle',
  size = 'medium',
  entranceAnimation = 'scale',
  animationSpeed = 'medium',
  enablePulse = false,
  customColors,
  icon,
  onClick,
  className = '',
  ariaLabel = 'Открыть чат',
  disabled = false,
}: WidgetBubbleProps) {
  // === STATE ===
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Reduce motion для accessibility
  const shouldReduceMotion = useReducedMotion();

  // === EFFECTS ===

  // Определяем тип устройства при монтировании
  useEffect(() => {
    setIsMobileDevice(isMobile());
    setIsTouch(isTouchDevice());

    // Обновляем при resize
    const handleResize = () => {
      setIsMobileDevice(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // === ВЫЧИСЛЕНИЯ ===

  // Получаем размеры виджета (desktop или mobile)
  const dimensions: WidgetDimensions = isMobileDevice
    ? WIDGET_DIMENSIONS_MOBILE[size]
    : WIDGET_DIMENSIONS[size];

  // Получаем стили темы
  const themeStyles = getWidgetStyles(theme, themeMode, shape, customColors);

  // CSS класс темы
  const themeClass = getThemeClassName(theme, themeMode);

  // Варианты анимации появления
  const entranceVariant = shouldReduceMotion
    ? undefined
    : getEntranceVariants(entranceAnimation, animationSpeed);

  // === RENDER ===

  return (
    <motion.button
      // Framer Motion
      initial="initial"
      animate={enablePulse ? 'pulse' : 'animate'}
      exit="exit"
      variants={entranceVariant}
      whileHover={!isTouch && !disabled ? 'hover' : undefined}
      whileTap={isTouch && !disabled ? 'tap' : undefined}
      // Styles
      style={{
        ...themeStyles,
        width: dimensions.width,
        height: dimensions.height,
        // Позиционирование
        position: 'relative',
        // Flexbox для центрирования иконки
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Убираем стандартные стили кнопки
        border: 'none',
        outline: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        // Opacity для disabled
        opacity: disabled ? 0.5 : 1,
        // User select
        userSelect: 'none',
        WebkitUserSelect: 'none',
        // Touch action для мобильных
        touchAction: 'manipulation',
      }}
      // HTML атрибуты
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${themeClass} ${className}`}
      // Touch targets на мобильных (минимум 44x44px)
      data-touch-target={isTouch}
    >
      {/* Троеточие или кастомная иконка */}
      {icon ? (
        <motion.div
          style={{
            fontSize: dimensions.iconSize,
            lineHeight: 1,
          }}
          variants={!shouldReduceMotion ? hoverVariants : undefined}
        >
          {icon}
        </motion.div>
      ) : (
        <ThreeDotsIcon
          color={themeStyles.color as string}
          size={dimensions.iconSize}
          shouldAnimate={!shouldReduceMotion}
        />
      )}

      {/* Pulse анимация (отдельный слой для эффекта) */}
      {enablePulse && !shouldReduceMotion && (
        <motion.div
          variants={subtlePulseVariants}
          initial="initial"
          animate="pulse"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            border: `2px solid ${customColors?.accent || themeStyles.borderColor}`,
            opacity: 0.5,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Focus ring для keyboard navigation */}
      <style jsx>{`
        button:focus-visible {
          outline: 2px solid ${customColors?.accent || '#6366f1'};
          outline-offset: 4px;
        }
      `}</style>
    </motion.button>
  );
}

// ============================================================================
// ВАРИАНТЫ ДЛЯ РАЗНЫХ СЛУЧАЕВ
// ============================================================================

/**
 * Small виджет (компактный)
 */
export function SmallWidgetBubble(
  props: Omit<WidgetBubbleProps, 'size'>
) {
  return <WidgetBubble {...props} size="small" />;
}

/**
 * Medium виджет (стандартный)
 */
export function MediumWidgetBubble(
  props: Omit<WidgetBubbleProps, 'size'>
) {
  return <WidgetBubble {...props} size="medium" />;
}

/**
 * Large виджет (большой)
 */
export function LargeWidgetBubble(
  props: Omit<WidgetBubbleProps, 'size'>
) {
  return <WidgetBubble {...props} size="large" />;
}

// ============================================================================
// ЭКСПОРТ
// ============================================================================

export default WidgetBubble;
