
# ============================================================
# Platform Hub - Backstage Dockerfile
# Multi-stage, non-root production build
# ============================================================

# Stage 1: Install dependencies and build Backstage
FROM node:24-trixie AS build

USER node
WORKDIR /home/node

RUN mkdir -p app
WORKDIR /home/node/app

ENV PYTHON=/usr/bin/python3
ENV YARN_ENABLE_GLOBAL_CACHE=false
ENV YARN_CACHE_FOLDER=/home/node/.cache/yarn

# Copy dependency manifests first for better layer caching
COPY --chown=node:node \
    package.json yarn.lock backstage.json .yarnrc.yml ./

COPY --chown=node:node .yarn ./.yarn

# Copy workspace package manifests
COPY --chown=node:node \
    packages/app/package.json ./packages/app/package.json

COPY --chown=node:node \
    packages/backend/package.json ./packages/backend/package.json

# Install dependencies using a persistent BuildKit cache
RUN --mount=type=cache,target=/home/node/.cache/yarn,uid=1000,gid=1000,sharing=locked \
    yarn install --immutable

# Copy the application source
COPY --chown=node:node . .

# Validate TypeScript
RUN yarn tsc:full

# Build the Backstage backend and frontend assets
RUN yarn build:backend

# Extract workspace manifests and compiled application files
RUN mkdir -p /home/node/skeleton /home/node/bundle \
    && tar -xzf packages/backend/dist/skeleton.tar.gz \
        -C /home/node/skeleton \
    && tar -xzf packages/backend/dist/bundle.tar.gz \
        -C /home/node/bundle


# ============================================================
# Stage 2: Install production dependencies
# ============================================================
FROM node:24-trixie AS production-dependencies

USER node
WORKDIR /home/node

RUN mkdir -p app
WORKDIR /home/node/app

ENV NODE_ENV=production
ENV PYTHON=/usr/bin/python3
ENV YARN_ENABLE_GLOBAL_CACHE=false
ENV YARN_CACHE_FOLDER=/home/node/.cache/yarn

# Copy Yarn configuration and dependency manifests
COPY --from=build --chown=node:node \
    /home/node/app/package.json \
    /home/node/app/yarn.lock \
    /home/node/app/backstage.json \
    /home/node/app/.yarnrc.yml ./

COPY --from=build --chown=node:node \
    /home/node/app/.yarn ./.yarn

# Copy extracted workspace manifests
COPY --from=build --chown=node:node \
    /home/node/skeleton/ ./

# Install production dependencies only
RUN --mount=type=cache,target=/home/node/.cache/yarn,uid=1000,gid=1000,sharing=locked \
    yarn workspaces focus --all --production


# ============================================================
# Stage 3: Production runtime
# ============================================================
FROM node:24-trixie-slim AS runtime

# Run as an unprivileged user
USER node

WORKDIR /home/node

RUN mkdir -p app
WORKDIR /home/node/app

ENV NODE_ENV=production
ENV NODE_OPTIONS=--enable-source-maps

# Copy production dependencies
COPY --from=production-dependencies --chown=node:node \
    /home/node/app/ ./

# Copy compiled Backstage application
COPY --from=build --chown=node:node \
    /home/node/bundle/ ./

# Copy Backstage configuration
# GitHub OAuth credentials are injected at runtime
# using Kubernetes Secrets, not embedded in this image
COPY --chown=node:node \
    app-config.yaml app-config.production.yaml ./

# Copy software catalog entities and templates
# Includes the GitHub user identity configuration
COPY --chown=node:node \
    examples/ ./examples/

# Backstage backend and frontend port
EXPOSE 7007

# Start Backstage with production configuration
CMD ["node", "packages/backend", "--config", "app-config.yaml", "--config", "app-config.production.yaml"]
