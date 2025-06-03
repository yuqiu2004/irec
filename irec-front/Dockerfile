# Stage 1: Build the project
FROM node:20.9.0-alpine AS builder

WORKDIR /app

# 复制依赖配置
COPY package.json yarn.lock ./

# 安装依赖
RUN yarn install

# 复制全部源代码
COPY . .

# 接收构建参数
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# 构建项目
RUN yarn build

# Stage 2: Create a lightweight runtime image
FROM node:20.9.0-alpine AS runner

WORKDIR /app

# 只复制运行所需的内容
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

# 设置环境变量
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

EXPOSE 3000

# 启动服务
CMD ["yarn", "start"]
