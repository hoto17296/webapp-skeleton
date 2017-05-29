FROM node:alpine

ENV PORT 80

WORKDIR /app
ADD . /app
RUN npm install && mv node_modules /

EXPOSE 80

CMD ["npm", "start"]
