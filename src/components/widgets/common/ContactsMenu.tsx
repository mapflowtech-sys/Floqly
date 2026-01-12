'use client';

/**
 * ContactsMenu - Меню контактов для виджета
 *
 * Поддерживает:
 * - 3 варианта раскрытия: top (вертикально сверху), left (горизонтально слева), radial (радиально вокруг)
 * - Все популярные контакты: Telegram, WhatsApp, VK, Email, Phone, Viber, Instagram
 * - Анимации появления с Framer Motion
 * - Адаптивность для мобильных
 * - Темизация
 */

import { motion, AnimatePresence } from 'framer-motion';
import type {
  ContactsExpandDirection,
  ContactInfo,
  AnimationSpeed,
  ThemeName,
  ThemeMode,
  WidgetSize,
} from '@/types/widget';
import {
  verticalExpandVariants,
  horizontalExpandVariants,
  radialExpandVariants,
  getRadialPosition,
} from '@/lib/animations/widgetVariants';
import { WIDGET_DIMENSIONS, WIDGET_DIMENSIONS_MOBILE } from '@/types/widget';
import { isMobile } from '@/lib/utils/deviceDetection';

// ============================================================================
// ТИПЫ
// ============================================================================

export interface ContactsMenuProps {
  /** Список контактов для отображения */
  contacts: ContactInfo[];

  /** Направление раскрытия меню */
  direction?: ContactsExpandDirection;

  /** Открыто ли меню */
  isOpen: boolean;

  /** Скорость анимации */
  animationSpeed?: AnimationSpeed;

  /** Размер иконок */
  size?: WidgetSize;

  /** Тема (для стилизации) */
  theme: ThemeName;

  /** Режим темы */
  themeMode?: ThemeMode;

  /** Обработчик клика на контакт */
  onContactClick?: (contact: ContactInfo) => void;
}

// ============================================================================
// ИКОНКИ КОНТАКТОВ (SVG)
// ============================================================================

// Вывод: Используем простые SVG иконки для контактов
const ContactIcons: Record<
  ContactInfo['type'],
  React.FC<{ size: number; color: string }>
> = {
  telegram: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"
        fill={color}
      />
    </svg>
  ),

  whatsapp: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
        fill={color}
      />
    </svg>
  ),

  vk: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.08 14.2h-1.11c-.56 0-.73-.45-1.74-1.46-.87-.83-1.26-.94-1.48-.94-.3 0-.39.09-.39.52v1.34c0 .36-.11.58-1.07.58-1.59 0-3.35-.97-4.58-2.76-1.85-2.58-2.36-4.51-2.36-4.91 0-.22.09-.42.52-.42h1.11c.39 0 .54.18.69.59.76 2.21 2.04 4.15 2.56 4.15.2 0 .29-.09.29-.59v-2.29c-.06-.99-.58-1.08-.58-1.43 0-.18.15-.36.39-.36h1.75c.33 0 .45.18.45.56v3.08c0 .33.15.45.24.45.2 0 .36-.12.73-.49 1.14-1.28 1.95-3.26 1.95-3.26.11-.22.28-.42.72-.42h1.11c.42 0 .51.21.42.56-.15.78-1.99 3.63-1.99 3.63-.17.27-.23.39 0 .71.17.23.73.71 1.1 1.14.68.78 1.2 1.43 1.34 1.88.13.45-.1.67-.55.67z"
        fill={color}
      />
    </svg>
  ),

  email: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
        fill={color}
      />
    </svg>
  ),

  phone: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        fill={color}
      />
    </svg>
  ),

  viber: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.696 6.7.633 9.817.57 12.933.488 18.776 6.12 20.36h.005l-.004 2.488s-.037.98.61 1.177c.777.237 1.234-.5 1.98-1.302.407-.44.97-1.084 1.397-1.58 3.85.326 6.812-.42 7.15-.53.776-.253 5.176-.816 5.892-6.658.74-6.02-.36-9.83-2.34-11.546-.816-.78-2.87-2.16-6.61-2.26 0 0-.425-.053-1.04-.05-.623-.006-1.71.053-1.71.053zM11.48 2.3h.103c.563 0 .967.053.967.053 3.062.08 4.75 1.215 5.408 1.833 1.582 1.357 2.515 4.678 1.87 9.827-.586 4.693-3.85 5.04-4.532 5.262-.292.095-2.876.743-6.222.49 0 0-2.462 2.977-3.23 3.743-.12.12-.26.167-.352.145-.13-.03-.167-.18-.165-.4l.015-4.083c-4.61-1.3-4.34-6.19-4.28-8.85.057-2.66.58-4.84 2.048-6.308 1.94-1.787 5.52-2.042 7.168-2.064l.202-.002zm-.38 1.93c-.17-.005-.346.02-.523.08-.55.177-.935.729-.934 1.35.002.175.03.35.09.515.45 1.232 1.426 2.528 2.684 3.585.72.604 1.852 1.298 3.03 1.587.456.112.923-.025 1.253-.34.33-.316.486-.787.395-1.243-.092-.457-.43-.838-.86-1.012-.16-.065-.32-.103-.48-.12-.42-.04-.762.23-.988.536-.11.148-.19.31-.25.48-.36-.16-.71-.37-1.03-.63-.63-.53-1.15-1.188-1.49-1.918.14-.08.28-.186.4-.31.257-.266.47-.65.4-1.07-.07-.42-.38-.77-.76-.95-.19-.09-.39-.13-.59-.14z"
        fill={color}
      />
    </svg>
  ),

  instagram: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 011.25 1.25A1.25 1.25 0 0117.25 8 1.25 1.25 0 0116 6.75a1.25 1.25 0 011.25-1.25M12 7a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5m0 2a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3z"
        fill={color}
      />
    </svg>
  ),
};

// ============================================================================
// КОМПОНЕНТ ОДНОГО КОНТАКТА
// ============================================================================

interface ContactButtonProps {
  contact: ContactInfo;
  index: number;
  direction: ContactsExpandDirection;
  animationSpeed: AnimationSpeed;
  size: number;
  iconColor: string;
  backgroundColor: string;
  onClick?: (contact: ContactInfo) => void;
}

function ContactButton({
  contact,
  index,
  direction,
  animationSpeed,
  size,
  iconColor,
  backgroundColor,
  onClick,
}: ContactButtonProps) {
  const IconComponent = ContactIcons[contact.type];

  // Выбираем варианты анимации в зависимости от direction
  const variants =
    direction === 'top'
      ? verticalExpandVariants(index, animationSpeed)
      : direction === 'left'
        ? horizontalExpandVariants(index, animationSpeed)
        : undefined; // Для radial используем отдельную логику

  return (
    <motion.button
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => {
        e.stopPropagation(); // Вывод: Предотвращаем всплытие клика к виджету
        onClick?.(contact);
      }}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor,
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        position: 'relative',
      }}
      aria-label={`${contact.type}: ${contact.value}`}
    >
      <IconComponent size={size * 0.6} color={iconColor} />
    </motion.button>
  );
}

// ============================================================================
// ОСНОВНОЙ КОМПОНЕНТ
// ============================================================================

export function ContactsMenu({
  contacts,
  direction = 'top',
  isOpen,
  animationSpeed = 'medium',
  size = 'medium',
  theme,
  themeMode = 'light',
  onContactClick,
}: ContactsMenuProps) {
  // Определяем размеры
  const isMobileDevice = typeof window !== 'undefined' && isMobile();
  const dimensions = isMobileDevice
    ? WIDGET_DIMENSIONS_MOBILE[size]
    : WIDGET_DIMENSIONS[size];

  // Размер кнопки контакта = 85% от размера виджета
  const contactSize = dimensions.width * 0.85;

  // Цвета (можно расширить для кастомизации)
  const iconColor = themeMode === 'dark' ? '#ffffff' : '#1f2937';
  const backgroundColor = themeMode === 'dark' ? '#374151' : '#ffffff';

  // Вывод: Для радиального раскрытия используем отдельную логику
  if (direction === 'radial') {
    return (
      <AnimatePresence>
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'none', // Вывод: Контейнер не блокирует клики
            }}
          >
            {contacts.map((contact, index) => {
              const IconComponent = ContactIcons[contact.type];
              const { x, y } = getRadialPosition(index, contacts.length, 100);

              return (
                <motion.button
                  key={`${contact.type}-${index}`}
                  initial={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    x: x,
                    y: y,
                    scale: 1,
                    transition: {
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.34, 1.56, 0.64, 1],
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    scale: 0,
                    transition: {
                      duration: 0.2,
                      ease: 'easeIn',
                    },
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onContactClick?.(contact);
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: contactSize,
                    height: contactSize,
                    borderRadius: '50%',
                    backgroundColor,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    pointerEvents: 'auto', // Вывод: Кнопки принимают клики
                  }}
                  aria-label={`${contact.type}: ${contact.value}`}
                >
                  <IconComponent size={contactSize * 0.6} color={iconColor} />
                </motion.button>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    );
  }

  // Вывод: Контейнер для top/left направлений
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    gap: '12px',
    pointerEvents: 'none', // Контейнер не блокирует клики
    ...(direction === 'top' && {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      flexDirection: 'column-reverse',
      marginBottom: '12px',
    }),
    ...(direction === 'left' && {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      flexDirection: 'row-reverse',
      marginRight: '12px',
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={containerStyle}>
          {contacts.map((contact, index) => (
            <div key={`${contact.type}-${index}`} style={{ pointerEvents: 'auto' }}>
              <ContactButton
                contact={contact}
                index={index}
                direction={direction}
                animationSpeed={animationSpeed}
                size={contactSize}
                iconColor={iconColor}
                backgroundColor={backgroundColor}
                onClick={onContactClick}
              />
            </div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

export default ContactsMenu;
