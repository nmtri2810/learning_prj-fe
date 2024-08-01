# Use the official Node.js image
ARG NODE_VERSION=21.7.1
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /app

FROM base as deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --production --frozen-lockfile

FROM deps as build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM base as final
ENV NODE_ENV production
USER node
COPY package.json .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/src ./src
EXPOSE 3000
CMD ["yarn", "start"]
