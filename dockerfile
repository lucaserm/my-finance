FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat build-base python3
WORKDIR /app

COPY package.json  pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --ignore-scripts && pnpm rebuild

FROM base AS builder
WORKDIR /app

ENV CI=true
COPY package.json  pnpm-lock.yaml* .pnpmrc ./
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Skip pnpm dependency verification and just run the build
RUN corepack enable pnpm && npm_config_node_gyp=$(which node-gyp) next build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/drizzle ./drizzle
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "scripts/migrate-and-start.js"]
