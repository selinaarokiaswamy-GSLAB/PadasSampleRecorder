# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14.19.0 as build-stage

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY src /app/src

COPY public /app/public

COPY create_env.sh /app/

ENV REACT_APP_BACKEND $REACT_APP_BACKEND

ENV REACT
RUN sh create_env.sh REACT_APP_BACKEND=$REACT_APP_BACKEND

RUN sh create_env.sh REACT_APP_BACKEND_PORT=${REACT_APP_BACKEND_PORT}

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.21.0-alpine as production

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY --from=build-stage /app/create_env.sh /usr/share/ngix/

EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"]
