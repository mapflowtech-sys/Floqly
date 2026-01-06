# 🚀 Быстрый старт проекта Floqly

## ✅ Что уже готово

### Проект полностью инициализирован:
- ✅ Next.js 15 с TypeScript настроен
- ✅ Tailwind CSS с 8px grid системой
- ✅ Все зависимости установлены (375 пакетов)
- ✅ Структура папок создана
- ✅ Базовые конфиги настроены
- ✅ Supabase клиенты созданы
- ✅ TypeScript типы добавлены
- ✅ Dockerfile для деплоя готов
- ✅ Git инициализирован (2 коммита сделано)
- ✅ Проект запускается локально (проверено)

## 📋 Что тебе нужно сделать сейчас

### 1. Создать проект в Supabase ⚡ ВАЖНО

1. Зайти на https://supabase.com
2. Создать аккаунт (если ещё нет)
3. Нажать **"New project"**
4. Заполнить:
   - **Name:** Floqly
   - **Database Password:** придумай надёжный пароль (СОХРАНИ ЕГО!)
   - **Region:** Europe West (Stockholm или Frankfurt - ближе к России)
   - **Pricing Plan:** Free (для начала)
5. Нажать **"Create new project"**
6. Подождать 2-3 минуты (проект создаётся)

### 2. Скопировать ключи из Supabase

Когда проект создан:

1. Открыть **Settings → API** (в левом меню)
2. Найти и скопировать:
   - **Project URL** (например: `https://abcdefgh.supabase.co`)
   - **anon public** key (длинная строка начинается с `eyJhbG...`)

### 3. Создать файл .env.local

В папке проекта (`C:\Project\Floqly`) создать файл `.env.local`:

```env
# Вставь сюда ключи из Supabase
NEXT_PUBLIC_SUPABASE_URL=https://твой-проект.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=твой-анонимный-ключ

# Это пока оставь пустым
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**ВАЖНО:** Замени `https://твой-проект.supabase.co` и `твой-анонимный-ключ` на реальные значения!

### 4. Подключить проект к GitHub

Открой файл `GITHUB_SETUP.md` в этой папке - там подробная инструкция.

**Краткая версия:**

1. Создать репозиторий на GitHub с именем `floqly`
2. Скопировать URL репозитория
3. В терминале:
```bash
git branch -M main
git remote add origin https://github.com/твой-username/floqly.git
git push -u origin main
```

### 5. Запустить проект локально

```bash
npm run dev
```

Открыть в браузере: http://localhost:3000

Должна показаться страница с надписью **"Floqly - Проект инициализирован успешно 🚀"**

---

## 🎨 Следующие шаги (после референсов)

Когда скинешь референсы дизайна, я:

1. Проанализирую их
2. Предложу UI библиотеку (shadcn/ui или альтернативу)
3. Установлю выбранную библиотеку
4. Начнём делать демо-виджет (главная фича!)

---

## 📂 Структура проекта

```
floqly/
├── src/
│   ├── app/              # Страницы Next.js
│   │   ├── globals.css   # Глобальные стили
│   │   ├── layout.tsx    # Корневой layout
│   │   └── page.tsx      # Главная страница
│   ├── components/       # Компоненты (пока пустые)
│   │   ├── ui/          # UI компоненты
│   │   ├── landing/     # Лендинг
│   │   ├── widget/      # Демо-виджет
│   │   ├── dashboard/   # Дашборд
│   │   └── auth/        # Авторизация
│   ├── lib/
│   │   ├── supabase/    # Supabase клиенты
│   │   └── utils/       # Утилиты
│   ├── hooks/           # React хуки
│   ├── store/           # Zustand стор
│   └── types/           # TypeScript типы
├── public/              # Статика
├── .env.local           # ← СОЗДАЙ ЭТОТ ФАЙЛ!
├── .env.example         # Пример переменных
├── package.json
└── README.md
```

---

## 🛠 Полезные команды

```bash
npm run dev          # Запустить dev сервер
npm run build        # Production сборка
npm run lint         # Проверить код
npm run type-check   # Проверить типы TypeScript

git status           # Посмотреть изменения
git add .            # Добавить все файлы
git commit -m "..."  # Создать коммит
git push             # Отправить на GitHub
```

---

## ❓ Если что-то не работает

### Проект не запускается
```bash
# Переустановить зависимости
rm -rf node_modules package-lock.json
npm install
```

### Ошибки TypeScript
```bash
# Проверить типы
npm run type-check
```

### Ошибка Supabase
- Проверь что `.env.local` создан
- Проверь что ключи правильные (без пробелов)
- Перезапусти dev сервер

---

## 📞 Что дальше?

1. ✅ Создать проект в Supabase
2. ✅ Создать `.env.local` с ключами
3. ✅ Подключить к GitHub
4. ✅ Запустить локально (`npm run dev`)
5. 🎨 Скинуть мне референсы дизайна
6. 🚀 Начать разработку!

**Всё готово к работе!** 🎉
