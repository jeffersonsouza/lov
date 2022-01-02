ARG NODE_ENV=development

#Builder stage
FROM node:alpine as builder
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./
RUN npm cache clear --force && npm install

# Final stage/image
FROM node:alpine
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

COPY --from=builder node_modules node_modules

COPY . .

CMD ["npm", "start"]
