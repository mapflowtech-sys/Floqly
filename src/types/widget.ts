import type { ID, Timestamp } from './index';

/**
 * Вывод: типы для виджета и его конфигурации
 */

export type ThemeId = 'theme1' | 'theme2' | 'theme3';
export type WidgetPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
export type WidgetBehaviorMode = 'scroll-triggered' | 'static' | 'event-driven' | 'hybrid';

export interface WidgetTheme {
  id: ThemeId;
  name: string;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  shadow: string;
}

export interface WidgetConfig {
  id: ID;
  user_id: ID;
  widget_name: string;
  theme: ThemeId;
  position: WidgetPosition;
  greeting_text: string;
  primary_color: string;
  behavior_mode: WidgetBehaviorMode;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface DemoWidgetMessage {
  sender: 'bot' | 'user';
  text: string;
  delay: number;
}

export interface DemoWidgetScenario {
  trigger: 'auto-open' | 'manual';
  theme: ThemeId;
  messages: DemoWidgetMessage[];
}
