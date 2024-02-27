FROM node:16
WORKDIR /usr/src/app/
COPY . .
ENV MONGODB_URI=mongodb+srv://fullstack:Dungvjppr0123@cluster0.pigtf94.mongodb.net/phoneBook?retryWrites=true&w=majority
ENV PORT=3001
RUN cd ./backend && npm run build:ui
CMD cd ./backend && npm start