const express = require('express');
const bodyParser = require('body-parser');

const {connectDb, getDb} = require('./database/db.js');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let appoinmentDb;
connectDb((err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Successfully connected to MongoDB.");
    appoinmentDb = getDb();
});

// TODO move persistence to the appoinmentDb
let clients = [];
let appoinments = [];

// Client endpoints for: POST and GET
app.post('/client', (req, res) => {
    // TODO: validate before saving
    clients.push(req.body);
    res.json({
        "status": "succeeded"
    });
});
app.get('/client', (req, res) => {
    res.json(clients);
});

// Appoinment endpoints for: POST and GET
app.post('/appoinment', (req, res) => {
    // TODO: validate before saving
    appoinments.push(req.body);
    res.json({
        "status": "succeeded"
    });
});
app.get('/appoinment', (req, res) => {
    res.json(appoinments);
});

app.listen(
    port,
    () => console.log(`Listening on port ${port}!`)
);
