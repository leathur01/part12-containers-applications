FROM node:16
WORKDIR /usr/src/app
COPY . . 
EXPOSE 5173
RUN npm install
CMD npm run dev 