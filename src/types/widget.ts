/**
 * Типы для виджетов Floqly
 *
 * Этот файл содержит все TypeScript типы и интерфейсы для работы с виджетами
 */

// ============================================================================
// БАЗОВЫЕ ТИПЫ
// ============================================================================

/** Тип виджета */
export type WidgetType = 'ordinary' | 'smart';

/** Режим темы (светлая/тёмная/авто) */
export type ThemeMode = 'light' | 'dark' | 'auto';

/** Форма виджета */
export type WidgetShape = 'circle' | 'square' | 'asymmetric';

/** Размер виджета */
export type WidgetSize = 'small' | 'medium' | 'large';

/** Горизонтальная позиция */
export type HorizontalPosition = 'left' | 'right';

/** Вертикальная позиция */
export type VerticalPosition = 'top' | 'bottom';

/** Тип анимации появления */
export type EntranceAnimation = 'fade' | 'slide' | 'scale' | 'bounce' | 'none';

/** Скорость анимации */
export type AnimationSpeed = 'slow' | 'medium' | 'fast';

/** Направление раскрытия контактов */
export type ContactsExpandDirection = 'top' | 'left' | 'radial';

/** Стиль проактивного сообщения (для умного виджета) */
export type ProactiveMessageStyle = 'bubble-left' | 'transform' | 'popup';

/** Названия доступных тем */
export type ThemeName =
  | 'glassmorphism'
  | 'neomorphism'
  | 'liquidGlass'
  | 'custom1'
  | 'custom2';

// ============================================================================
// КОНТАКТЫ
// ============================================================================

/** Типы контактов */
export type ContactType =
  | 'telegram'
  | 'whatsapp'
  | 'vk'
  | 'email'
  | 'phone'
  | 'viber'
  | 'instagram';

/** Информация о контакте */
export interface ContactInfo {
  type: ContactType;
  value: string;  // URL или номер телефона
  label?: string; // Опциональная подпись
  enabled: boolean;
}

/** Список контактов (ключ = тип контакта) */
export type ContactsList = Partial<Record<ContactType, string>>;

// ============================================================================
// ЦВЕТА И СТИЛИ
// ============================================================================

/** Цветовая схема виджета */
export interface WidgetColors {
  /** Основной цвет (фон bubble) */
  primary: string;

  /** Цвет текста и иконок */
  text: string;

  /** Цвет фона (для непрозрачных тем) */
  background?: string;

  /** Цвет акцента (для hover, активных состояний) */
  accent?: string;

  /** Цвет границы */
  border?: string;
}

/** Параметры тени */
export interface ShadowConfig {
  /** Основная тень */
  primary: string;

  /** Вторичная тень (для neomorphism) */
  secondary?: string;

  /** Тень при hover */
  hover?: string;
}

// ============================================================================
// ТЕМЫ ВИДЖЕТОВ
// ============================================================================

/**
 * Конфигурация темы виджета
 *
 * Каждая тема определяет визуальный стиль виджета:
 * цвета, тени, размытие, границы и т.д.
 */
export interface WidgetTheme {
  /** Уникальное имя темы */
  name: ThemeName;

  /** Отображаемое название темы */
  displayName: string;

  /** Описание темы */
  description: string;

  /** Версия для светлого режима */
  light: ThemeVariant;

  /** Версия для тёмного режима */
  dark: ThemeVariant;

  /** Предпросмотр (URL скриншота) */
  preview?: {
    light: string;
    dark: string;
  };
}

/**
 * Вариант темы (светлая или тёмная)
 */
export interface ThemeVariant {
  /** Цвета */
  colors: WidgetColors;

  /** Тени */
  shadows: ShadowConfig;

  /** Размытие фона (для glassmorphism) */
  backdropBlur?: string;

  /** Прозрачность фона (0-1) */
  backgroundOpacity?: number;

  /** Толщина границы */
  borderWidth?: string;

  /** Стиль границы */
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';

  /** Скругление углов */
  borderRadius?: {
    circle: string;
    square: string;
    asymmetric: string;
  };

  /** Градиент (опционально, для liquidGlass) */
  gradient?: {
    type: 'linear' | 'radial';
    colors: string[];
    angle?: number;
  };

  /** Кастомные CSS свойства */
  customCSS?: Record<string, string>;
}

/**
 * Позиция виджета на странице
 */
export interface WidgetPosition {
  /** Горизонтальное позиционирование */
  horizontal: 'left' | 'right';

  /** Вертикальное позиционирование */
  vertical: 'top' | 'bottom';

  /** Отступ по горизонтали (в px) */
  offsetX: number;

  /** Отступ по вертикали (в px) */
  offsetY: number;
}

// ============================================================================
// КОНФИГУРАЦИЯ ВИДЖЕТА
// ============================================================================

/**
 * Полная конфигурация виджета
 *
 * Это объект который сохраняется в БД и содержит все настройки
 */
export interface WidgetConfig {
  /** ID виджета (генерируется автоматически) */
  id?: string;

  /** ID пользователя владельца */
  userId?: string;

  /** Тип виджета */
  widgetType: WidgetType;

  // === Визуальные настройки ===

  /** Название используемой темы */
  theme: ThemeName;

  /** Режим темы */
  themeMode: ThemeMode;

  /** Форма виджета */
  shape: WidgetShape;

  /** Размер виджета */
  size: WidgetSize;

  /** Кастомные цвета (переопределяют цвета темы) */
  customColors?: Partial<WidgetColors>;

  // === Позиционирование ===

  /** Горизонтальная позиция */
  positionHorizontal: HorizontalPosition;

  /** Вертикальная позиция */
  positionVertical: VerticalPosition;

  /** Отступ от края по X (в пикселях) */
  offsetX: number;

  /** Отступ от края по Y (в пикселях) */
  offsetY: number;

  // === Анимации ===

  /** Включены ли анимации */
  animationEnabled: boolean;

  /** Тип анимации появления */
  animationEntrance: EntranceAnimation;

  /** Пульсация bubble */
  animationPulse: boolean;

  /** Скорость анимаций */
  animationSpeed: AnimationSpeed;

  // === Для обычного виджета ===

  /** Направление раскрытия контактов */
  contactsExpandDirection?: ContactsExpandDirection;

  /** Список контактов */
  contacts?: ContactInfo[];

  // === Для умного виджета ===

  /** Стиль проактивного сообщения */
  proactiveMessageStyle?: ProactiveMessageStyle;

  /** Показывать ли обычные контакты в чате */
  showContactsInChat?: boolean;

  /** Текст приветствия (задаётся партнёром через API) */
  greetingText?: string;

  // === Мета-информация ===

  /** Дата создания */
  createdAt?: Date;

  /** Дата обновления */
  updatedAt?: Date;

  /** Активен ли виджет */
  isActive?: boolean;
}

// ============================================================================
// РАЗМЕРЫ ВИДЖЕТОВ
// ============================================================================

/**
 * Размеры виджета в пикселях (зависят от выбранного размера)
 */
export interface WidgetDimensions {
  width: number;
  height: number;
  iconSize: number;
  fontSize: number;
}

/**
 * Карта размеров для разных вариантов
 * Вывод: Desktop размеры, на мобильных автоматически уменьшаются на 8px
 */
export const WIDGET_DIMENSIONS: Record<WidgetSize, WidgetDimensions> = {
  small: {
    width: 56,
    height: 56,
    iconSize: 24,
    fontSize: 14,
  },
  medium: {
    width: 64,
    height: 64,
    iconSize: 28,
    fontSize: 16,
  },
  large: {
    width: 72,
    height: 72,
    iconSize: 32,
    fontSize: 18,
  },
};

/**
 * Мобильные размеры виджета (уменьшены на 8px от desktop)
 */
export const WIDGET_DIMENSIONS_MOBILE: Record<WidgetSize, WidgetDimensions> = {
  small: {
    width: 48,
    height: 48,
    iconSize: 20,
    fontSize: 14,
  },
  medium: {
    width: 56,
    height: 56,
    iconSize: 24,
    fontSize: 16,
  },
  large: {
    width: 64,
    height: 64,
    iconSize: 28,
    fontSize: 18,
  },
};

/**
 * Breakpoint для определения мобильных устройств
 */
export const MOBILE_BREAKPOINT = 768; // px

// ============================================================================
// АНИМАЦИИ (Framer Motion Variants)
// ============================================================================

/**
 * Варианты анимаций для Framer Motion
 */
export interface AnimationVariants {
  initial: Record<string, string | number>;
  animate: Record<string, string | number>;
  exit: Record<string, string | number>;
  hover?: Record<string, string | number>;
  tap?: Record<string, string | number>;
}

// ============================================================================
// EMBED КОД
// ============================================================================

/**
 * Параметры для генерации embed кода
 */
export interface EmbedCodeParams {
  widgetId: string;
  widgetType: WidgetType;
  config?: Partial<WidgetConfig>;
}

/**
 * Сгенерированный embed код
 */
export interface EmbedCode {
  /** HTML код для вставки */
  html: string;

  /** JavaScript код (если нужен отдельно) */
  javascript?: string;

  /** CSS код (если нужен отдельно) */
  css?: string;
}

// ============================================================================
// СОБЫТИЯ ВИДЖЕТА
// ============================================================================

/**
 * События виджета (для аналитики и WebSocket)
 */
export type WidgetEvent =
  | 'widget_loaded'
  | 'widget_opened'
  | 'widget_closed'
  | 'contact_clicked'
  | 'chat_opened'
  | 'message_sent'
  | 'message_received';

/**
 * Данные события
 */
export interface WidgetEventData {
  event: WidgetEvent;
  widgetId: string;
  timestamp: Date;
  data?: Record<string, unknown>;
}

// ============================================================================
// ВАЛИДАЦИЯ
// ============================================================================

/**
 * Результат валидации конфига
 */
export interface ValidationResult {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
}
