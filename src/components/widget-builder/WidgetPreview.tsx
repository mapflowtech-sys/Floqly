'use client';

/**
 * WidgetPreview - Панель предпросмотра виджета
 *
 * Показывает:
 * - Симуляцию сайта клиента
 * - Виджет в выбранной позиции
 * - Интерактивное поведение (клик, раскрытие контактов)
 */

import { useState } from 'react';
import WidgetBubble from '@/components/widgets/common/WidgetBubble';
import ContactsMenu from '@/components/widgets/common/ContactsMenu';
import type {
  ThemeName,
  ThemeMode,
  WidgetShape,
  WidgetSize,
  WidgetPosition,
  ContactInfo,
  ContactsExpandDirection,
  EntranceAnimation,
  AnimationSpeed,
} from '@/types/widget';

interface WidgetPreviewProps {
  theme: ThemeName;
  themeMode: ThemeMode;
  shape: WidgetShape;
  size: WidgetSize;
  position: WidgetPosition;
  customColors: {
    primary?: string;
    text?: string;
    background?: string;
  };
  animationEnabled: boolean;
  animationEntrance: EntranceAnimation;
  animationSpeed: AnimationSpeed;
  enablePulse: boolean;
  contactsExpandDirection: ContactsExpandDirection;
  contacts: ContactInfo[];
}

export default function WidgetPreview({
  theme,
  themeMode,
  shape,
  size,
  position,
  customColors,
  animationEnabled,
  animationEntrance,
  animationSpeed,
  enablePulse,
  contactsExpandDirection,
  contacts,
}: WidgetPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Определяем позиционирование виджета
  const positionStyles: React.CSSProperties = {
    position: 'absolute',
    ...(position.horizontal === 'left'
      ? { left: `${position.offsetX}px` }
      : { right: `${position.offsetX}px` }),
    ...(position.vertical === 'top'
      ? { top: `${position.offsetY}px` }
      : { bottom: `${position.offsetY}px` }),
  };

  const [showFullscreen, setShowFullscreen] = useState(false);

  return (
    <>
      <div className="sticky top-32">
        {/* Заголовок */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="font-mono text-xs tracking-wider text-foreground/70 mb-2">
              ПРЕДПРОСМОТР
            </h2>
            <p className="font-mono text-[10px] text-foreground/50 leading-relaxed">
              Так виджет будет выглядеть на вашем сайте
            </p>
          </div>

          {/* Кнопка полноэкранного просмотра */}
          <button
            onClick={() => setShowFullscreen(true)}
            className="px-4 py-2 bg-foreground text-background rounded hover:opacity-90 transition-opacity"
          >
            <span className="font-mono text-[10px] tracking-wider">Полный экран</span>
          </button>
        </div>

        {/* Preview контейнер - УМЕНЬШЕННЫЙ */}
        <div className="relative w-full bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg overflow-hidden border border-border">
          {/* Симуляция контента сайта */}
          <div className="p-6 md:p-8 min-h-[320px] relative">
          {/* Фейковый контент - МЕНЬШЕ */}
          <div className="space-y-4 opacity-30">
            <div className="h-6 w-32 bg-foreground/20 rounded" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-foreground/10 rounded" />
              <div className="h-3 w-5/6 bg-foreground/10 rounded" />
            </div>
          </div>

          {/* Виджет + Меню контактов */}
          <div style={positionStyles}>
            <div className="relative">
              {/* Bubble виджета */}
              <WidgetBubble
                theme={theme}
                themeMode={themeMode}
                shape={shape}
                size={size}
                customColors={Object.keys(customColors).length > 0 ? customColors : undefined}
                entranceAnimation={animationEnabled ? animationEntrance : 'none'}
                animationSpeed={animationSpeed}
                enablePulse={enablePulse && animationEnabled}
                onClick={() => setIsOpen(!isOpen)}
              />

              {/* Меню контактов */}
              <ContactsMenu
                contacts={contacts}
                isOpen={isOpen}
                direction={contactsExpandDirection}
                theme={theme}
                themeMode={themeMode}
                animationSpeed={animationSpeed}
                onContactClick={(contact) => {
                  // Вывод: В preview только показываем alert, на реальном сайте будет открытие контакта
                  alert(`Контакт: ${contact.type} - ${contact.value}`);
                }}
              />
            </div>
          </div>

          {/* Индикатор позиции (показываем где виджет) */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute w-2 h-2 rounded-full bg-foreground/20"
              style={{
                ...(position.horizontal === 'left'
                  ? { left: `${position.offsetX}px` }
                  : { right: `${position.offsetX}px` }),
                ...(position.vertical === 'top'
                  ? { top: `${position.offsetY}px` }
                  : { bottom: `${position.offsetY}px` }),
              }}
            />
          </div>
        </div>

        {/* Подсказка */}
        <div className="border-t border-border p-3 bg-background/80 backdrop-blur-sm">
          <p className="font-mono text-[10px] text-foreground/50 text-center">
            Кликните на виджет чтобы увидеть раскрытие контактов
          </p>
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border">
        <p className="font-mono text-[10px] text-foreground/70 leading-relaxed">
          <span className="text-foreground font-semibold">Совет:</span> Нажмите &ldquo;Полный экран&rdquo; для
          просмотра на разных устройствах
        </p>
      </div>
    </div>

      {/* Fullscreen Preview Modal */}
      {showFullscreen && (
        <FullscreenPreview
          theme={theme}
          themeMode={themeMode}
          shape={shape}
          size={size}
          position={position}
          customColors={customColors}
          animationEnabled={animationEnabled}
          animationEntrance={animationEntrance}
          animationSpeed={animationSpeed}
          enablePulse={enablePulse}
          contactsExpandDirection={contactsExpandDirection}
          contacts={contacts}
          onClose={() => setShowFullscreen(false)}
        />
      )}
    </>
  );
}

// ============================================================================
// FULLSCREEN PREVIEW COMPONENT
// ============================================================================

interface FullscreenPreviewProps {
  theme: ThemeName;
  themeMode: ThemeMode;
  shape: WidgetShape;
  size: WidgetSize;
  position: WidgetPosition;
  customColors: {
    primary?: string;
    text?: string;
    background?: string;
  };
  animationEnabled: boolean;
  animationEntrance: EntranceAnimation;
  animationSpeed: AnimationSpeed;
  enablePulse: boolean;
  contactsExpandDirection: ContactsExpandDirection;
  contacts: ContactInfo[];
  onClose: () => void;
}

function FullscreenPreview({
  theme,
  themeMode,
  shape,
  size,
  position,
  customColors,
  animationEnabled,
  animationEntrance,
  animationSpeed,
  enablePulse,
  contactsExpandDirection,
  contacts,
  onClose,
}: FullscreenPreviewProps) {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [bgMode, setBgMode] = useState<'light' | 'dark'>('light');
  const [isOpen, setIsOpen] = useState(false);

  // Размеры экранов
  const screenSizes = {
    desktop: 'w-full h-full',
    tablet: 'w-[768px] h-[1024px]',
    mobile: 'w-[375px] h-[667px]',
  };

  // Позиционирование виджета
  const positionStyles: React.CSSProperties = {
    position: 'absolute',
    ...(position.horizontal === 'left'
      ? { left: `${position.offsetX}px` }
      : { right: `${position.offsetX}px` }),
    ...(position.vertical === 'top'
      ? { top: `${position.offsetY}px` }
      : { bottom: `${position.offsetY}px` }),
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md">
      {/* Header с управлением */}
      <div className="border-b border-border bg-background">
        <div className="max-w-[1920px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Переключение устройств */}
            <div className="flex gap-2">
              {(['desktop', 'tablet', 'mobile'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setDeviceMode(mode)}
                  className={`px-4 py-2 rounded border transition-colors ${
                    deviceMode === mode
                      ? 'border-foreground bg-foreground/5'
                      : 'border-border hover:border-foreground/30'
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-wider capitalize">{mode}</span>
                </button>
              ))}
            </div>

            {/* Переключение фона */}
            <div className="flex gap-2">
              {(['light', 'dark'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setBgMode(mode)}
                  className={`px-4 py-2 rounded border transition-colors ${
                    bgMode === mode
                      ? 'border-foreground bg-foreground/5'
                      : 'border-border hover:border-foreground/30'
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-wider">
                    {mode === 'light' ? 'Светлый' : 'Тёмный'}
                  </span>
                </button>
              ))}
            </div>

            {/* Кнопка закрытия */}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-foreground text-background rounded hover:opacity-90 transition-opacity"
            >
              <span className="font-mono text-[10px] tracking-wider">✕ Закрыть</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preview область */}
      <div className="flex items-center justify-center p-8 h-[calc(100vh-80px)] overflow-auto">
        <div
          className={`${screenSizes[deviceMode]} ${
            bgMode === 'light'
              ? 'bg-gradient-to-br from-gray-50 to-gray-100'
              : 'bg-gradient-to-br from-gray-900 to-gray-800'
          } rounded-lg shadow-2xl border ${
            bgMode === 'light' ? 'border-gray-200' : 'border-gray-700'
          } relative overflow-hidden`}
        >
          {/* Фейковый контент сайта */}
          <div className="p-12 space-y-8">
            <div
              className={`h-12 w-64 rounded ${
                bgMode === 'light' ? 'bg-gray-300/30' : 'bg-gray-600/30'
              }`}
            />
            <div className="space-y-4">
              <div
                className={`h-4 w-full rounded ${
                  bgMode === 'light' ? 'bg-gray-300/20' : 'bg-gray-600/20'
                }`}
              />
              <div
                className={`h-4 w-5/6 rounded ${
                  bgMode === 'light' ? 'bg-gray-300/20' : 'bg-gray-600/20'
                }`}
              />
              <div
                className={`h-4 w-4/6 rounded ${
                  bgMode === 'light' ? 'bg-gray-300/20' : 'bg-gray-600/20'
                }`}
              />
            </div>
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div
                className={`h-48 rounded ${
                  bgMode === 'light' ? 'bg-gray-300/20' : 'bg-gray-600/20'
                }`}
              />
              <div
                className={`h-48 rounded ${
                  bgMode === 'light' ? 'bg-gray-300/20' : 'bg-gray-600/20'
                }`}
              />
            </div>
          </div>

          {/* Виджет */}
          <div style={positionStyles}>
            <div className="relative">
              <WidgetBubble
                theme={theme}
                themeMode={themeMode}
                shape={shape}
                size={size}
                customColors={Object.keys(customColors).length > 0 ? customColors : undefined}
                entranceAnimation={animationEnabled ? animationEntrance : 'none'}
                animationSpeed={animationSpeed}
                enablePulse={enablePulse && animationEnabled}
                onClick={() => setIsOpen(!isOpen)}
              />

              <ContactsMenu
                contacts={contacts}
                isOpen={isOpen}
                direction={contactsExpandDirection}
                theme={theme}
                themeMode={themeMode}
                animationSpeed={animationSpeed}
                onContactClick={(contact) => {
                  alert(`Контакт: ${contact.type} - ${contact.value}`);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
