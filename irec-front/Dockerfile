# frontend Dockerfile
FROM node:20.9.0 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:20.9.0-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]
