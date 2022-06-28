FROM node:16-alpine3.15 AS BUILD_IMAGE

# install required dependencies for build
RUN apk --no-cache add curl bash

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sf https://gobinaries.com/tj/node-prune | sh -s -- -b /usr/local/bin

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=production

COPY . .

RUN npm run build

# remove development dependencies
RUN npm prune --production

# run node prune
RUN /usr/local/bin/node-prune

# Build app as production, ignoring the non-required types/dev dependencies to make app lightweight.
FROM node:16-alpine3.15 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules

CMD ["node", "dist/main"]
