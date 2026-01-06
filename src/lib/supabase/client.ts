import { createBrowserClient } from '@supabase/ssr';

/**
 * Вывод: Supabase клиент для использования в браузере (Client Components)
 * Использует переменные окружения для конфигурации
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
