'use client';

/**
 * Страница конструктора виджетов
 *
 * Функционал:
 * - Настройка всех параметров виджета (тема, форма, размер, цвета, позиция)
 * - Live preview справа
 * - Генерация embed кода
 * - Экспорт конфигурации
 */

import { useState } from 'react';
import Link from 'next/link';
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

// Компоненты конструктора (создадим позже)
import WidgetPreview from '@/components/widget-builder/WidgetPreview';
import SettingsPanel from '@/components/widget-builder/SettingsPanel';
import EmbedCodePanel from '@/components/widget-builder/EmbedCodePanel';

export default function WidgetBuilderPage() {
  // ============================================================================
  // STATE: Конфигурация виджета
  // ============================================================================

  // Дизайн
  const [theme, setTheme] = useState<ThemeName>('glassmorphism');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [shape, setShape] = useState<WidgetShape>('circle');
  const [size, setSize] = useState<WidgetSize>('medium');

  // Позиция
  const [position, setPosition] = useState<WidgetPosition>({
    horizontal: 'right',
    vertical: 'bottom',
    offsetX: 24,
    offsetY: 24,
  });

  // Цвета (опционально, если хочется переопределить тему)
  const [customColors, setCustomColors] = useState<{
    primary?: string;
    text?: string;
    background?: string;
  }>({});

  // Анимации
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [animationEntrance, setEntranceAnimation] = useState<EntranceAnimation>('scale');
  const [animationSpeed, setAnimationSpeed] = useState<AnimationSpeed>('medium');
  const [enablePulse, setEnablePulse] = useState(false);

  // Контакты
  const [contactsExpandDirection, setContactsExpandDirection] =
    useState<ContactsExpandDirection>('radial');
  const [contacts, setContacts] = useState<ContactInfo[]>([
    { type: 'telegram', value: 't.me/your_bot', enabled: true },
    { type: 'whatsapp', value: '+79001234567', enabled: true },
    { type: 'email', value: 'support@example.com', enabled: true },
  ]);

  // UI State
  const [activeTab, setActiveTab] = useState<'settings' | 'code'>('settings');

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="max-w-[1920px] mx-auto px-8 md:px-16 py-6">
          <div className="flex items-center justify-between">
            {/* Логотип + название */}
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="font-mono text-sm tracking-[0.2em] hover:opacity-70 transition-opacity"
              >
                FLOQLY
              </Link>
              <div className="h-4 w-px bg-border" />
              <h1 className="font-mono text-xs tracking-wider text-foreground/70">
                Конструктор виджета
              </h1>
            </div>

            {/* Справка */}
            <button className="font-mono text-xs tracking-wider text-foreground/70 hover:text-foreground transition-colors">
              Помощь
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-[1920px] mx-auto px-8 md:px-16">
          {/* Tabs: Настройки / Код */}
          <div className="mb-8 flex gap-6">
            <button
              onClick={() => setActiveTab('settings')}
              className={`font-mono text-xs tracking-wider pb-2 border-b-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-foreground/50 hover:text-foreground/70'
              }`}
            >
              Настройки
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`font-mono text-xs tracking-wider pb-2 border-b-2 transition-colors ${
                activeTab === 'code'
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-foreground/50 hover:text-foreground/70'
              }`}
            >
              Получить код
            </button>
          </div>

          {/* Layout: Панель настроек (слева) + Preview (справа) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Левая панель: Настройки или Код */}
            <div className="lg:col-span-5">
              {activeTab === 'settings' ? (
                <SettingsPanel
                  // Дизайн
                  theme={theme}
                  setTheme={setTheme}
                  themeMode={themeMode}
                  setThemeMode={setThemeMode}
                  shape={shape}
                  setShape={setShape}
                  size={size}
                  setSize={setSize}
                  // Позиция
                  position={position}
                  setPosition={setPosition}
                  // Цвета
                  customColors={customColors}
                  setCustomColors={setCustomColors}
                  // Анимации
                  animationEnabled={animationEnabled}
                  setAnimationEnabled={setAnimationEnabled}
                  animationEntrance={animationEntrance}
                  setEntranceAnimation={setEntranceAnimation}
                  animationSpeed={animationSpeed}
                  setAnimationSpeed={setAnimationSpeed}
                  enablePulse={enablePulse}
                  setEnablePulse={setEnablePulse}
                  // Контакты
                  contactsExpandDirection={contactsExpandDirection}
                  setContactsExpandDirection={setContactsExpandDirection}
                  contacts={contacts}
                  setContacts={setContacts}
                />
              ) : (
                <EmbedCodePanel
                  config={{
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
                  }}
                />
              )}
            </div>

            {/* Правая панель: Preview */}
            <div className="lg:col-span-7">
              <WidgetPreview
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
              />
            </div>
          </div>
        </div>
      </main>

      {/* Информация внизу */}
      <footer className="border-t border-border py-8">
        <div className="max-w-[1920px] mx-auto px-8 md:px-16">
          <p className="font-mono text-[10px] text-foreground/50 tracking-wider">
            Все изменения сохраняются автоматически в вашем браузере
          </p>
        </div>
      </footer>
    </div>
  );
}
