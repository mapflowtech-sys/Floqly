/**
 * Утилиты для работы с темами виджетов
 *
 * Вывод: Помогают применять темы к компонентам, генерировать CSS и обрабатывать кастомизацию
 */

import type {
  WidgetTheme,
  ThemeVariant,
  WidgetColors,
  ThemeName,
  ThemeMode,
  WidgetShape,
} from '@/types/widget';
import { getThemeVariant } from '@/components/widgets/themes';
import { getDevicePerformance, supportsBackdropFilter } from './deviceDetection';

/**
 * Получить CSS стили для виджета на основе темы
 *
 * @param themeName - Название темы
 * @param mode - Режим (light/dark)
 * @param shape - Форма виджета
 * @param customColors - Кастомные цвета (переопределяют тему)
 * @returns CSS объект для React inline styles
 */
export function getWidgetStyles(
  themeName: ThemeName,
  mode: ThemeMode,
  shape: WidgetShape,
  customColors?: Partial<WidgetColors>
): React.CSSProperties {
  // Определяем режим (auto = системная тема)
  const actualMode = mode === 'auto' ? getSystemThemeMode() : mode;

  // Получаем вариант темы
  const themeVariant = getThemeVariant(themeName, actualMode);

  // Объединяем цвета темы с кастомными
  const colors = {
    ...themeVariant.colors,
    ...customColors,
  };

  // Базовые стили
  const styles: React.CSSProperties = {
    backgroundColor: colors.primary,
    color: colors.text,
    borderRadius: themeVariant.borderRadius?.[shape] || '50%',
    borderWidth: themeVariant.borderWidth || '0px',
    borderStyle: themeVariant.borderStyle || 'none',
    borderColor: colors.border || 'transparent',
    boxShadow: themeVariant.shadows.primary,
    transition: 'all 0.3s ease-out',
  };

  // Backdrop blur (только если поддерживается и производительность позволяет)
  if (themeVariant.backdropBlur && shouldUseBackdropBlur()) {
    styles.backdropFilter = `blur(${themeVariant.backdropBlur})`;
    styles.WebkitBackdropFilter = `blur(${themeVariant.backdropBlur})`;
  }

  // Градиент (для Liquid Glass)
  if (themeVariant.gradient) {
    const { type, colors: gradientColors, angle } = themeVariant.gradient;

    if (type === 'linear') {
      styles.background = `linear-gradient(${angle || 135}deg, ${gradientColors.join(', ')})`;
    } else if (type === 'radial') {
      styles.background = `radial-gradient(circle, ${gradientColors.join(', ')})`;
    }
  }

  // Кастомные CSS свойства
  if (themeVariant.customCSS) {
    Object.assign(styles, themeVariant.customCSS);
  }

  return styles;
}

/**
 * Получить системную тему (light/dark)
 */
export function getSystemThemeMode(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Проверить, нужно ли использовать backdrop-filter
 * Вывод: На слабых устройствах отключаем для performance
 */
function shouldUseBackdropBlur(): boolean {
  // Проверяем поддержку
  if (!supportsBackdropFilter()) return false;

  // На слабых устройствах отключаем (тяжёлый эффект)
  const performance = getDevicePerformance();
  if (performance === 'low') return false;

  return true;
}

/**
 * Получить hover стили для виджета
 */
export function getWidgetHoverStyles(
  themeName: ThemeName,
  mode: ThemeMode
): React.CSSProperties {
  const actualMode = mode === 'auto' ? getSystemThemeMode() : mode;
  const themeVariant = getThemeVariant(themeName, actualMode);

  return {
    boxShadow: themeVariant.shadows.hover || themeVariant.shadows.primary,
    transform: 'scale(1.05)',
  };
}

/**
 * Генерировать CSS класс для темы
 * Вывод: Используется для глобальных стилей и анимаций
 */
export function getThemeClassName(themeName: ThemeName, mode: ThemeMode): string {
  const actualMode = mode === 'auto' ? getSystemThemeMode() : mode;
  return `widget-theme-${themeName}-${actualMode}`;
}

/**
 * Проверить, нужна ли тёмная граница для контраста
 * Вывод: Если фон светлый, добавляем тёмную тень для visibility
 */
export function needsDarkBorder(backgroundColor: string): boolean {
  // Простая проверка: если фон содержит "255" (белый), нужна тёмная граница
  return backgroundColor.includes('255, 255, 255');
}
