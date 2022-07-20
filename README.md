# n-appoinments

## About

Single appoinment restful API application backend for practicing node and express.

This project is intended to be the backend for the frontend in project [v-appoinments](https://github.com/cardoso-dev/v-appoinments)

The API will work with two entities, persisted on a mongo db, according to the following schema:

```js
appoinment: {
    _id: ObjectId,
    date_hour: date,
    state: string,
    tag: string,
    notes: string,
    cost: double,
    paid: boolean,
    client_id: ObjectId
}
```

```js
client: {
    _id: ObjectId,
    firts_name: string,
    last_name: string,
    phones: [
        {
            number: string,
            type: string
        }
    ],
    address: {
        street: string,
        post_code: string,
        city: string
    },
    email: string
}

```

## Install (if you want to use docker skip to the next section)

After cloning install dependencies

```bash
$ cd n-appoinments
$ npm install
```

To run the server 
* If you run it this way you must provide a mongodb connection in database/db.js to connect with

```bash
$ cd n-appoinments
$ npm start
```

## Mount on docker containers

Download the node and mongo docker images:

```bash
$ docker pull node
$ docker pull mongo
```

Create docker volumens for mountig database
```bash
$ docker volume create n-appoinment-db-data
$ docker volume create n-appoinment-db-conf
```

Move to appoinment-docker-dev folder and run the docker compose up to build (first time) the backend image and containers
```bash
$ cd appoinment-docker-dev
$ docker-compose -f docker-compose-appoinment-dev.yml up --detach
```

After the first time you coul only start and stop the containers:
```bash
# Always ensure you are located in the docker folder
$ cd appoinment-docker-dev
# To start
$ docker-compose -f docker-compose-appoinment-dev.yml start
# To stop
$ docker-compose -f docker-compose-appoinment-dev.yml stop
```
