const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {connectDb, getDb} = require('./database/db');
const routesClient = require('./routes/client');
const routesAppoinment = require('./routes/appoinment');

const app = express();
const apiVersion = 'v1';
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(`/api/${apiVersion}/clients`, routesClient);
app.use(`/api/${apiVersion}/appoinments`, routesAppoinment);

connectDb()
    .then(() => {
        console.log("Successfully connected to MongoDB.");
        app.emit('dbReady');
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

app.on('dbReady', () => {
    app.listen(
        port,
        () => console.log(`Listening on port ${port}!`)
    );
});
