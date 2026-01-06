# 🚀 Инструкция деплоя на TimeWeb (Docker Compose)

## ❌ Проблема

TimeWeb не находит `docker-compose.yml` файл после клонирования репозитория.

**Ошибка**:
```
ERROR | Sanitizer check error No compose file found
```

## ✅ Решение

TimeWeb требует специфичную настройку для Docker Compose деплоя.

---

## 📋 Вариант 1: Деплой через TimeWeb панель (РЕКОМЕНДУЕТСЯ)

### Шаг 1: Настройка в панели TimeWeb

1. **Войдите в панель управления TimeWeb**
2. **Перейдите в раздел "Docker Lite"** или "Docker Compose"
3. **Создайте новый сервис**
4. **Выберите способ**: "Из репозитория GitHub"

### Шаг 2: Настройки репозитория

```
Repository URL: https://github.com/mapflowtech-sys/Floqly.git
Branch: Floqly
Compose File Path: docker-compose.yml  (или docker-compose.yaml)
```

### Шаг 3: Переменные окружения

В панели TimeWeb добавьте переменные окружения:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ваш-проект.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_ключ
```

### Шаг 4: Настройки портов

```
Internal Port: 3000
External Port: 80 (или любой доступный)
```

### Шаг 5: Запуск

Нажмите **"Развернуть"** или **"Deploy"**

---

## 📋 Вариант 2: Ручной деплой через SSH

Если панель не работает, используйте SSH доступ:

### Шаг 1: Подключитесь к серверу

```bash
ssh ваш-пользователь@ваш-сервер-timeweb
```

### Шаг 2: Клонируйте репозиторий

```bash
# Создайте директорию для проекта
mkdir -p ~/floqly
cd ~/floqly

# Клонируйте репозиторий
git clone https://github.com/mapflowtech-sys/Floqly.git .
git checkout Floqly
```

### Шаг 3: Создайте .env файл

```bash
nano .env
```

Добавьте:
```env
NEXT_PUBLIC_SUPABASE_URL=https://ваш-проект.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_ключ
```

Сохраните: `Ctrl+X`, затем `Y`, затем `Enter`

### Шаг 4: Проверьте файлы

```bash
# Проверьте что файлы на месте
ls -la | grep docker

# Должны быть:
# docker-compose.yml
# docker-compose.yaml
# Dockerfile
```

### Шаг 5: Запустите Docker Compose

```bash
# Сборка и запуск
docker-compose up -d --build

# Проверка статуса
docker-compose ps

# Просмотр логов
docker-compose logs -f floqly
```

### Шаг 6: Проверка работы

Откройте в браузере: `http://ваш-ip-сервера:3000`

---

## 📋 Вариант 3: Простой Docker (без Compose)

Если Docker Compose не работает вообще, используйте простой Docker:

### Сборка образа

```bash
cd ~/floqly

docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=ваш_url \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_ключ \
  -t floqly:latest .
```

### Запуск контейнера

```bash
docker run -d \
  --name floqly \
  -p 3000:3000 \
  --restart unless-stopped \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_SUPABASE_URL=ваш_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_ключ \
  floqly:latest
```

### Проверка

```bash
# Проверить что контейнер запустился
docker ps

# Посмотреть логи
docker logs -f floqly

# Проверить в браузере
# http://ваш-ip:3000
```

---

## 🔧 Настройка Nginx (для домена)

Если хотите использовать домен вместо IP:порт

### Создайте конфиг Nginx

```bash
sudo nano /etc/nginx/sites-available/floqly
```

Добавьте:
```nginx
server {
    listen 80;
    server_name ваш-домен.ru www.ваш-домен.ru;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Активируйте конфиг

```bash
sudo ln -s /etc/nginx/sites-available/floqly /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Установите SSL

```bash
sudo certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru
```

---

## 🛠 Файлы проекта

### docker-compose.yml

```yaml
version: '3.8'

services:
  floqly:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NEXT_PUBLIC_SUPABASE_URL: ${NEXT_PUBLIC_SUPABASE_URL}
        NEXT_PUBLIC_SUPABASE_ANON_KEY: ${NEXT_PUBLIC_SUPABASE_ANON_KEY}
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
    restart: unless-stopped
    networks:
      - floqly-network

networks:
  floqly-network:
    driver: bridge
```

### Dockerfile

```dockerfile
# Multi-stage build
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

---

## 🆘 Решение проблем

### Проблема: "No compose file found"

**Причина**: TimeWeb не находит docker-compose.yml

**Решения**:
1. Убедитесь что файл называется точно `docker-compose.yml` (с `.yml`)
2. Попробуйте создать `docker-compose.yaml` (с `.yaml`)
3. Укажите путь к файлу в настройках TimeWeb явно
4. Используйте SSH метод (Вариант 2)

### Проблема: Контейнер не запускается

```bash
# Проверьте логи
docker-compose logs floqly

# Проверьте переменные окружения
docker-compose config

# Пересоберите
docker-compose down
docker-compose up -d --build
```

### Проблема: Ошибка сборки

```bash
# Очистите кэш Docker
docker system prune -a

# Пересоберите
docker-compose build --no-cache
docker-compose up -d
```

### Проблема: Порт занят

```bash
# Проверьте что слушает порт 3000
sudo lsof -i :3000

# Убейте процесс если нужно
sudo kill -9 PID

# Или измените порт в docker-compose.yml
ports:
  - "8080:3000"  # Внешний 8080 вместо 3000
```

---

## 📊 Проверка после деплоя

### 1. Проверьте контейнер

```bash
docker ps
# Должен быть запущен floqly
```

### 2. Проверьте логи

```bash
docker-compose logs -f floqly
# Должно быть: "Ready in XXXms"
```

### 3. Проверьте в браузере

```
http://ваш-ip:3000
```

Должна открыться главная страница Floqly.

### 4. Проверьте переменные

```bash
docker exec floqly env | grep SUPABASE
```

Должны быть ваши URL и ключи.

---

## 💡 Рекомендации

1. **Используйте Вариант 2 (SSH)** если панель TimeWeb не работает
2. **Создайте оба файла**: `docker-compose.yml` И `docker-compose.yaml`
3. **Проверьте .env файл** - он должен быть в корне проекта
4. **Не храните секреты в git** - .env.local уже в .gitignore
5. **Используйте Nginx** для production (домен + SSL)

---

## 📞 Поддержка

Если проблемы остаются:

1. Проверьте логи TimeWeb в панели управления
2. Проверьте логи Docker: `docker-compose logs`
3. Напишите в поддержку TimeWeb с описанием проблемы
4. Вернитесь в Claude Code - я помогу разобраться

---

## ✅ Чеклист успешного деплоя

- [ ] Репозиторий склонирован
- [ ] Ветка `Floqly` выбрана
- [ ] Файл .env создан с правильными значениями
- [ ] Docker/Docker Compose установлен
- [ ] Контейнер собрался без ошибок
- [ ] Контейнер запущен (docker ps показывает)
- [ ] Порт 3000 доступен
- [ ] Страница открывается в браузере
- [ ] Нет ошибок в логах

---

**Успехов с деплоем! 🚀**
