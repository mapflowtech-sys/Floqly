# Дополнения и уточнения к плану разработки

## Дата создания: 2026-01-06

---

## 1. Демо-виджет - расширенная логика анимаций

### Текущий план:
- Виджет меняет позицию и тему при скролле (GSAP ScrollTrigger)
- 3 темы оформления
- Привязка к проценту прокрутки страницы

### ДОПОЛНЕНИЕ:
**Виджет должен уметь менять состояние БЕЗ привязки к скроллу**

#### Варианты поведения:
1. **Статичная позиция + изменение темы по таймеру**
   - Виджет закреплён в одной точке (например, bottom-right)
   - Каждые N секунд меняет тему оформления
   - Привлекает внимание без движения по экрану

2. **Статичная позиция + изменение по событиям**
   - Курсор приблизился к виджету → меняет цвет
   - Пользователь долго на странице → виджет "пульсирует"
   - Exit intent (курсор идёт к закрытию вкладки) → виджет становится ярче

3. **Комбинированный режим**
   - На мобильных: только статичная позиция (скролл неудобен)
   - На десктопе: scroll-triggered анимации

#### Технические требования:
```typescript
// Конфигурация поведения демо-виджета
interface DemoWidgetBehavior {
  mode: 'scroll-triggered' | 'static' | 'event-driven' | 'hybrid';

  // Для scroll-triggered
  scrollConfig?: {
    positions: Array<{
      scrollPercent: number;
      position: Position;
      theme: ThemeId;
    }>;
  };

  // Для static
  staticConfig?: {
    position: Position; // фиксированная позиция
    themeRotation?: {
      enabled: boolean;
      interval: number; // секунды между сменой темы
      themes: ThemeId[];
    };
  };

  // Для event-driven
  eventConfig?: {
    hoverEffect: boolean; // реакция на наведение
    exitIntent: boolean; // реакция на exit intent
    idleTimeout: number; // сек бездействия → привлечь внимание
  };
}
```

#### Места применения в проекте:
- **На лендинге**: можно показать все 3 режима в разных секциях
  - Hero секция: статичный виджет с пульсацией
  - Features секция: scroll-triggered (как в плане)
  - Pricing секция: event-driven (реагирует на exit intent)

#### Файлы для реализации:
- `src/components/widget/DemoWidget/behaviors/` (новая папка)
  - `scrollBehavior.ts` - логика скролл-анимаций
  - `staticBehavior.ts` - логика статичного режима
  - `eventBehavior.ts` - логика event-driven режима
  - `index.ts` - общий интерфейс для переключения режимов

---

## 2. PWA для личного кабинета - обязательно для MVP

### Текущий статус в плане:
- Упоминается в CLAUDE.md как требование
- В PROJECT_PLAN.md помечено как "Nice-to-have" (🔵)

### ИСПРАВЛЕНИЕ:
**PWA должно быть в Must-have (✅) для MVP**

### Почему критично:
- Владелец бизнеса должен получать уведомления о новых чатах
- Удобный доступ с мобильного (добавить на главный экран)
- Офлайн-доступ к просмотру истории чатов

### Обязательный функционал PWA для MVP:

#### 1. Manifest и установка
```json
// public/manifest.json
{
  "name": "Floqly - Личный кабинет",
  "short_name": "Floqly",
  "description": "Управление умным виджетом и мониторинг чатов",
  "start_url": "/dashboard",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#ffffff",
  "theme_color": "#6366f1",
  "icons": [
    {
      "src": "/icons/icon-72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

#### 2. Service Worker - базовый (для MVP)
```typescript
// public/sw.js - стратегия кэширования

// Кэшировать статику (JS, CSS, шрифты)
// Кэшировать страницы дашборда для офлайн-доступа
// НЕ кэшировать API запросы (real-time данные)

const CACHE_NAME = 'floqly-v1';
const STATIC_CACHE = [
  '/dashboard',
  '/dashboard/widget-settings',
  '/dashboard/chat-monitor',
  '/dashboard/free-services',
  '/dashboard/billing',
  // Статика Next.js добавится автоматически
];
```

#### 3. Push уведомления - критично!
```typescript
// src/lib/notifications/pushNotifications.ts

// Запрос разрешения на уведомления
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('Уведомления не поддерживаются');
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

// Подписка на push уведомления
export async function subscribeToPushNotifications(userId: string) {
  // Получить push subscription
  // Отправить на сервер партнёра (или в Supabase)
  // Партнёр будет слать уведомления когда новый чат
}
```

#### Сценарии уведомлений:
- 🔔 **Новый чат начат** - "Новый посетитель на вашем сайте начал диалог"
- 💬 **Новое сообщение** - "Посетитель задал вопрос: '...'"
- ⚠️ **Виджет требует внимания** - "AI не смог ответить, нужен оператор"
- ⏰ **Триал заканчивается** - "Осталось 2 дня триала"

#### 4. Офлайн функционал
**Что должно работать БЕЗ интернета:**
- ✅ Открытие дашборда (закэшированная страница)
- ✅ Просмотр последних чатов (из IndexedDB)
- ✅ Просмотр настроек виджета (сохранены локально)
- ❌ Отправка новых сообщений (требует онлайн)
- ❌ Real-time обновления (требует онлайн)

**Индикатор статуса:**
```typescript
// Показать баннер "Вы офлайн" когда нет сети
// Автоматически синхронизировать данные при восстановлении связи
```

#### 5. Технические детали

**Библиотеки:**
```bash
npm install workbox-webpack-plugin  # Для генерации SW
npm install idb                      # IndexedDB wrapper
```

**Next.js конфигурация:**
```typescript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // Только в продакшене
});

module.exports = withPWA({
  // ... остальная конфигурация
});
```

### Обновлённые временные рамки с учётом PWA:

**Фаза 5.5: PWA настройка (Дни 12.5-13.5)** - вставить ПОСЛЕ базового дашборда
- День 12.5: Manifest, иконки, базовый Service Worker
- День 13: Push уведомления (интеграция + UI для запроса разрешения)
- День 13.5: Офлайн кэширование + тестирование на мобильных

---

## Обновлённый Must-have список для MVP:

### ✅ Критично (без этого нельзя запускать):
1. Лендинг с работающим демо-виджетом
2. Регистрация и вход
3. Базовый дашборд
4. Страница настройки виджета
5. **PWA для личного кабинета** ⬅️ ДОБАВЛЕНО
6. **Push уведомления** ⬅️ ДОБАВЛЕНО
7. Инструкции по оплате
8. Docker деплой на TimeWeb
9. HTTPS и базовый SEO

### 🔵 Nice-to-have (после запуска):
- Бесплатные сервисы (генераторы)
- Real-time мониторинг чатов (нужен API партнёра)
- ~~PWA для мобильных~~ ⬅️ ПЕРЕНЕСЕНО В Must-have
- Блог с статьями
- Интеграция с платёжными системами
- Email-рассылки
- Реферальная программа

---

## Важные заметки:

### По демо-виджету:
- Сделать режимы переключаемыми через конфиг
- Показать все 3 режима на разных секциях лендинга
- На мобильных использовать только static/event-driven режимы

### По PWA:
- Запросить разрешение на уведомления НЕ сразу, а после первого входа в дашборд
- Показать value proposition: "Получайте уведомления о новых чатах прямо на телефон"
- Тестировать на реальных устройствах (iOS Safari, Android Chrome)
- HTTPS обязателен даже на dev окружении (для Service Worker)

### Следующий шаг:
Дождаться референсов дизайна → выбрать UI библиотеку → начать с демо-виджета

---

**Файл создан:** 2026-01-06
**Последнее обновление:** 2026-01-06
