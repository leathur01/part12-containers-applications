FROM node:16
WORKDIR /usr/src/app
COPY . .
# TODO: Use the .env file instead of the ENV keyword
ENV MONGODB_URI=mongodb+srv://fullstack:Dungvjppr0123@cluster0.pigtf94.mongodb.net/phoneBook?retryWrites=true&w=majority
RUN npm install
CMD npm run dev