# Express | typesSctipt | Postgress | Prima |redis,
## A simple project to study redis


## Installation

Dillinger requires [Node.js](https://nodejs.org/) v16+ to run.

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/gustavolopesv3/nodejs-redis.git
yarn
docker-compose up -d
yarn dev
```

## Docs

```
DEFAULT PORT: 3000
```
| Routes | Path | mothd|
| ------ | ------ | ----|
| users | /users | GET|
| users some cache | /users-cache |  GET|
| reset-cache | /reset-cache | POST (need pass key to delete in body)|

## Enviroments
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
REDIS_HOST=localhost
REDIS_PASSWORD=12344321

**by Gustavo Lopes**

