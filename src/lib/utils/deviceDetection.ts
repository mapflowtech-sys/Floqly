/**
 * Утилиты для определения типа устройства и его возможностей
 *
 * Вывод: Используется для адаптации виджета под мобильные устройства
 */

import { MOBILE_BREAKPOINT } from '@/types/widget';

/**
 * Проверить, является ли устройство мобильным
 * На основе ширины экрана
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
}

/**
 * Проверить, является ли устройство планшетом
 */
export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  const width = window.innerWidth;
  return width >= MOBILE_BREAKPOINT && width < 1024;
}

/**
 * Проверить, является ли устройство desktop
 */
export function isDesktop(): boolean {
  if (typeof window === 'undefined') return true; // SSR по умолчанию desktop
  return window.innerWidth >= 1024;
}

/**
 * Проверить, поддерживает ли браузер backdrop-filter
 * Вывод: На старых устройствах blur может тормозить
 */
export function supportsBackdropFilter(): boolean {
  if (typeof window === 'undefined') return false;

  // Проверяем поддержку CSS свойства
  return (
    CSS.supports('backdrop-filter', 'blur(10px)') ||
    CSS.supports('-webkit-backdrop-filter', 'blur(10px)')
  );
}

/**
 * Определить производительность устройства
 * Возвращает: 'high' | 'medium' | 'low'
 */
export function getDevicePerformance(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined') return 'high';

  // Количество ядер процессора
  const cores = navigator.hardwareConcurrency || 2;

  // Объём памяти (если доступно)
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

  // Низкая производительность: <4 ядер или <4GB RAM
  if (cores < 4 || (memory && memory < 4)) {
    return 'low';
  }

  // Средняя: 4-6 ядер
  if (cores <= 6) {
    return 'medium';
  }

  // Высокая: >6 ядер
  return 'high';
}

/**
 * Проверить, включён ли режим "уменьшить движение" в системе
 * Вывод: Для accessibility - отключаем сложные анимации
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Определить, является ли устройство touch-устройством
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;

  const msMaxTouchPoints = (navigator as Navigator & { msMaxTouchPoints?: number }).msMaxTouchPoints;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (msMaxTouchPoints !== undefined && msMaxTouchPoints > 0)
  );
}

/**
 * Проверить, iOS Safari
 * Вывод: iOS Safari имеет специфичные баги с позиционированием
 */
export function isIOSSafari(): boolean {
  if (typeof window === 'undefined') return false;

  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  const isSafari = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS/.test(ua);

  return isIOS && isSafari;
}

/**
 * Получить высоту viewport с учётом клавиатуры (для мобильных)
 * Вывод: На мобильных когда открывается клавиатура, нужно корректно позиционировать виджет
 */
export function getVisualViewportHeight(): number {
  if (typeof window === 'undefined') return 0;

  // Visual Viewport API (поддерживается в современных браузерах)
  if (window.visualViewport) {
    return window.visualViewport.height;
  }

  // Fallback
  return window.innerHeight;
}

/**
 * Хук React для определения типа устройства
 * Обновляется при изменении размера окна
 */
export function useDeviceType() {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isTouchDevice: false,
    };
  }

  // Вывод: В компоненте использовать с useState и useEffect
  // для реактивности при изменении размера окна
  return {
    isMobile: isMobile(),
    isTablet: isTablet(),
    isDesktop: isDesktop(),
    isTouchDevice: isTouchDevice(),
  };
}
