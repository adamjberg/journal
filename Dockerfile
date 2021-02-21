# stage1 - build react app first 
FROM node:15.6.0-alpine3.12 as fe-build
RUN apk add g++ make python2

COPY ./fe/package.json /app/fe/package.json
COPY ./fe/yarn.lock /app/fe/package.lock
RUN yarn --cwd /app/fe install

COPY ./fe /app/fe
RUN yarn --cwd /app/fe/ build

FROM nginx:alpine
COPY --from=fe-build /app/fe/build /app/fe/build

RUN mkdir -p /run/nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]