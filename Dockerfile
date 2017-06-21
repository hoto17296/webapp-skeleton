FROM node:alpine

ENV PORT 80
EXPOSE 80

RUN npm install -g nodemon

WORKDIR /app
ADD . /app
RUN npm install && mv node_modules /

CMD ["npm", "start"]
