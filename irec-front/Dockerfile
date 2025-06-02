# frontend Dockerfile

FROM node:20.9.0 AS builder

WORKDIR /app
COPY . .

# 接收构建参数（必须加）
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm install && npm run build

FROM node:20.9.0-alpine
WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
