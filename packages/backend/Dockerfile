# Stage 1: Build the application
FROM node:24-trixie AS build

USER node
WORKDIR /home/node

RUN mkdir -p app
WORKDIR /home/node/app

ENV PYTHON=/usr/bin/python3

COPY --chown=node:node . .

RUN yarn install --immutable
RUN yarn tsc:full
RUN yarn build:backend

# Extract the dependency manifests and compiled application
RUN mkdir -p /home/node/skeleton /home/node/bundle \
    && tar -xzf packages/backend/dist/skeleton.tar.gz \
        -C /home/node/skeleton \
    && tar -xzf packages/backend/dist/bundle.tar.gz \
        -C /home/node/bundle


# Stage 2: Install production dependencies
FROM node:24-trixie AS production-dependencies

USER node
WORKDIR /home/node

RUN mkdir -p app
WORKDIR /home/node/app

ENV NODE_ENV=production
ENV PYTHON=/usr/bin/python3

COPY --from=build --chown=node:node \
    /home/node/app/package.json \
    /home/node/app/yarn.lock \
    /home/node/app/backstage.json \
    /home/node/app/.yarnrc.yml ./

COPY --from=build --chown=node:node \
    /home/node/app/.yarn ./.yarn

COPY --from=build --chown=node:node \
    /home/node/skeleton/ ./

RUN yarn workspaces focus --all --production \
    && yarn cache clean --all


# Stage 3: Package and run the application
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