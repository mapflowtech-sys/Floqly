# Подключение проекта к GitHub

## Шаг 1: Создать репозиторий на GitHub

1. Зайти на https://github.com
2. Нажать **"New repository"** (зелёная кнопка справа вверху)
3. Заполнить форму:
   - **Repository name:** `floqly`
   - **Description:** "Floqly - Умный AI виджет для увеличения конверсии"
   - **Visibility:** Private (рекомендуется) или Public
   - **НЕ ставить галочки:**
     - [ ] Add a README file
     - [ ] Add .gitignore
     - [ ] Choose a license
4. Нажать **"Create repository"**

## Шаг 2: Скопировать URL репозитория

После создания репозитория GitHub покажет страницу с инструкциями.

Скопируй **HTTPS URL** репозитория, он будет вида:
```
https://github.com/твой-username/floqly.git
```

## Шаг 3: Подключить локальный проект к GitHub

Открой терминал в папке проекта (`C:\Project\Floqly`) и выполни команды:

### Вариант 1: HTTPS (рекомендуется, проще)

```bash
# Указать имя ветки main (вместо master)
git branch -M main

# Добавить remote origin (замени URL на свой!)
git remote add origin https://github.com/твой-username/floqly.git

# Отправить код на GitHub
git push -u origin main
```

**При первом push** GitHub может попросить авторизоваться:
- Логин: твой GitHub username
- Пароль: **НЕ пароль от аккаунта**, а **Personal Access Token**

**Как создать Personal Access Token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Поставить галочку `repo` (полный доступ к репозиториям)
4. Скопировать токен и использовать вместо пароля

---

### Вариант 2: SSH (для продвинутых)

Если у тебя настроен SSH ключ:

```bash
git branch -M main
git remote add origin git@github.com:твой-username/floqly.git
git push -u origin main
```

---

## Шаг 4: Проверить что всё загрузилось

1. Обновить страницу репозитория на GitHub
2. Должны появиться все файлы проекта
3. Проверить что файл `.env.local` **НЕ загрузился** (он в .gitignore)

## Шаг 5: Автоматический деплой на TimeWeb (настроим позже)

Когда будем готовы к первому деплою:

1. Зайти в **TimeWeb Cloud App Platform**
2. Создать новое приложение
3. Выбрать **"Deploy from Git"**
4. Подключить GitHub аккаунт (если ещё не подключен)
5. Выбрать репозиторий `floqly`
6. Выбрать ветку `main`
7. TimeWeb автоматически найдёт `Dockerfile` и начнёт деплой
8. Настроить переменные окружения в панели TimeWeb:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

После этого каждый `git push origin main` будет автоматически запускать деплой на TimeWeb!

---

## Полезные Git команды

```bash
# Проверить статус (какие файлы изменены)
git status

# Добавить все изменённые файлы
git add .

# Создать коммит
git commit -m "Описание изменений"

# Отправить на GitHub
git push

# Посмотреть историю коммитов
git log --oneline

# Посмотреть к какому репозиторию подключен
git remote -v
```

---

## Если что-то пошло не так

### Ошибка: "remote origin already exists"
```bash
# Удалить старый origin
git remote remove origin

# Добавить новый
git remote add origin https://github.com/твой-username/floqly.git
```

### Ошибка: "failed to push some refs"
```bash
# Принудительно отправить (только для первого раза!)
git push -u origin main --force
```

### Ошибка: "Authentication failed"
- Проверь что используешь **Personal Access Token**, а не пароль
- Токен должен иметь права на `repo`

---

**Готово!** Теперь проект на GitHub и готов к автоматическому деплою 🚀
