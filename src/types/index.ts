/**
 * Вывод: общие TypeScript типы для всего проекта
 * Импортируй конкретные типы из подфайлов по мере необходимости
 */

export type * from './user';
export type * from './widget';

// Общие утилитарные типы
export type ID = string;
export type Timestamp = string;

// API Response типы
export type ApiResponse<T = unknown> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};
