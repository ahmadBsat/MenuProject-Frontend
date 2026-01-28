ARG NODE_VERSION=22.9.0
# Stage 1: Dependencies
FROM node:${NODE_VERSION}-alpine AS deps
LABEL org.opencontainers.image.source=https://github.com/ahmadbsat/menuproject-frontend
# Install git as it's required by npm for some dependencies
RUN apk add --no-cache git
WORKDIR /usr/src/app
# Copy package files
COPY package*.json ./
# Install dependencies
RUN npm install

# Stage 2: Builder
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /usr/src/app
# Copy dependencies from deps stage
COPY --from=deps /usr/src/app/node_modules ./node_modules
# Copy source code
COPY . .
# Set environment variables
ARG NEXT_PUBLIC_BACKEND_HOST
ARG SOURCE_COMMIT
ENV NEXT_PUBLIC_BACKEND_HOST=${NEXT_PUBLIC_BACKEND_HOST}
ENV SOURCE_COMMIT=${SOURCE_COMMIT}
# Build the Next.js application (will create standalone output)
RUN npm run build

# Stage 3: Runner (Standalone Mode)
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /usr/src/app
# Set production environment
ENV NODE_ENV=production
ARG SOURCE_COMMIT
ENV SOURCE_COMMIT=${SOURCE_COMMIT}

# Copy standalone output from builder
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static
COPY --from=builder /usr/src/app/public ./public

# Create cache directory and set ownership to node user
RUN mkdir -p .next/cache/images && \
    chown -R node:node .next && \
    chown -R node:node .

# Run the application as a non-root user
USER node

# Expose the port that the application listens on
EXPOSE 3000

# Run the standalone server
CMD ["node", "server.js"]
