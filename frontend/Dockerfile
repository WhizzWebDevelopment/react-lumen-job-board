FROM node:14-alpine

WORKDIR /var/www

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
