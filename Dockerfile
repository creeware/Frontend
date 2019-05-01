FROM node:10
COPY ./ /app
WORKDIR /app
ARG VUE_APP_GITHUB_OAUTH_KEY
RUN touch .env && echo VUE_APP_GITHUB_OAUTH_KEY=${VUE_APP_GITHUB_OAUTH_KEY} >> .env
RUN npm install && npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY proxy.conf /etc/nginx/proxy.conf
EXPOSE 80
