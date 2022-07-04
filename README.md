# n-appoinments

## About

Single appoinment restful API application backend for practicing node and express.

This project is intended to be the backend for the frontend in project [v-appoinments](https://github.com/cardoso-dev/v-appoinments)

The API will work with two entities:

```json
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

```json
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

## Install

After cloning install dependencies

```bash
$ cd n-appoinments
$ npm install
```

To run the server 

```bash
$ cd n-appoinments
$ npm start
```
