# 1. Dependencies Stage
FROM node:18-alpine AS deps
WORKDIR /app

# package.json과 package-lock.json만 먼저 복사 (캐시 최적화)
COPY package*.json ./
RUN npm ci --only=production --ignore-scripts

# 2. Build Stage
FROM node:18-alpine AS builder
WORKDIR /app

# 의존성 파일들 먼저 복사
COPY package*.json ./
RUN npm ci --ignore-scripts

# 소스코드 복사 (의존성 변경없으면 위 단계는 캐시됨)
COPY . .

# Next.js telemetry 비활성화 (빌드 속도 향상)
ENV NEXT_TELEMETRY_DISABLED 1

# 빌드 실행
RUN npm run build

# 3. Production Stage
FROM node:18-alpine AS runner
WORKDIR /app

# 성능 최적화 환경변수
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# 보안: non-root 유저 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Next.js 빌드 결과물만 복사
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
