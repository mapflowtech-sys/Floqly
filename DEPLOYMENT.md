# 🚀 Инструкция по деплою Floqly на TimeWeb

## Предварительные требования

- Аккаунт на TimeWeb с доступом к Docker Lite
- Git установлен локально
- Доступ к Supabase (URL и Anon Key)

## 📦 Подготовка проекта

### 1. Клонирование репозитория

```bash
git clone https://github.com/ВАШ_USERNAME/Floqly.git
cd Floqly
git checkout Floqly
```

### 2. Настройка переменных окружения

Создайте файл `.env.local` на сервере TimeWeb:

```env
NEXT_PUBLIC_SUPABASE_URL=ваш_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_supabase_anon_key
```

## 🐳 Деплой через Docker на TimeWeb

### Вариант 1: Docker Compose (рекомендуется)

1. **Загрузите проект на сервер**

```bash
# На локальной машине
git archive --format=tar.gz -o floqly.tar.gz Floqly

# Загрузите на сервер через SFTP или панель управления TimeWeb
```

2. **На сервере TimeWeb**

```bash
# Распакуйте архив
tar -xzf floqly.tar.gz
cd Floqly

# Создайте .env файл с вашими переменными
nano .env.local

# Запустите с помощью Docker Compose
docker-compose up -d
```

3. **Проверка статуса**

```bash
docker-compose ps
docker-compose logs -f floqly
```

### Вариант 2: Docker напрямую

```bash
# Сборка образа
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=ваш_url \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_key \
  -t floqly:latest .

# Запуск контейнера
docker run -d \
  --name floqly \
  -p 3000:3000 \
  --restart unless-stopped \
  -e NEXT_PUBLIC_SUPABASE_URL=ваш_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_key \
  floqly:latest
```

## 🔧 Настройка Nginx (проксирование)

Если вы хотите использовать свой домен, настройте Nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

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

Затем получите SSL сертификат:

```bash
certbot --nginx -d yourdomain.com
```

## 🔄 Обновление приложения

```bash
# Остановите текущий контейнер
docker-compose down

# Получите последние изменения
git pull origin Floqly

# Пересоберите и запустите
docker-compose up -d --build

# Или без docker-compose:
docker stop floqly
docker rm floqly
docker build -t floqly:latest .
docker run -d --name floqly -p 3000:3000 floqly:latest
```

## 📊 Мониторинг

### Просмотр логов

```bash
# С docker-compose
docker-compose logs -f floqly

# Без docker-compose
docker logs -f floqly
```

### Проверка использования ресурсов

```bash
docker stats floqly
```

## 🛠 Решение проблем

### Контейнер не запускается

```bash
# Проверьте логи
docker logs floqly

# Проверьте статус
docker ps -a

# Перезапустите
docker restart floqly
```

### Переменные окружения не загружаются

Убедитесь, что файл `.env.local` создан и содержит правильные значения:

```bash
cat .env.local
```

### Порт 3000 занят

Измените порт в `docker-compose.yml` или команде запуска:

```yaml
ports:
  - "8080:3000"  # Внешний порт 8080, внутренний 3000
```

## 🎯 Проверка работы

После деплоя откройте в браузере:

- `http://ваш-сервер-ip:3000`
- Или `https://yourdomain.com` (если настроили домен)

## 📝 Важные замечания

1. **Безопасность**: Храните `.env.local` в безопасности, не коммитьте его в Git
2. **Оптимизация**: Образ использует multi-stage build для минимального размера
3. **Производительность**: Next.js standalone режим обеспечивает быстрый запуск
4. **Мониторинг**: Настройте логирование для отслеживания ошибок

## 🆘 Поддержка

При возникновении проблем:
1. Проверьте логи контейнера
2. Убедитесь, что все переменные окружения установлены
3. Проверьте доступность Supabase
4. Свяжитесь с поддержкой TimeWeb при проблемах с хостингом
