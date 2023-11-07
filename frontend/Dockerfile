# Используйте Node.js в качестве базового образа
FROM node:20-alpine

# Установите рабочую директорию
WORKDIR /app

# Установите зависимости для Nuxt.js
COPY ./package*.json ./
RUN npm install

# Скопируйте все файлы из frontend директории в контейнер
COPY ./ .

# Запустите Nuxt.js приложение в development режиме
CMD ["npm", "run", "dev"]
