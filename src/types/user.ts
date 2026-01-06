import type { ID, Timestamp } from './index';

/**
 * Вывод: типы для пользователей и подписок
 */

export interface User {
  id: ID;
  email: string;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface UserProfile extends User {
  full_name?: string;
  company_name?: string;
  website_url?: string;
  phone?: string;
}

export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';

export interface Subscription {
  id: ID;
  user_id: ID;
  status: SubscriptionStatus;
  trial_ends_at: Timestamp;
  current_period_end?: Timestamp;
  created_at: Timestamp;
  updated_at: Timestamp;
}
