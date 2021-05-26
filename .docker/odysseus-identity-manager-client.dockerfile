# build stage
FROM node:lts-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM nginx:stable-alpine as production

# Copy nginx configuration
COPY ./.docker/ /etc/nginx/

# Copy build
COPY --from=build /app/dist /var/www/simoneromano.eu/public

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
