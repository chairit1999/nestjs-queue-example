FROM node:16-alpine as dependencies
WORKDIR /app
COPY package.json ./
RUN yarn install 

FROM node:16-alpine AS builder
WORKDIR /app
COPY nest-cli.json ./nest-cli.json
COPY package.json ./package.json
COPY tsconfig.build.json ./tsconfig.build.json
COPY tsconfig.json ./tsconfig.json
COPY src ./src
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package.json ./package.json
# RUN yarn test
RUN yarn build


FROM node:16-alpine AS production
WORKDIR /app
COPY package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["yarn", "start:prod"]

