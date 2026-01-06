# Floqly - Умный AI виджет для увеличения конверсии

B2B SaaS платформа для умного AI-виджета, который повышает конверсию сайтов клиентов.

## 🚀 Быстрый старт

### Требования
- Node.js 20.x или выше
- npm или yarn

### Установка

1. **Установить зависимости:**
```bash
npm install
```

2. **Настроить переменные окружения:**

Создать файл `.env.local` в корне проекта и скопировать содержимое из `.env.example`:

```bash
cp .env.example .env.local
```

Заполнить значения в `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` - URL проекта из Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key из Supabase

3. **Запустить проект локально:**
```bash
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000) в браузере.

## 📁 Структура проекта

```
floqly/
├── src/
│   ├── app/              # Next.js App Router (страницы и роутинг)
│   ├── components/       # React компоненты
│   │   ├── ui/          # UI компоненты (кнопки, инпуты и т.д.)
│   │   ├── landing/     # Компоненты лендинга
│   │   ├── widget/      # Демо-виджет
│   │   ├── dashboard/   # Компоненты личного кабинета
│   │   ├── auth/        # Компоненты аутентификации
│   │   └── shared/      # Переиспользуемые компоненты
│   ├── lib/             # Утилиты и библиотеки
│   │   ├── supabase/    # Supabase клиенты
│   │   ├── utils/       # Вспомогательные функции
│   │   └── api/         # API клиенты
│   ├── hooks/           # React хуки
│   ├── store/           # Zustand стор (глобальное состояние)
│   ├── types/           # TypeScript типы
│   └── styles/          # Глобальные стили
├── public/              # Статические файлы
├── .env.example         # Пример переменных окружения
└── README.md
```

## 🛠 Доступные команды

```bash
npm run dev          # Запуск dev сервера с Turbopack
npm run build        # Production сборка
npm run start        # Запуск production сервера
npm run lint         # Проверка ESLint
npm run type-check   # Проверка TypeScript типов
```

## 🔧 Технологический стек

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth + Realtime)
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion + GSAP
- **Icons:** Lucide React

## 📝 Конфигурация Supabase

### 1. Создание проекта
1. Зайти на [supabase.com](https://supabase.com)
2. Создать новый проект
3. Выбрать регион (ближайший к России: Stockholm или Frankfurt)
4. Сохранить пароль базы данных

### 2. Получение ключей
В разделе `Settings → API`:
- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Настройка Authentication
В разделе `Authentication → Providers`:
- Включить Email provider
- Настроить Redirect URLs:
  - `http://localhost:3000/auth/callback` (dev)
  - `https://floqly.ru/auth/callback` (production)

## 🐳 Docker

Проект настроен для деплоя через Docker.

```bash
# Сборка образа
docker build -t floqly .

# Запуск контейнера
docker run -p 3000:3000 floqly
```

## 📦 Деплой на TimeWeb

1. Подключить GitHub репозиторий к TimeWeb Cloud App Platform
2. Выбрать ветку `main`
3. TimeWeb автоматически найдёт `Dockerfile`
4. Настроить переменные окружения в панели TimeWeb
5. Деплой происходит автоматически при push в `main`

## 📚 Дополнительные ресурсы

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Вклад в проект

Проект в активной разработке. Следуйте правилам из `.claude/CLAUDE.md`.

## 📄 Лицензия

Private project.
