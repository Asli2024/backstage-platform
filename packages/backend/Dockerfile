# Stage 1: Install dependencies and build Backstage
FROM node:24-trixie AS build

USER node
WORKDIR /home/node

RUN mkdir -p app
WORKDIR /home/node/app

ENV PYTHON=/usr/bin/python3
ENV YARN_ENABLE_GLOBAL_CACHE=false
ENV YARN_CACHE_FOLDER=/home/node/.cache/yarn

# Copy dependency manifests and Yarn configuration first.
# Source-only changes will not invalidate the install layer.
COPY --chown=node:node \
    package.json yarn.lock backstage.json .yarnrc.yml ./

COPY --chown=node:node .yarn ./.yarn

COPY --chown=node:node \
    packages/app/package.json ./packages/app/package.json

COPY --chown=node:node \
    packages/backend/package.json ./packages/backend/package.json

# Keep downloaded packages in a persistent build cache.
# UID and GID 1000 belong to the node user.
RUN --mount=type=cache,target=/home/node/.cache/yarn,uid=1000,gid=1000,sharing=locked \
    yarn install --immutable

# Copy application sources after installing dependencies.
COPY --chown=node:node . .

RUN yarn tsc:full
RUN yarn build:backend

# Extract workspace manifests and compiled application files.
RUN mkdir -p /home/node/skeleton /home/node/bundle \
    && tar -xzf packages/backend/dist/skeleton.tar.gz \
        -C /home/node/skeleton \
    && tar -xzf packages/backend/dist/bundle.tar.gz \
        -C /home/node/bundle


# Stage 2: Install production dependencies only
FROM node:24-trixie AS production-dependencies

USER node
WORKDIR /home/node

RUN mkdir -p app
WORKDIR /home/node/app

ENV NODE_ENV=production
ENV PYTHON=/usr/bin/python3
ENV YARN_ENABLE_GLOBAL_CACHE=false
ENV YARN_CACHE_FOLDER=/home/node/.cache/yarn

COPY --from=build --chown=node:node \
    /home/node/app/package.json \
    /home/node/app/yarn.lock \
    /home/node/app/backstage.json \
    /home/node/app/.yarnrc.yml ./

COPY --from=build --chown=node:node \
    /home/node/app/.yarn ./.yarn

COPY --from=build --chown=node:node \
    /home/node/skeleton/ ./

RUN --mount=type=cache,target=/home/node/.cache/yarn,uid=1000,gid=1000,sharing=locked \
    yarn workspaces focus --all --production


# Stage 3: Package and run Backstage
FROM node:24-trixie-slim AS runtime

USER node
WORKDIR /home/node

RUN mkdir -p app
WORKDIR /home/node/app

ENV NODE_ENV=production
ENV NODE_OPTIONS=--enable-source-maps

COPY --from=production-dependencies --chown=node:node \
    /home/node/app/ ./

COPY --from=build --chown=node:node \
    /home/node/bundle/ ./

COPY --chown=node:node \
    app-config.yaml app-config.production.yaml ./

COPY --chown=node:node examples/ ./examples/

EXPOSE 7007

CMD ["node", "packages/backend", "--config", "app-config.yaml", "--config", "app-config.production.yaml"]