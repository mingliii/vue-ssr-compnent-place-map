FROM node:14

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:prod

# RUN npm ci --only=production

EXPOSE 3000

CMD [ "npm", "run", "server:prod" ]
