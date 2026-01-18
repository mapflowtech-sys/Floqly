'use client';

/**
 * Демо-страница для тестирования виджетов
 *
 * Показывает все 3 темы в разных вариантах
 */

import { useState } from 'react';
import WidgetBubble from '@/components/widgets/common/WidgetBubble';
import ContactsMenu from '@/components/widgets/common/ContactsMenu';
import type { ThemeName, WidgetShape, WidgetSize, ThemeMode, ContactInfo, ContactsExpandDirection } from '@/types/widget';

export default function WidgetDemoPage() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Демонстрация виджетов Floqly
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Все темы, формы и размеры виджетов
        </p>

        {/* Toggle theme */}
        <div className="flex gap-4">
          <button
            onClick={() => setThemeMode('light')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              themeMode === 'light'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Светлая тема
          </button>
          <button
            onClick={() => setThemeMode('dark')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              themeMode === 'dark'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Тёмная тема
          </button>
        </div>
      </div>

      {/* Демонстрация тем */}
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Glassmorphism */}
        <ThemeSection
          themeName="glassmorphism"
          themeMode={themeMode}
          title="Glassmorphism"
          description="Современный стиль с эффектом матового стекла и размытием фона"
        />

        {/* Neomorphism */}
        <ThemeSection
          themeName="neomorphism"
          themeMode={themeMode}
          title="Neomorphism"
          description="Мягкий объёмный стиль с эффектом выпуклости и двойными тенями"
        />

        {/* Liquid Glass */}
        <ThemeSection
          themeName="liquidGlass"
          themeMode={themeMode}
          title="Liquid Glass"
          description="Эффект жидкого стекла с плавными градиентами и органическими формами"
        />
      </div>

      {/* Демонстрация ContactsMenu */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Меню контактов (3 варианта раскрытия)
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Кликните на виджет чтобы увидеть раскрытие контактов
          </p>

          <ContactsMenuDemo themeMode={themeMode} />
        </div>
      </div>

      {/* Мобильный preview */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Мобильный preview
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            На экранах {'<'}768px виджеты автоматически уменьшаются на 8px
          </p>

          <div className="max-w-sm mx-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-3xl p-8 shadow-xl border-8 border-gray-900 relative overflow-hidden" style={{ minHeight: '600px' }}>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-8">
              Симуляция мобильного экрана
            </p>

            <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Контент страницы...
            </div>

            {/* Виджет в правом нижнем углу (фиксированный внутри контейнера) */}
            <div className="absolute bottom-6 right-6 z-10">
              <WidgetBubble
                theme="neomorphism"
                themeMode={themeMode}
                size="medium"
                onClick={() => alert('Виджет кликнут!')}
                enablePulse
                customColors={{
                  primary: themeMode === 'dark' ? '#374151' : '#6366f1',
                  text: '#ffffff',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ
// ============================================================================

interface ThemeSectionProps {
  themeName: ThemeName;
  themeMode: ThemeMode;
  title: string;
  description: string;
}

function ThemeSection({ themeName, themeMode, title, description }: ThemeSectionProps) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">{description}</p>

      {/* Формы */}
      <div className="space-y-8">
        <ShapeRow
          title="Круг"
          shape="circle"
          themeName={themeName}
          themeMode={themeMode}
        />
        <ShapeRow
          title="Квадрат"
          shape="square"
          themeName={themeName}
          themeMode={themeMode}
        />
        <ShapeRow
          title="Ассиметрия"
          shape="asymmetric"
          themeName={themeName}
          themeMode={themeMode}
        />
      </div>
    </section>
  );
}

interface ShapeRowProps {
  title: string;
  shape: WidgetShape;
  themeName: ThemeName;
  themeMode: ThemeMode;
}

function ShapeRow({ title, shape, themeName, themeMode }: ShapeRowProps) {
  const sizes: WidgetSize[] = ['small', 'medium', 'large'];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        {title}
      </h3>
      <div className="flex gap-8 items-center flex-wrap">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <WidgetBubble
              theme={themeName}
              themeMode={themeMode}
              shape={shape}
              size={size}
              entranceAnimation="scale"
              onClick={() =>
                console.log(`Clicked: ${themeName} ${shape} ${size}`)
              }
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {size}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// ДЕМО КОМПОНЕНТ ДЛЯ CONTACTS MENU
// ============================================================================

interface ContactsMenuDemoProps {
  themeMode: ThemeMode;
}

function ContactsMenuDemo({ themeMode }: ContactsMenuDemoProps) {
  const directions: ContactsExpandDirection[] = ['top', 'left', 'radial'];
  const [openDirection, setOpenDirection] = useState<ContactsExpandDirection | null>(null);

  // Тестовые контакты
  const contacts: ContactInfo[] = [
    { type: 'telegram', value: 't.me/example', enabled: true },
    { type: 'whatsapp', value: '+1234567890', enabled: true },
    { type: 'vk', value: 'vk.com/example', enabled: true },
    { type: 'email', value: 'hello@example.com', enabled: true },
    { type: 'phone', value: '+1234567890', enabled: true },
  ];

  return (
    <div className="flex gap-16 justify-center flex-wrap">
      {directions.map((direction) => (
        <div key={direction} className="flex flex-col items-center gap-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
            {direction === 'top' ? 'Сверху' : direction === 'left' ? 'Слева' : 'Радиально'}
          </span>

          {/* Контейнер для виджета */}
          <div className="relative" style={{ width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="relative">
              <WidgetBubble
                theme="glassmorphism"
                themeMode={themeMode}
                size="medium"
                onClick={() => setOpenDirection(openDirection === direction ? null : direction)}
              />

              <ContactsMenu
                contacts={contacts}
                direction={direction}
                isOpen={openDirection === direction}
                theme="glassmorphism"
                themeMode={themeMode}
                onContactClick={(contact) => {
                  alert(`Clicked: ${contact.type} - ${contact.value}`);
                  setOpenDirection(null);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
