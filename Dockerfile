
ENV PGHOST=""
ENV PGPORT=""
ENV PGUSER=""
ENV PGPASSWORD=""
ENV PGDATABASE=""
ENV MONGODBURI=""

FROM node:latest

WORKDIR /app
COPY package.json package.json
COPY tsconfig.json tsconfig.json
RUN npm install
RUN npm run build
COPY . .
EXPOSE 8080
CMD ["npm", "run", "start:prod"]
