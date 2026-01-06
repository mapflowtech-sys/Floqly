План разработки Floqly MVP
Обзор проекта
Floqly — B2B SaaS платформа для умного AI-виджета, который повышает конверсию сайтов клиентов.

Архитектура системы
┌─────────────────────────────────────────────────────────────┐
│                    Floqly Ecosystem                          │
├──────────────────────────┬──────────────────────────────────┤
│   ВАШ ПРОЕКТ             │   ПРОЕКТ ПАРТНЁРА                │
│   (Сайт + Личный Кабинет)│   (AI Виджет Engine)             │
├──────────────────────────┼──────────────────────────────────┤
│ Хостинг: TimeWeb         │ Хостинг: Отдельный сервер        │
│ Домен: floqly.ru         │ Домен: widget.floqly.ru (пример) │
│                          │                                  │
│ Фронтенд: Next.js 14     │ Backend: Python + Claude API     │
│ Бекенд: Supabase         │                                  │
│                          │                                  │
│ Компоненты:              │ Компоненты:                      │
│ - Лендинг с демо         │ - AI логика виджета              │
│ - Аутентификация         │ - Парсинг сайтов клиентов        │
│ - Личный кабинет         │ - Обработка чатов                │
│ - Бесплатные сервисы     │ - Интеграция с Claude            │
│ - Биллинг (ручной)       │ - WebSocket для real-time        │
└──────────────────────────┴──────────────────────────────────┘
              │                           │
              └───────── REST API ────────┘
                (для настроек виджета)
Разделение ответственности
Ты делаешь:

✅ Полноценный сайт floqly.ru (лендинг, презентация продукта)
✅ Демо-виджет на лендинге (имитация, не настоящий AI)
✅ Аутентификация (регистрация, вход, восстановление пароля)
✅ Личный кабинет (дашборд для управления)
✅ Бесплатные сервисы (генераторы политики конфиденциальности, cookies, простой виджет)
✅ Биллинг интерфейс (страница с инструкциями по оплате)
✅ Интерфейс настройки виджета (дизайн, триггеры, тексты)
✅ Интерфейс мониторинга чатов (просмотр диалогов)
Партнёр делает:

✅ Настоящий AI-виджет (работает на сайтах клиентов)
✅ Python бекенд с интеграцией Claude API
✅ Парсинг сайтов клиентов
✅ AI-логика (понимание контекста, триггеры, ответы)
✅ База знаний для каждого клиента
✅ WebSocket сервер для real-time чатов
Технологический стек
Фронтенд (твоя зона ответственности)
Технология	Зачем	Альтернативы
Next.js 14 (App Router)	Фреймворк для React с SSR/SSG, отличный SEO	Remix, Astro
TypeScript	Типизация для меньшего количества ошибок	JavaScript (не рекомендуется)
Tailwind CSS	Быстрая стилизация, адаптивность из коробки	CSS Modules, Styled Components
shadcn/ui	Готовые красивые компоненты (можешь кастомизировать)	MUI, Ant Design
Framer Motion	Анимации для демо-виджета	React Spring, GSAP
GSAP	Scroll-triggered анимации на лендинге	Intersection Observer API
Zustand	Управление состоянием (проще Redux)	Redux Toolkit, Jotai
React Hook Form	Формы (регистрация, настройки)	Formik
Zod	Валидация данных	Yup, Joi
Бекенд (твоя зона ответственности)
Технология	Зачем	Почему это решение
Supabase	Backend-as-a-Service (база данных + аутентификация + API)	✅ Быстрый старт
✅ Не нужно писать бекенд код
✅ PostgreSQL (можешь мигрировать)
✅ Real-time из коробки
✅ Работает в РФ
Next.js API Routes	Дополнительные endpoint'ы, если нужно	Для бизнес-логики сверх Supabase
Инфраструктура
Хостинг: TimeWeb Cloud App Platform (РФ)
Деплой: Docker контейнер
Домен: floqly.ru (+ поддомены при необходимости)
CDN: TimeWeb CDN или Cloudflare
SSL: Автоматический от TimeWeb
Аналитика и SEO
Yandex Metrika (обязательно для РФ рынка)
Google Analytics 4 (дополнительно)
Yandex Webmaster (индексация в Яндексе)
Google Search Console (индексация в Google)
Структура проекта
C:\Project\Floqly\
│
├── public/
│   ├── fonts/                    # Шрифты (Inter с кириллицей)
│   ├── images/
│   │   ├── landing/              # Картинки для лендинга
│   │   ├── demo-widget/          # Иконки, аватары для демо
│   │   └── og-image.png          # Open Graph для соцсетей
│   ├── robots.txt
│   └── yandex_verification.html
│
├── src/
│   ├── app/                      # Next.js App Router (роутинг)
│   │   │
│   │   ├── (marketing)/          # Группа: публичные страницы
│   │   │   ├── page.tsx          # Главная (лендинг)
│   │   │   ├── layout.tsx        # Лейаут с хедером/футером
│   │   │   └── about/
│   │   │       └── page.tsx      # О проекте (опционально)
│   │   │
│   │   ├── (auth)/               # Группа: страницы аутентификации
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── reset-password/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx        # Простой лейаут (без меню)
│   │   │
│   │   ├── (dashboard)/          # Группа: личный кабинет (защищённые роуты)
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx                    # Главная дашборда (обзор)
│   │   │   │   ├── widget-settings/
│   │   │   │   │   └── page.tsx                # Настройка умного виджета
│   │   │   │   ├── chat-monitor/
│   │   │   │   │   └── page.tsx                # Мониторинг чатов real-time
│   │   │   │   ├── free-services/
│   │   │   │   │   ├── page.tsx                # Список бесплатных сервисов
│   │   │   │   │   ├── privacy-generator/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── cookie-generator/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── simple-widget/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── billing/
│   │   │   │       └── page.tsx                # Инструкции по оплате
│   │   │   └── layout.tsx                      # Лейаут с сайдбаром
│   │   │
│   │   ├── api/                  # Next.js API Routes (если нужны)
│   │   │   └── widget-config/
│   │   │       └── route.ts      # Прокси к API партнёра (опционально)
│   │   │
│   │   ├── layout.tsx            # Корневой лейаут (провайдеры, шрифты)
│   │   ├── globals.css           # Глобальные стили + Tailwind
│   │   ├── not-found.tsx         # 404 страница
│   │   ├── error.tsx             # Error boundary
│   │   ├── sitemap.ts            # Генерация sitemap.xml
│   │   └── robots.ts             # Генерация robots.txt
│   │
│   ├── components/
│   │   ├── ui/                   # shadcn/ui компоненты
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...               # Все компоненты из shadcn
│   │   │
│   │   ├── landing/              # Компоненты лендинга
│   │   │   ├── Hero.tsx          # Первый экран с CTA
│   │   │   ├── Features.tsx      # Ключевые возможности (7 пунктов)
│   │   │   ├── DemoSection.tsx   # Секция с демо-виджетом
│   │   │   ├── HowItWorks.tsx    # Как это работает
│   │   │   ├── Pricing.tsx       # Цены + триал
│   │   │   ├── FAQ.tsx           # Частые вопросы
│   │   │   ├── CTA.tsx           # Призыв к регистрации
│   │   │   └── Footer.tsx        # Футер (контакты, ссылки)
│   │   │
│   │   ├── widget/               # ⭐ САМОЕ ВАЖНОЕ - демо-виджет
│   │   │   └── DemoWidget/
│   │   │       ├── index.tsx                  # Главный компонент
│   │   │       ├── WidgetBubble.tsx           # Плавающая кнопка
│   │   │       ├── WidgetChat.tsx             # Окно чата
│   │   │       ├── animations/
│   │   │       │   ├── scrollTriggers.ts      # GSAP логика
│   │   │       │   └── motionVariants.ts      # Framer Motion варианты
│   │   │       ├── themes/
│   │   │       │   ├── theme1.ts              # Дизайн-тема 1
│   │   │       │   ├── theme2.ts              # Дизайн-тема 2
│   │   │       │   └── theme3.ts              # Дизайн-тема 3
│   │   │       └── mockConversations.ts       # Заготовленные диалоги
│   │   │
│   │   ├── dashboard/            # Компоненты личного кабинета
│   │   │   ├── Sidebar.tsx       # Боковое меню
│   │   │   ├── TopNav.tsx        # Верхняя панель (поиск, профиль)
│   │   │   ├── WidgetConfigurator/
│   │   │   │   ├── DesignPicker.tsx           # Выбор дизайна
│   │   │   │   ├── TriggerSettings.tsx        # Настройка триггеров
│   │   │   │   ├── BehaviorSettings.tsx       # Поведение виджета
│   │   │   │   └── EmbedCode.tsx              # Код для вставки
│   │   │   ├── ChatMonitor/
│   │   │   │   ├── ChatList.tsx               # Список активных чатов
│   │   │   │   ├── ChatWindow.tsx             # Окно чата
│   │   │   │   └── TakeoverButton.tsx         # Кнопка "взять управление"
│   │   │   └── FreeServiceCard.tsx            # Карточка бесплатного сервиса
│   │   │
│   │   ├── auth/                 # Компоненты аутентификации
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ResetPasswordForm.tsx
│   │   │
│   │   └── shared/               # Переиспользуемые компоненты
│   │       ├── Loader.tsx
│   │       ├── ErrorMessage.tsx
│   │       └── EmptyState.tsx
│   │
│   ├── lib/                      # Утилиты и конфигурация
│   │   ├── supabase/
│   │   │   ├── client.ts         # Supabase клиент (браузер)
│   │   │   ├── server.ts         # Supabase клиент (сервер)
│   │   │   └── middleware.ts     # Middleware для auth
│   │   │
│   │   ├── api/
│   │   │   ├── widget-api.ts     # Запросы к API партнёра (виджет)
│   │   │   └── axios-config.ts   # Настройка axios
│   │   │
│   │   ├── utils/
│   │   │   ├── cn.ts             # Утилита для classNames (Tailwind)
│   │   │   ├── validation.ts     # Общие валидаторы
│   │   │   └── date.ts           # Форматирование дат
│   │   │
│   │   └── analytics/
│   │       ├── yandex.tsx        # Yandex Metrika
│   │       └── google.tsx        # Google Analytics
│   │
│   ├── hooks/                    # React хуки
│   │   ├── useAuth.ts            # Аутентификация (Supabase)
│   │   ├── useWidgetConfig.ts    # Загрузка/сохранение настроек виджета
│   │   ├── useChatMonitor.ts     # Real-time подписка на чаты
│   │   └── useScrollTrigger.ts   # Отслеживание скролла для демо
│   │
│   ├── store/                    # Zustand стор (глобальное состояние)
│   │   ├── authStore.ts          # Состояние аутентификации
│   │   ├── widgetDemoStore.ts    # Состояние демо-виджета
│   │   └── dashboardStore.ts     # Состояние дашборда (если нужно)
│   │
│   ├── types/                    # TypeScript типы
│   │   ├── widget.ts             # Типы для виджета
│   │   ├── user.ts               # Типы пользователя
│   │   ├── chat.ts               # Типы чатов
│   │   └── supabase.ts           # Типы из Supabase (автогенерация)
│   │
│   └── styles/
│       └── animations.css        # Кастомные CSS анимации
│
├── .env.local                    # Переменные окружения (НЕ коммитить!)
├── .env.example                  # Пример переменных (коммитить)
├── .dockerignore
├── .eslintrc.json
├── .gitignore
├── components.json               # Конфиг shadcn/ui
├── docker-compose.yml            # Для локальной разработки
├── Dockerfile                    # Production сборка
├── next.config.js                # Конфигурация Next.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
└── tsconfig.json
Этапы разработки MVP
Фаза 1: Инициализация и настройка (День 1)
Шаг 1.1: Создание проекта Next.js
bash
npx create-next-app@latest floqly --typescript --tailwind --app --eslint
cd floqly
Шаг 1.2: Установка зависимостей
bash
# UI компоненты и стилизация
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input card dialog select textarea

# Анимации
npm install framer-motion gsap

# Управление состоянием
npm install zustand

# Работа с API и данными
npm install @tanstack/react-query axios

# Формы и валидация
npm install react-hook-form @hookform/resolvers zod

# Supabase (бекенд)
npm install @supabase/supabase-js @supabase/ssr

# SEO
npm install next-seo

# Утилиты
npm install clsx tailwind-merge class-variance-authority lucide-react
Шаг 1.3: Настройка Supabase
Зарегистрироваться на https://supabase.com
Создать новый проект (выбрать ближайший регион)
В разделе Authentication → Providers включить Email
Скопировать Project URL и anon public key
Создать .env.local:
env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUz...
Шаг 1.4: Создание структуры папок
Создать все папки из структуры выше (можно пока пустые).

Шаг 1.5: Настройка Tailwind для русского языка
В tailwind.config.ts добавить поддержку кириллицы и базовые анимации:

typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          from: { transform: 'translateY(100%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
Фаза 2: Демо-виджет (Дни 2-5) ⭐ ПРИОРИТЕТ #1
Это самая важная часть - визитная карточка проекта!

Что должен делать демо-виджет:
Появляться на лендинге внизу справа (как настоящий виджет)
Менять позицию при скролле (двигаться по экрану)
Менять дизайн (цвет, размер, стиль) - показать 3 вариации
Автоматически открываться и показывать заготовленный диалог
Быть красивым и плавным (Framer Motion анимации)
Не тормозить (оптимизация для мобильных)
Ключевые файлы для демо-виджета:
1. Store (состояние виджета)

src/store/widgetDemoStore.ts:

Открыт/закрыт виджет
Текущая позиция (x, y координаты)
Текущая тема (theme1, theme2, theme3)
Номер текущего сообщения в диалоге
2. Темы оформления

src/components/widget/DemoWidget/themes/:

theme1.ts - Градиент фиолетовый (классический SaaS)
theme2.ts - Минималистичный чёрно-белый
theme3.ts - Яркий креативный (оранжево-розовый)
Каждая тема содержит:

Цвета фона bubble и чата
Размеры
Border radius
Тени
Цвета текста
3. Скролл-анимации

src/components/widget/DemoWidget/animations/scrollTriggers.ts:

Использовать GSAP ScrollTrigger для:

0-30% скролла: Виджет внизу справа, theme1
30-60% скролла: Виджет двигается в центр, theme2
60-100% скролла: Виджет вверху справа, theme3
4. Компоненты

src/components/widget/DemoWidget/WidgetBubble.tsx:

Плавающая круглая кнопка
Анимация "дыхания" (scale пульсация)
Индикатор непрочитанных сообщений (опционально)
Клик открывает чат
src/components/widget/DemoWidget/WidgetChat.tsx:

Окно чата (380px × 600px на десктопе)
Заголовок с названием и кнопкой закрытия
Область сообщений (автоскролл вниз)
Поле ввода (заблокировано в демо)
Анимация появления сообщений по очереди
5. Моковые диалоги

src/components/widget/DemoWidget/mockConversations.ts:

Пример диалога:

typescript
export const demoScenarios = [
  {
    trigger: 'auto-open', // Открывается автоматически через 3 сек
    theme: 'theme1',
    messages: [
      { sender: 'bot', text: 'Привет! 👋 Я Floqly — умный ассистент. Помогу узнать больше о нашем виджете!', delay: 500 },
      { sender: 'user', text: 'Чем отличается от обычных чат-ботов?', delay: 2000 },
      { sender: 'bot', text: 'Я понимаю контекст вашего сайта, анализирую поведение посетителя и первым начинаю диалог только когда это нужно. Без навязчивости! 😊', delay: 1500 },
      { sender: 'user', text: 'Интересно! А сколько стоит?', delay: 2500 },
      { sender: 'bot', text: 'Попробуйте бесплатно 7 дней! 🎁 Зарегистрируйтесь и настройте виджет за 5 минут.', delay: 1500 },
    ]
  }
];
Логика работы демо:
Страница загружается → виджет bubble появляется снизу справа
Через 3 секунды → bubble "прыгает" (привлекает внимание)
Пользователь скроллит → bubble плавно перемещается, меняет цвет
При достижении 50% скролла → bubble автоматически раскрывается в чат
Сообщения появляются по очереди с задержкой (имитация печатания)
Пользователь может закрыть и снова открыть виджет
Фаза 3: Лендинг (Дни 6-8)
Структура лендинга:
Hero секция
Заголовок: "Умный AI-виджет, который увеличивает конверсию вашего сайта"
Подзаголовок: "Проактивный ассистент, который понимает ваш бизнес и общается с клиентами 24/7"
Кнопка: "Попробовать бесплатно 7 дней"
Визуал: Скриншот виджета или анимация
Ключевые преимущества (Features)
7 пунктов из твоего описания (понимает бизнес, проактивность, 24/7 и т.д.)
Иконки + короткое описание каждого
Можно с hover-эффектами
Как это работает (How It Works)
3-4 шага: Регистрация → Настройка → Установка → Profit
Визуализация процесса (стрелки, иллюстрации)
Демо-секция (Demo Section)
"Посмотрите сами" + призыв поскроллить
Здесь активно работает демо-виджет (самая интересная часть!)
Текст объясняет что происходит: "Виджет адаптируется под дизайн вашего сайта"
Цены (Pricing)
Бесплатный триал 7 дней
После триала: цена (например, 5000₽/месяц)
Что входит (перечень)
Кнопка: "Начать триал"
FAQ
5-7 частых вопросов
Аккордеон (раскрывающиеся ответы)
Призыв к действию (CTA)
Финальная секция с кнопкой регистрации
"Готовы увеличить конверсию? Начните бесплатно!"
Футер
Контакты (email, telegram)
Ссылки на соцсети
Ссылки на политику конфиденциальности
© 2026 Floqly
Референсы для дизайна:
Ты упоминал, что есть референсы. Когда будешь готов, можешь:

Показать ссылки на сайты, которые нравятся
Или дать скриншоты
Или описать стиль (минимализм, яркий, корпоративный)
Можно попросить Claude Code сгенерировать код на основе скриншота референса.

Важные моменты для лендинга:
Mobile-first: 70%+ трафика в РФ с мобильных
Скорость загрузки: Оптимизация картинок (WebP), lazy loading
SEO: Правильные заголовки (H1, H2), мета-теги, alt у картинок
Призывы к действию: Минимум 3 кнопки "Попробовать бесплатно" в разных местах
Фаза 4: Аутентификация (Дни 9-10)
Что нужно реализовать:
Страницы:

/login - Вход
/register - Регистрация
/reset-password - Восстановление пароля
Функционал:

Регистрация по email + пароль
Подтверждение email (опционально для MVP, можно сразу давать доступ)
Вход в систему
Выход из системы
Восстановление пароля (ссылка на email)
Защита роутов:
Middleware (src/middleware.ts) проверяет:

Если пользователь заходит на /dashboard/* без авторизации → редирект на /login
Если авторизованный заходит на /login → редирект на /dashboard
Supabase настройка:
В Supabase Authentication нужно:

Включить Email provider
Настроить Email templates (письма на русском)
Настроить Redirect URLs (для подтверждения email)
Хранение сессии:
Supabase использует HTTP-only cookies (безопасно)
Токен автоматически обновляется
Не нужно писать логику JWT вручную
Фаза 5: Личный кабинет - Базовая структура (Дни 11-12)
Лейаут дашборда:
┌────────────────────────────────────────┐
│  [Logo]  Floqly        [🔔] [👤 Имя]  │ ← TopNav
├─────────────┬──────────────────────────┤
│  📊 Обзор   │                          │
│  ⚙️ Виджет  │    Основной контент      │
│  💬 Чаты    │    страницы              │
│  🎁 Сервисы │                          │
│  💳 Оплата  │                          │
│  ─────────  │                          │
│  👋 Выйти   │                          │
└─────────────┴──────────────────────────┘
   Sidebar        Main Content Area
Страницы дашборда (в порядке приоритета):
1. Обзор (/dashboard)

Карточки со статистикой:
Статус триала (осталось X дней)
Количество диалогов виджета (заглушка для MVP)
Количество использованных бесплатных сервисов
Быстрые действия (кнопки к настройке виджета)
2. Настройки виджета (/dashboard/widget-settings) ⚠️ Этот функционал будет взаимодействовать с API партнёра в будущем

Для MVP (без API партнёра):

Форма с полями:
Название виджета
Выбор дизайна (3 темы из демо)
Позиция по умолчанию (left/right, top/bottom)
Текст приветствия
Кнопка "Сохранить" (сохраняет в Supabase в таблицу widget_configs)
Блок "Код для установки":
html
  <script src="https://widget.floqly.ru/embed.js" data-widget-id="USER_ID_123"></script>
Когда API партнёра будет готов:

Эти настройки будут отправляться на его сервер
Добавятся продвинутые настройки (триггеры, база знаний)
3. Мониторинг чатов (/dashboard/chat-monitor) ⚠️ Real-time функционал - требует WebSocket от партнёра

Для MVP (заглушка):

Список заглушек чатов с моковыми данными
Сообщение: "Функция мониторинга чатов станет доступна после установки виджета на ваш сайт"
Когда будет готово:

Список активных чатов (левая колонка)
Выбранный чат (правая колонка)
Кнопка "Взять управление" (переключает с AI на оператора)
4. Бесплатные сервисы (/dashboard/free-services)

Главная страница со списком:

Генератор политики конфиденциальности
Генератор cookie policy
Простой виджет (фиксированный, не AI)
Каждый сервис — это карточка с описанием и кнопкой "Открыть".

5. Оплата (/dashboard/billing)

Для MVP (ручная оплата):

┌─────────────────────────────────────┐
│  💳 Оплата подписки                 │
├─────────────────────────────────────┤
│  Ваш триал: осталось 5 дней         │
│                                     │
│  После триала: 5000₽/месяц          │
│                                     │
│  Для активации отправьте оплату:    │
│  Карта: 2200 1234 5678 9012         │
│  Получатель: ИП Иванов              │
│                                     │
│  После оплаты напишите нам:         │
│  📧 billing@floqly.ru               │
│  💬 @floqly_support в Telegram      │
└─────────────────────────────────────┘
В будущем можно интегрировать ЮKassa или Tinkoff.

Фаза 6: Бесплатные сервисы (Дни 13-14)
1. Генератор политики конфиденциальности
Страница: /dashboard/free-services/privacy-generator

Форма (поля):

Название компании
ИНН
Юридический адрес
Email для обращений
Телефон (опционально)
Что собираете: чекбоксы (email, телефон, cookies, аналитика)
Логика:

Пользователь заполняет форму
Нажимает "Сгенерировать"
Используется шаблон (текст с плейсхолдерами)
Плейсхолдеры заменяются на данные пользователя
Результат показывается на странице
Кнопки: "Скопировать", "Скачать .txt", "Сохранить в кабинете"
Сохранённый документ хранится в Supabase (таблица user_documents)
Шаблон политики: Можно использовать стандартный шаблон для РФ законодательства (152-ФЗ).

2. Генератор Cookie Policy
Аналогично политике конфиденциальности:

Форма с полями (какие cookies используете)
Генерация документа
Сохранение/экспорт
3. Простой виджет (не AI)
Страница: /dashboard/free-services/simple-widget

Что это: Обычный фиксированный виджет (типа тех, что на многих сайтах) с кнопками соцсетей/мессенджеров.

Настройка:

Форма:
Позиция (left/right, top/bottom)
Цвет фона
Какие кнопки показывать: Telegram, WhatsApp, VK, Email, Телефон
Ссылки/номера для каждой кнопки
Предпросмотр виджета справа (live preview)
Кнопка "Получить код"
Генерируемый код:

html
<div id="floqly-simple-widget"></div>
<script src="https://floqly.ru/simple-widget.js" data-config="USER_CONFIG_ID"></script>
Реализация:

Сохраняем конфиг в Supabase
Создаём отдельный endpoint /api/simple-widget-config/[id] который отдаёт конфиг
Создаём JS файл public/simple-widget.js который рендерит виджет на основе конфига
Фаза 7: Интеграция с API партнёра (Будущее)
⚠️ Этот этап делается ПОСЛЕ того, как партнёр подготовит свой API

Что нужно будет сделать:
1. API клиент

src/lib/api/widget-api.ts:

typescript
import axios from 'axios';

const widgetAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WIDGET_API_URL, // URL сервера партнёра
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен пользователя к каждому запросу
widgetAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token'); // или из Supabase
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const widgetAPIService = {
  // Создание конфига виджета
  createWidgetConfig: (userId: string, config: WidgetConfig) =>
    widgetAPI.post('/widget/config', { userId, ...config }),

  // Обновление конфига
  updateWidgetConfig: (widgetId: string, config: WidgetConfig) =>
    widgetAPI.put(`/widget/config/${widgetId}`, config),

  // Получение истории чатов
  getChatHistory: (widgetId: string, sessionId: string) =>
    widgetAPI.get(`/chats/${widgetId}/${sessionId}`),

  // Взятие управления чатом
  takeoverChat: (sessionId: string) =>
    widgetAPI.post(`/chats/${sessionId}/takeover`),

  // Отправка сообщения от оператора
  sendOperatorMessage: (sessionId: string, message: string) =>
    widgetAPI.post(`/chats/${sessionId}/message`, { message, sender: 'operator' }),
};
2. WebSocket для real-time чатов

src/hooks/useChatMonitor.ts (версия с WebSocket):

typescript
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useChatMonitor = (userId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeChats, setActiveChats] = useState([]);

  useEffect(() => {
    // Подключение к WebSocket серверу партнёра
    const newSocket = io(process.env.NEXT_PUBLIC_WIDGET_WEBSOCKET_URL!, {
      query: { userId },
      auth: { token: 'USER_AUTH_TOKEN' },
    });

    // Слушаем новые сообщения
    newSocket.on('new_message', (message) => {
      setActiveChats((prev) => {
        // Обновляем список чатов
        // ...
      });
    });

    // Слушаем новые чаты
    newSocket.on('new_chat', (chat) => {
      setActiveChats((prev) => [...prev, chat]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  const sendMessage = (sessionId: string, message: string) => {
    socket?.emit('operator_message', { sessionId, message });
  };

  return { activeChats, sendMessage };
};
3. Согласование с партнёром

Нужно будет обсудить:

Формат данных (JSON схемы)
Аутентификация (JWT токены?)
CORS настройки (чтобы твой сайт мог делать запросы к его API)
Rate limiting (ограничения по запросам)
Обработка ошибок
Фаза 8: Деплой на TimeWeb (Дни 15-16)
Подготовка Docker образа:
Dockerfile:

dockerfile
# Базовый образ
FROM node:20-alpine AS base

# Зависимости
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Сборка
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Переменные окружения для сборки (если нужны)
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

RUN npm run build

# Production образ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем собранное приложение
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
next.config.js (важно добавить):

javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ⚠️ Обязательно для Docker!

  // Для оптимизации
  compress: true,

  // Для русского рынка
  i18n: {
    locales: ['ru'],
    defaultLocale: 'ru',
  },
};

module.exports = nextConfig;
Процесс деплоя на TimeWeb:
Шаг 1: Локальное тестирование Docker

bash
# Собрать образ
docker build -t floqly:test .

# Запустить контейнер
docker run -p 3000:3000 --env-file .env.local floqly:test

# Открыть http://localhost:3000
# Проверить, что всё работает
Шаг 2: Загрузка на TimeWeb

Есть 2 варианта:

Вариант A: Через Docker Registry TimeWeb

bash
# Логин в реестр TimeWeb
docker login registry.timeweb.cloud -u YOUR_USERNAME

# Тегируем образ
docker tag floqly:test registry.timeweb.cloud/YOUR_ID/floqly:latest

# Отправляем в реестр
docker push registry.timeweb.cloud/YOUR_ID/floqly:latest
Вариант B: Через Git (проще для начала)

Пушим код на GitHub/GitLab
В панели TimeWeb выбираем "Cloud App Platform"
Выбираем "Deploy from Git"
Указываем репозиторий
TimeWeb автоматически находит Dockerfile и собирает образ
Шаг 3: Настройка переменных окружения в TimeWeb

В панели TimeWeb в разделе Environment Variables добавить:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_YANDEX_METRIKA_ID (когда будет)
NEXT_PUBLIC_GA_MEASUREMENT_ID (когда будет)
Шаг 4: Настройка домена

В TimeWeb DNS добавить A-запись: floqly.ru → IP сервера
Или CNAME: floqly.ru → your-app.timeweb.cloud
Включить автоматический SSL сертификат (Let's Encrypt)
Подождать распространения DNS (до 24 часов, обычно 1-2 часа)
Шаг 5: Проверка работы

Открыть https://floqly.ru
Проверить, что работает лендинг
Попробовать регистрацию/вход
Открыть дашборд
Проверить на мобильном
Фаза 9: SEO оптимизация (Дни 17-18)
Что нужно сделать:
1. Мета-теги на всех страницах

Пример для главной страницы (src/app/page.tsx):

typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Floqly - Умный AI виджет для увеличения конверсии сайта',
  description: 'Проактивный AI-ассистент, который понимает ваш бизнес и общается с клиентами 24/7. Увеличьте продажи с помощью умного виджета. Попробуйте бесплатно 7 дней!',
  keywords: 'AI виджет, умный чат-бот, увеличение конверсии, онлайн консультант, чат для сайта, AI для бизнеса',
  openGraph: {
    title: 'Floqly - Умный AI виджет для вашего сайта',
    description: 'Увеличьте конверсию с помощью проактивного AI-ассистента',
    url: 'https://floqly.ru',
    siteName: 'Floqly',
    images: [
      {
        url: 'https://floqly.ru/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Floqly AI виджет',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Floqly - Умный AI виджет',
    description: 'Увеличьте конверсию вашего сайта с AI-ассистентом',
    images: ['https://floqly.ru/og-image.png'],
  },
  alternates: {
    canonical: 'https://floqly.ru',
  },
};
2. Structured Data (JSON-LD)

Добавить в src/app/layout.tsx:

typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Floqly',
      description: 'Умный AI виджет для увеличения конверсии сайта',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'RUB',
        description: 'Бесплатный пробный период 7 дней',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '120',
      },
    }),
  }}
/>
3. Sitemap и Robots

Уже есть в структуре (src/app/sitemap.ts и src/app/robots.ts).

Проверить, что генерируются правильно:

https://floqly.ru/sitemap.xml
https://floqly.ru/robots.txt
4. Yandex Metrika

src/lib/analytics/yandex.tsx:

typescript
'use client';

import Script from 'next/script';

export const YandexMetrika = () => {
  const id = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

  if (!id) return null;

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {
              if (document.scripts[j].src === r) { return; }
            }
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${id}, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          });
        `}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${id}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
};
Добавить в src/app/layout.tsx:

typescript
import { YandexMetrika } from '@/lib/analytics/yandex';

// ...в JSX
<YandexMetrika />
5. Регистрация в Yandex Webmaster

Зайти на https://webmaster.yandex.ru
Добавить сайт floqly.ru
Подтвердить владение (HTML файл или мета-тег)
Отправить sitemap.xml
Проверить индексацию через 1-2 дня
6. Google Search Console

Аналогично Yandex:

https://search.google.com/search-console
Добавить floqly.ru
Подтверждение через DNS или HTML файл
Отправить sitemap
Следить за индексацией
7. Оптимизация изображений

Все изображения конвертировать в WebP формат
Использовать next/image компонент для автоматической оптимизации
Lazy loading для изображений ниже fold
Фаза 10: Тестирование и запуск (Дни 19-21)
Чек-лист перед запуском:
Функциональность:

 Лендинг загружается и красиво выглядит
 Демо-виджет работает (двигается, меняет цвета)
 Регистрация работает (приходит email от Supabase)
 Вход работает
 Восстановление пароля работает
 Дашборд открывается после логина
 Sidebar навигация работает
 Настройки виджета сохраняются
 Бесплатные сервисы генерируют документы
 Страница оплаты показывает инструкции
Дизайн:

 Всё выглядит красиво на десктопе (1920×1080)
 Всё корректно на планшете (768×1024)
 Всё работает на мобильном (375×667)
 Нет горизонтального скролла
 Шрифты читаемые (кириллица)
 Анимации плавные (не тормозят)
Безопасность:

 HTTPS работает (зелёный замочек)
 Пароли не видны при вводе
 Защита роутов работает (нельзя зайти в /dashboard без логина)
 CORS настроен правильно
SEO:

 Мета-теги на всех страницах
 Мета-теги на русском языке
 Есть мета-теги Open Graph (для соцсетей)
 Sitemap.xml доступен
 Robots.txt доступен
 Yandex Metrika работает (видно счётчик в коде)
 Google Analytics работает (если настроен)
 Favicon установлен
Производительность:

 Lighthouse Performance > 80
 First Contentful Paint < 2s
 Time to Interactive < 3s
 Нет ошибок в консоли браузера
Браузеры (проверить в каждом):

 Google Chrome (главный браузер)
 Yandex Browser (важно для РФ!)
 Safari (для iOS пользователей)
 Firefox (дополнительно)
Контент:

 Все тексты на русском
 Нет опечаток (прогнать через проверку орфографии)
 Контакты актуальные (email, telegram)
 Нет placeholder текстов ("Lorem ipsum")
План запуска:
День 19: Внутреннее тестирование

Ты проходишь весь путь пользователя сам
Регистрация → настройка → выход → вход снова
Записываешь все баги в список
Приоритизируешь (критичные чинишь сразу)
День 20: Бета-тестирование

Даёшь доступ 3-5 знакомым
Просишь зарегистрироваться и попробовать
Собираешь обратную связь
Чинишь критичные баги
День 21: Запуск

Финальная проверка всех систем
Публикуешь пост в соцсетях (если есть аудитория)
Отправляешь сайт на индексацию в Yandex/Google
Начинаешь привлекать первых пользователей
Интеграция с системой партнёра
Общая схема взаимодействия:
┌──────────────────────────────────────────────────────────────┐
│                        Пользователь                          │
│                    (Владелец бизнеса)                        │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     │ 1. Открывает floqly.ru
                     ↓
┌──────────────────────────────────────────────────────────────┐
│               Твой сайт (floqly.ru)                          │
├──────────────────────────────────────────────────────────────┤
│  - Регистрируется                                            │
│  - Входит в личный кабинет                                   │
│  - Настраивает виджет (цвет, текст, позиция)               │
│  - Получает код для вставки                                  │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     │ 2. POST /api/widget/create
                     │    (отправляет настройки)
                     ↓
┌──────────────────────────────────────────────────────────────┐
│          API партнёра (widget-api.floqly.ru)                 │
├──────────────────────────────────────────────────────────────┤
│  - Получает настройки от твоего сайта                        │
│  - Создаёт конфигурацию виджета                             │
│  - Возвращает widget_id                                      │
│  - Сохраняет в свою БД                                       │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     │ 3. Возвращает widget_id
                     ↓
┌──────────────────────────────────────────────────────────────┐
│               Твой сайт (floqly.ru)                          │
├──────────────────────────────────────────────────────────────┤
│  - Получает widget_id                                        │
│  - Сохраняет в Supabase                                      │
│  - Показывает код для установки:                             │
│    <script src="https://widget.floqly.ru/embed.js"          │
│            data-widget-id="abc123"></script>                 │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     │ 4. Копирует код
                     ↓
┌──────────────────────────────────────────────────────────────┐
│           Сайт клиента (example.com)                         │
├──────────────────────────────────────────────────────────────┤
│  - Вставляет код в HTML                                      │
│  - Виджет загружается с сервера партнёра                    │
│  - Виджет работает с Claude API                              │
│  - Чаты сохраняются на сервере партнёра                     │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     │ 5. Открывает floqly.ru/dashboard/chats
                     ↓
┌──────────────────────────────────────────────────────────────┐
│          Твой сайт - Мониторинг чатов                        │
├──────────────────────────────────────────────────────────────┤
│  - WebSocket подключение к серверу партнёра                  │
│  - Получает real-time обновления чатов                       │
│  - Может отправить сообщение как оператор                    │
│  - Может "взять управление" у AI                             │
└──────────────────────────────────────────────────────────────┘
Технические детали интеграции:
1. API endpoints (что партнёр должен предоставить):

POST   /api/widget/create           # Создание нового виджета
PUT    /api/widget/:id              # Обновление настроек
GET    /api/widget/:id/config       # Получение конфига
DELETE /api/widget/:id              # Удаление виджета

GET    /api/chats/:widget_id        # Список чатов для виджета
GET    /api/chats/:chat_id/messages # Сообщения конкретного чата
POST   /api/chats/:chat_id/message  # Отправка сообщения оператором
POST   /api/chats/:chat_id/takeover # Взятие управления у AI

WebSocket ws://widget-api.floqly.ru/ws # Real-time обновления
2. Формат данных (пример):

Запрос на создание виджета:

json
{
  "user_id": "user123_from_supabase",
  "widget_config": {
    "theme": "theme1",
    "position": "bottom-right",
    "greeting_text": "Привет! Чем могу помочь?",
    "primary_color": "#6366f1",
    "triggers": {
      "exit_intent": true,
      "scroll_50": true,
      "time_on_page_30s": false
    }
  }
}
Ответ:

json
{
  "success": true,
  "widget_id": "wid_abc123xyz",
  "embed_code": "<script src=\"https://widget.floqly.ru/embed.js\" data-widget-id=\"wid_abc123xyz\"></script>"
}
3. Аутентификация между системами:

Вариант 1: API ключи

Партнёр генерирует API ключ для твоего сайта
Ты добавляешь его в .env: WIDGET_API_KEY=sk_xxx
Каждый запрос к API партнёра включает этот ключ в заголовке:
typescript
  headers: {
    'X-API-Key': process.env.WIDGET_API_KEY
  }
Вариант 2: JWT токены

Твой бекенд генерирует JWT с user_id
Отправляет этот токен к API партнёра
Партнёр проверяет подпись токена
Более безопасно, но сложнее
4. Обработка ошибок:

Что делать, если API партнёра недоступен:

Показать пользователю дружелюбное сообщение
Сохранить настройки локально (в Supabase)
Попробовать отправить позже (retry механизм)
Уведомить тебя (админа) об ошибке
typescript
try {
  const response = await widgetAPIService.createWidget(config);
  // Успех
} catch (error) {
  if (error.response?.status === 503) {
    // Сервер временно недоступен
    showNotification('Сервер виджетов временно недоступен. Попробуйте позже.');
  } else if (error.response?.status === 401) {
    // Проблема с аутентификацией
    showNotification('Ошибка аутентификации. Обратитесь в поддержку.');
  } else {
    // Неизвестная ошибка
    showNotification('Произошла ошибка. Попробуйте позже.');
  }
}
Неочевидные моменты и рекомендации
1. Управление ожиданиями пользователей
Проблема: Пользователь регистрируется, ожидая сразу получить рабочий AI-виджет.

Решение:

На странице /dashboard/widget-settings показать статус:
✅ "Виджет создан" (когда API партнёра вернул widget_id)
🔄 "Виджет настраивается" (пока партнёр ещё не готов)
⏳ "Ожидание установки" (код получен, но не установлен на сайт)
🚀 "Виджет активен" (обнаружена установка на сайте)
2. Триал и биллинг
Проблема: Как отслеживать, что у пользователя закончился триал?

Решение:

В Supabase создать таблицу subscriptions:
sql
  CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    status TEXT CHECK (status IN ('trial', 'active', 'expired')),
    trial_ends_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
  );
При регистрации автоматически создавать подписку:
typescript
  trial_ends_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // +7 дней
В дашборде показывать:
typescript
  const daysLeft = Math.ceil((trialEndsAt - Date.now()) / (24 * 60 * 60 * 1000));
  // "Осталось 5 дней триала"
После истечения триала:
Виджет продолжает работать (не блокируем сразу)
Но показываем баннер: "Триал закончился. Оплатите для продолжения."
Отправляем email-напоминание
3. Onboarding (первый опыт пользователя)
Проблема: Пользователь зарегистрировался, но не знает что делать дальше.

Решение:

Показать модальное окно "Добро пожаловать!" после первого входа
Чек-лист задач:
  ☐ Настроить дизайн виджета
  ☐ Написать приветственный текст
  ☐ Установить код на сайт
  ☐ Проверить работу виджета
Каждый пункт — это ссылка на нужную страницу
Сохранять прогресс в user_progress таблице
4. PWA (Progressive Web App) для дашборда
Зачем: Ты хочешь, чтобы дашборд был mobile-friendly и как приложение.

Как реализовать:

Создать manifest.json:
json
   {
     "name": "Floqly Dashboard",
     "short_name": "Floqly",
     "description": "Управление умным виджетом",
     "start_url": "/dashboard",
     "display": "standalone",
     "background_color": "#ffffff",
     "theme_color": "#6366f1",
     "icons": [
       {
         "src": "/icon-192.png",
         "sizes": "192x192",
         "type": "image/png"
       },
       {
         "src": "/icon-512.png",
         "sizes": "512x512",
         "type": "image/png"
       }
     ]
   }
Добавить Service Worker для офлайн-работы (опционально для MVP)
В src/app/layout.tsx добавить:
typescript
   <link rel="manifest" href="/manifest.json" />
   <meta name="theme-color" content="#6366f1" />
   <meta name="apple-mobile-web-app-capable" content="yes" />
Пользователь сможет "Добавить на главный экран" и дашборд откроется как приложение
5. Оптимизация для Яндекс поиска
Особенности Яндекс (отличия от Google):

Яндекс больше ценит уникальный контент на русском
Яндекс обращает внимание на поведенческие факторы (время на сайте)
Яндекс учитывает региональность (важно для РФ бизнеса)
Что сделать:

Написать уникальные тексты (не копировать с других сайтов)
Сделать FAQ-секцию (Яндекс любит вопросы-ответы)
Добавить блог с полезными статьями (увеличивает вес сайта)
Настроить Яндекс.Справочник (карточка организации)
6. Мониторинг и аналитика
Что отслеживать:

Яндекс Метрика цели:

Регистрация завершена
Вход в дашборд
Настройки виджета сохранены
Код для установки скопирован
Бесплатный сервис использован
Настроить уведомления:

Новая регистрация → Telegram уведомление
Ошибка на сайте → Email тебе
Пользователь застрял (долго на одной странице) → записать в лог
7. Безопасность
Что защитить:

Rate limiting: Ограничить количество попыток логина (против brute force)
typescript
  // Supabase Auth делает это автоматически
CORS: Настроить правильно (только твой домен может делать запросы к API)
typescript
  // В next.config.js
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://floqly.ru' },
        ],
      },
    ];
  }
Environment variables: Никогда не коммитить .env.local в Git
bash
  # Добавить в .gitignore
  .env*.local
Supabase RLS (Row Level Security): Включить на всех таблицах
sql
  -- Пример: пользователь видит только свои виджеты
  CREATE POLICY "Users see own widgets"
    ON widget_configs FOR SELECT
    USING (auth.uid() = user_id);
8. Производительность
Оптимизации:

Code splitting: Next.js делает автоматически
Lazy loading компонентов:
typescript
  const ChatMonitor = dynamic(() => import('@/components/dashboard/ChatMonitor'), {
    loading: () => <Loader />,
    ssr: false, // Не рендерить на сервере
  });
Image optimization:
typescript
  import Image from 'next/image';

  <Image
    src="/hero-image.png"
    alt="Floqly виджет"
    width={800}
    height={600}
    priority // Для hero изображения
  />
Font optimization:
typescript
  import { Inter } from 'next/font/google';

  const inter = Inter({
    subsets: ['latin', 'cyrillic'],
    display: 'swap', // Избегает FOIT
  });
Резюме: Ключевые приоритеты
Must-have для MVP (без этого нельзя запускаться):
✅ Лендинг с работающим демо-виджетом — главная фишка
✅ Регистрация и вход — пользователи должны иметь аккаунты
✅ Базовый дашборд — хотя бы пустая страница с меню
✅ Страница настройки виджета — даже если сохраняется только локально
✅ Инструкции по оплате — чтобы не потерять деньги
✅ Docker деплой на TimeWeb — сайт должен быть в интернете
✅ HTTPS и базовый SEO — без этого Яндекс не проиндексирует
Nice-to-have (можно добавить после запуска):
🔵 Бесплатные сервисы (генераторы)
🔵 Real-time мониторинг чатов (нужен API партнёра)
🔵 PWA для мобильных
🔵 Блог с статьями
🔵 Интеграция с платёжными системами (ЮKassa)
🔵 Email-рассылки
🔵 Реферальная программа
Временные рамки (реалистичные):
Недели 1-2: Настройка проекта + Демо-виджет + Лендинг
Неделя 3: Аутентификация + Базовый дашборд
Неделя 4: Полировка + Деплой + Тестирование
Итого: 4 недели до MVP запуска

После запуска:

Собираешь обратную связь от первых пользователей
Чинишь баги
Добавляешь недостающие фичи
Интегрируешь с API партнёра (когда будет готов)
Следующие шаги
Создать проект (Фаза 1: Инициализация)
Сосредоточиться на демо-виджете (Фаза 2) — это твоя "визитная карточка"
Показать мне референсы дизайна, которые ты нашёл — я помогу реализовать
Обсудить с партнёром технические детали интеграции (формат API)
Двигаться по фазам последовательно