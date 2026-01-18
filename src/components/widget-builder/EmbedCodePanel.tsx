'use client';

/**
 * EmbedCodePanel - Панель генерации embed кода
 *
 * Функционал:
 * - Генерация HTML кода для вставки на сайт
 * - Кнопка копирования
 * - Инструкция по установке
 * - Экспорт конфигурации в JSON
 */

import { useState } from 'react';
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

interface WidgetConfig {
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

interface EmbedCodePanelProps {
  config: WidgetConfig;
}

export default function EmbedCodePanel({ config }: EmbedCodePanelProps) {
  const [copied, setCopied] = useState(false);

  // Генерируем embed код
  const generateEmbedCode = () => {
    // Сериализуем конфиг в JSON
    const configJson = JSON.stringify(config, null, 2);

    // HTML код для вставки
    return `<!-- Floqly Widget -->
<script>
  window.floqlyConfig = ${configJson};
</script>
<script src="https://floqly.ru/widgets/ordinary-widget.js" async></script>
<!-- End Floqly Widget -->`;
  };

  const embedCode = generateEmbedCode();

  // Копировать код
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Скачать конфиг как JSON
  const downloadConfig = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'floqly-widget-config.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Заголовок */}
      <div>
        <h3 className="font-mono text-xs tracking-wider text-foreground mb-2">КОД ДЛЯ УСТАНОВКИ</h3>
        <p className="font-mono text-[10px] text-foreground/50 leading-relaxed">
          Скопируйте код ниже и вставьте перед закрывающим тегом &lt;/body&gt; на вашем сайте
        </p>
      </div>

      {/* Код */}
      <div className="relative">
        <pre className="p-6 bg-foreground/5 rounded-lg border border-border overflow-x-auto">
          <code className="font-mono text-[10px] text-foreground leading-relaxed">{embedCode}</code>
        </pre>

        {/* Кнопка копирования */}
        <button
          onClick={copyToClipboard}
          className="absolute top-4 right-4 px-4 py-2 bg-background border border-border rounded hover:border-foreground transition-colors"
        >
          <span className="font-mono text-[10px] tracking-wider">
            {copied ? '✓ Скопировано' : 'Копировать'}
          </span>
        </button>
      </div>

      {/* Инструкция */}
      <div className="space-y-4">
        <h4 className="font-mono text-xs tracking-wider text-foreground">ИНСТРУКЦИЯ</h4>

        <ol className="space-y-3 list-decimal list-inside">
          <li className="font-mono text-[10px] text-foreground/70 leading-relaxed">
            Скопируйте код выше
          </li>
          <li className="font-mono text-[10px] text-foreground/70 leading-relaxed">
            Откройте HTML код вашего сайта
          </li>
          <li className="font-mono text-[10px] text-foreground/70 leading-relaxed">
            Найдите закрывающий тег <code className="px-1 py-0.5 bg-foreground/10 rounded">&lt;/body&gt;</code>
          </li>
          <li className="font-mono text-[10px] text-foreground/70 leading-relaxed">
            Вставьте скопированный код прямо перед ним
          </li>
          <li className="font-mono text-[10px] text-foreground/70 leading-relaxed">
            Сохраните изменения
          </li>
        </ol>
      </div>

      {/* Дополнительные действия */}
      <div className="space-y-3">
        <button
          onClick={downloadConfig}
          className="w-full p-4 bg-foreground/5 border border-border rounded hover:border-foreground transition-colors"
        >
          <span className="font-mono text-[10px] tracking-wider text-foreground">
            Скачать конфигурацию (JSON)
          </span>
        </button>

        <div className="p-4 bg-muted/30 rounded-lg border border-border">
          <p className="font-mono text-[10px] text-foreground/70 leading-relaxed">
            <span className="text-foreground font-semibold">Важно:</span> Виджет работает на всех
            современных браузерах. Минимальный вес скрипта - менее 50KB. Не замедляет загрузку
            вашего сайта.
          </p>
        </div>
      </div>

      {/* Примеры интеграции */}
      <div className="space-y-4">
        <h4 className="font-mono text-xs tracking-wider text-foreground">ПРИМЕРЫ ИНТЕГРАЦИИ</h4>

        {/* WordPress */}
        <details className="group">
          <summary className="font-mono text-[10px] text-foreground/70 tracking-wider cursor-pointer hover:text-foreground transition-colors">
            WordPress
          </summary>
          <div className="mt-3 p-4 bg-foreground/5 rounded border border-border">
            <p className="font-mono text-[10px] text-foreground/70 leading-relaxed">
              1. Перейдите в <strong>Внешний вид → Редактор тем</strong>
              <br />
              2. Откройте файл <code className="px-1 py-0.5 bg-foreground/10 rounded">
                footer.php
              </code>
              <br />
              3. Вставьте код перед <code className="px-1 py-0.5 bg-foreground/10 rounded">
                &lt;/body&gt;
              </code>
              <br />
              4. Сохраните изменения
            </p>
          </div>
        </details>

        {/* Tilda */}
        <details className="group">
          <summary className="font-mono text-[10px] text-foreground/70 tracking-wider cursor-pointer hover:text-foreground transition-colors">
            Tilda
          </summary>
          <div className="mt-3 p-4 bg-foreground/5 rounded border border-border">
            <p className="font-mono text-[10px] text-foreground/70 leading-relaxed">
              1. Перейдите в <strong>Настройки сайта → Ещё → HTML-код для вставки внутри HEAD или
              BODY</strong>
              <br />
              2. Вставьте код в поле <strong>Before &lt;/body&gt;</strong>
              <br />
              3. Сохраните и опубликуйте сайт
            </p>
          </div>
        </details>

        {/* Wix */}
        <details className="group">
          <summary className="font-mono text-[10px] text-foreground/70 tracking-wider cursor-pointer hover:text-foreground transition-colors">
            Wix
          </summary>
          <div className="mt-3 p-4 bg-foreground/5 rounded border border-border">
            <p className="font-mono text-[10px] text-foreground/70 leading-relaxed">
              1. Перейдите в <strong>Настройки → Дополнительно → Пользовательский код</strong>
              <br />
              2. Нажмите <strong>+ Добавить код</strong>
              <br />
              3. Выберите <strong>Body - End</strong>
              <br />
              4. Вставьте код и сохраните
            </p>
          </div>
        </details>

        {/* HTML/CSS сайты */}
        <details className="group">
          <summary className="font-mono text-[10px] text-foreground/70 tracking-wider cursor-pointer hover:text-foreground transition-colors">
            Обычный HTML сайт
          </summary>
          <div className="mt-3 p-4 bg-foreground/5 rounded border border-border">
            <p className="font-mono text-[10px] text-foreground/70 leading-relaxed">
              Откройте ваш <code className="px-1 py-0.5 bg-foreground/10 rounded">index.html</code>{' '}
              файл и вставьте код перед{' '}
              <code className="px-1 py-0.5 bg-foreground/10 rounded">&lt;/body&gt;</code>
            </p>
          </div>
        </details>
      </div>

      {/* Поддержка */}
      <div className="p-4 bg-foreground/5 rounded-lg border border-border">
        <p className="font-mono text-[10px] text-foreground/70 leading-relaxed">
          <span className="text-foreground font-semibold">Нужна помощь?</span>
          <br />
          Напишите нам на{' '}
          <a href="mailto:support@floqly.ru" className="underline hover:text-foreground">
            support@floqly.ru
          </a>{' '}
          и мы поможем с установкой виджета
        </p>
      </div>
    </div>
  );
}
