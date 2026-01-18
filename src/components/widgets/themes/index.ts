/**
 * Центральный экспорт всех тем виджетов
 *
 * Этот файл объединяет все темы в одном месте для удобного импорта
 */

import type { WidgetTheme, ThemeName } from '@/types/widget';
import { glassmorphismTheme } from './glassmorphism';
import { neomorphismTheme } from './neomorphism';
import { liquidGlassTheme } from './liquidGlass';

/**
 * Массив всех доступных тем
 *
 * Вывод: Используется в конструкторе виджетов для отображения списка тем
 */
export const allThemes: WidgetTheme[] = [
  glassmorphismTheme,
  neomorphismTheme,
  liquidGlassTheme,
  // custom1 и custom2 будут добавлены позже
];

/**
 * Карта тем (ключ = название темы)
 *
 * Вывод: Используется для быстрого доступа к теме по имени
 *
 * Пример:
 * const theme = themeMap['glassmorphism'];
 */
export const themeMap: Record<ThemeName, WidgetTheme | undefined> = {
  glassmorphism: glassmorphismTheme,
  neomorphism: neomorphismTheme,
  liquidGlass: liquidGlassTheme,
  custom1: undefined, // Будет добавлена позже по референсу
  custom2: undefined, // Будет добавлена позже по референсу
};

/**
 * Получить тему по названию
 *
 * @param themeName - Название темы
 * @returns Объект темы или undefined если не найдена
 */
export function getTheme(themeName: ThemeName): WidgetTheme | undefined {
  return themeMap[themeName];
}

/**
 * Получить вариант темы (light/dark)
 *
 * @param themeName - Название темы
 * @param mode - Режим ('light' | 'dark')
 * @returns Вариант темы
 */
export function getThemeVariant(
  themeName: ThemeName,
  mode: 'light' | 'dark'
) {
  const theme = getTheme(themeName);
  if (!theme) {
    throw new Error(`Theme "${themeName}" not found`);
  }
  return theme[mode];
}

/**
 * Проверить, доступна ли тема
 *
 * @param themeName - Название темы
 * @returns true если тема существует
 */
export function isThemeAvailable(themeName: ThemeName): boolean {
  return themeMap[themeName] !== undefined;
}

/**
 * Экспорт отдельных тем (для прямого импорта если нужно)
 */
export { glassmorphismTheme, neomorphismTheme, liquidGlassTheme };
