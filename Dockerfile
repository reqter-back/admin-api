FROM node:alpine AS adminpanel

WORKDIR /app
COPY . /app 
RUN npm install



