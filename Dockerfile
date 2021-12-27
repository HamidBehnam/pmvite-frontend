FROM node:16.13.0-alpine

WORKDIR /usr/app

RUN pwd

RUN node --version

ARG TARGET_ENVIRONMENT=production

COPY . .

RUN ls -la

RUN npm install

RUN npm run build -- --configuration=$TARGET_ENVIRONMENT

RUN ls -la

FROM nginx:1.21.4-alpine

WORKDIR /usr/share/nginx/html

COPY --from=0 /usr/app/dist/hamidev-angular-2395-src ./

RUN ls -la

RUN mkdir /etc/nginx/templates

COPY default.conf.template /etc/nginx/templates

ENV PORT=4200

EXPOSE $PORT
