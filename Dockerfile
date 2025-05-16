
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY --from=builder /app/build ./build

CMD ["npm", "start"]