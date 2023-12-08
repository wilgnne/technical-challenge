FROM node:20.10.0-alpine3.18 AS base

WORKDIR /usr/src/app
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:20.10.0-alpine3.18

WORKDIR /usr/src/app

COPY --from=base /usr/src/app/package.json ./
COPY --from=base /usr/src/app/yarn.lock ./
COPY --from=base /usr/src/app/tsconfig.base.json ./

COPY --from=base /usr/src/app/packages/api/dist ./packages/api/dist
COPY --from=base /usr/src/app/packages/api/package.json ./packages/api/package.json

COPY --from=base /usr/src/app/packages/app/dist ./packages/app/dist
COPY --from=base /usr/src/app/packages/app/package.json ./packages/app/package.json

COPY --from=base /usr/src/app/packages/domain/dist ./packages/domain/dist
COPY --from=base /usr/src/app/packages/domain/package.json ./packages/domain/package.json

COPY --from=base /usr/src/app/packages/infra/dist ./packages/infra/dist
COPY --from=base /usr/src/app/packages/infra/package.json ./packages/infra/package.json

COPY --from=base /usr/src/app/packages/migration-runner ./packages/migration-runner

RUN yarn install --production

EXPOSE 3000

HEALTHCHECK  --interval=5m --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

ENTRYPOINT ["yarn", "start"]
