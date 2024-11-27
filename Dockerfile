# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.9.0

FROM node:${NODE_VERSION}-alpine
LABEL org.opencontainers.image.source=https://github.com/ahmadbsat/menuproject-frontend

# Use production node environment by default.
ENV NODE_ENV production

# Install git as it's required by npm for some dependencies.
RUN apk add --no-cache git

WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them into
# this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.npm \
    npm install

# Copy the rest of the source files into the image.
COPY . .

# Build the Next.js application.
RUN npm run build

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm run start
