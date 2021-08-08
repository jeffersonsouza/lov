FROM composer as composer

COPY . /app
RUN adduser nobody www-data \
    && chown -R nobody.www-data /app

RUN composer install --prefer-dist --no-dev --no-suggest --no-scripts --optimize-autoloader --classmap-authoritative --apcu-autoloader

FROM node:alpine as node

WORKDIR /usr/src/app
COPY ./public/app /usr/src/app

RUN npm install && npm run build

FROM jeffersonsouza/php:8-nginx
LABEL maintainer = 'Jefferson Souza<jefferson.souza@hotelbird.com>'

COPY --from=composer /app/ /var/www/api/
COPY --from=node /usr/src/app/www/ /var/www/app/
COPY config/nginx/ /etc/nginx/http.d/
ADD https://raw.githubusercontent.com/mitchellkrogza/nginx-ultimate-bad-bot-blocker/master/conf.d/globalblacklist.conf /etc/nginx/security/lists/globalblacklist.conf
COPY config/php/php-fpm.conf /etc/php/fpm
COPY config/php/custom.ini /etc/php8/conf.d/api.ini

RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
    php8-fileinfo && \
    rm -rf /tmp/* /var/cache/apk/* \
    && rm -fr /var/www/api/public/app

WORKDIR /var/www/html
