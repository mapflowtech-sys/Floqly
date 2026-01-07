# Вывод: Multi-stage build для минимизации размера финального образа

# Базовый образ с Node.js
FROM node:20-alpine AS base

# Установка зависимостей (отдельный stage для кэширования)
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копируем только файлы с зависимостями для кэширования слоя
COPY package.json package-lock.json* ./
RUN npm ci

# Сборка приложения
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Вывод: переменные окружения для сборки (передаются через build args)
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

# Сборка Next.js приложения
RUN npm run build

# Production образ (минимальный)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Создаём пользователя для безопасности (не root)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем public директорию (статические файлы)
COPY --from=builder /app/public ./public

# Вывод: standalone режим Next.js создаёт минимальный набор файлов
# Копируем standalone файлы и .next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Запуск приложения
CMD ["node", "server.js"]
