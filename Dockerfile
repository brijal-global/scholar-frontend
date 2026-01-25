# Use official Node.js image
FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies needed for build)
RUN npm install

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js app
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

# Get PORT argument from docker-compose
ARG APP_PORT
ENV APP_PORT=${APP_PORT}

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Start Next.js
CMD ["sh", "-c", "PORT=${APP_PORT} node server.js"]