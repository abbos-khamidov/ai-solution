# 🚀 Vercel Deployment Guide

## Текущий статус деплоя

✅ Build запущен в регионе: **Washington, D.C. (iad1)**  
✅ Зависимости установлены: **258 packages**  
⏳ Идет сборка Next.js приложения...

---

## 📋 Что нужно сделать после успешной сборки

### 1. Настроить переменные окружения в Vercel

Перейдите в **Settings → Environment Variables** вашего проекта на Vercel и добавьте:

#### Обязательные переменные:

```bash
# URL вашего сайта
NEXT_PUBLIC_SITE_URL=https://ваш-домен.vercel.app

# Telegram Bot (для форм обратной связи)
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=ваш_chat_id
```

#### Опциональные переменные:

```bash
# Email интеграция (резервный канал)
RESEND_API_KEY=ваш_api_key
EMAIL_FROM=noreply@ваш-домен.com
LEADS_EMAIL_TO=ваш-email@gmail.com

# Analytics (если нужно)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 🤖 Как получить Telegram Bot Token

1. Откройте Telegram и найдите **@BotFather**
2. Отправьте команду `/newbot`
3. Следуйте инструкциям и скопируйте токен
4. Для получения Chat ID:
   - Найдите вашего бота в Telegram
   - Отправьте ему любое сообщение
   - Откройте: `https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates`
   - Найдите `"chat":{"id":` - это ваш Chat ID

---

## 🔄 Пересборка после добавления переменных

После добавления переменных окружения:

1. Перейдите в **Deployments**
2. Нажмите на последний деплой
3. Нажмите **Redeploy** (или просто сделайте новый коммит)

---

## ✅ Проверка деплоя

После успешной сборки проверьте:

- [ ] Сайт открывается по URL
- [ ] Все страницы загружаются
- [ ] Переключение языков RU/EN работает
- [ ] Кастомный курсор отображается
- [ ] Форма контактов отправляет сообщения в Telegram
- [ ] Все анимации работают корректно
- [ ] Нет ошибок в консоли браузера

---

## 🌐 Подключение своего домена

1. В Vercel перейдите в **Settings → Domains**
2. Добавьте ваш домен
3. Настройте DNS записи у вашего регистратора:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## 🐛 Решение возможных проблем

### Ошибка сборки: "Module not found"
→ Проверьте, что все зависимости в `package.json`

### Ошибка: "Environment variable not defined"
→ Добавьте переменные окружения в Vercel Settings

### Страницы не загружаются
→ Проверьте логи сборки в Vercel Dashboard

### Форма не отправляет сообщения
→ Проверьте настройки Telegram Bot Token и Chat ID

---

## 📊 Мониторинг

После деплоя следите за:
- **Analytics** - посещаемость сайта
- **Speed Insights** - производительность
- **Logs** - ошибки в runtime

---

## 🔐 Безопасность

Vercel.json уже настроен с:
- ✅ Security headers
- ✅ Cache-Control для статики
- ✅ XSS Protection
- ✅ Frame Protection

---

## 📞 Поддержка

Если возникли проблемы с деплоем, проверьте:
1. Логи сборки в Vercel Dashboard
2. Vercel Build Logs
3. Browser Console (F12)

---

**Текущий коммит:** `12993c6 (orange v2)`  
**Framework:** Next.js 14.2.35  
**Node Version:** LTS (автоматически на Vercel)  
**Region:** Washington, D.C. (iad1)
