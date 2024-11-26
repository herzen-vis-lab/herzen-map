FROM node:20

# Оптимизация для production
ENV NODE_ENV production
ENV REACT_APP_BACKEND_URI="https://api-map.herzen.spb.ru"
ENV REACT_APP_ADMIN_USERNAME="RGPU"
ENV REACT_APP_ADMIN_PASSWORD_HASH="02a9806890e8d703fcc111190e72a6f5674773c93bcce3242cc795e9b8c9f0c5"

# Создаем рабочую директорию
WORKDIR /usr/src/app

# Копируем файлы проекта
COPY --chown=node:node . /usr/src/app

# Устанавливаем зависимости, собираем и чистим лишнее
RUN npm install && npm install -g serve && npm run build

# Переходим на пользователя node для безопасности
USER node

# Открываем порт для сервера
EXPOSE 3000

# Запуск статического сервера
CMD ["serve", "-s", "build"]
