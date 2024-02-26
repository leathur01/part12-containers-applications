FROM node:16 AS build-stage
WORKDIR /usr/src/app
COPY . .
RUN npm install

FROM build-stage AS test-stage
RUN CI=true npm test
RUN REACT_APP_BACKEND_URL=http://localhost:3000 npm run build

FROM nginx
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

