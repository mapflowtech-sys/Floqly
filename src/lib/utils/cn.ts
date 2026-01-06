import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Вывод: утилита для объединения классов Tailwind с правильным приоритетом
 * Использует clsx для условной логики и twMerge для разрешения конфликтов
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
