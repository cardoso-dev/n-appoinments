const express = require('express');
var { ObjectId } = require('mongodb');
const router = express.Router()

module.exports = router;

async function getCollection(req) {
    const db = req.app.locals.appoinmentDb;
    const collection = db.collection('client');
    
    return collection
}

router.post('/client', async (req, res) => {
    const collection = await getCollection(req);
    try {
        // TODO: validate before saving
        const created = await collection.insertOne(req.body);
        if (created.acknowledged) {
            const cursor = collection.find({
                "_id": created.insertedId
            });
            const newClient = await cursor.next();
            res.status(200).json({
                "status": "succeeded",
                "client": newClient
            });
        } else {
            res.status(500).json({
                "status": "failed",
                "error": "Oops! something went wrong..."
            });
        }
    }  catch(error) {
        // TODO use logging instead of sending technical error
        res.status(500).json({
            "status": "failed",
            "error": error
        });
    }
});

router.get('/client', async (req, res) => {
    try {
        const collection = await getCollection(req);
        res.status(200).json(await collection.find().toArray());
    } catch(error) {
        // TODO use logging instead of sending technical error
        res.status(500).json({
            "status": "failed",
            "error": error
        });
    }
});

router.get('/client/:clientId', async (req, res) => {
    try {
        const collection = await getCollection(req);
        const client = await collection.findOne({
            "_id": new ObjectId(req.params.clientId)
        })
        if (client){
            res.status(200).json(client);
        } else {
            res.status(404).json();
        }
    } catch(error) {
        // TODO use logging instead of sending technical error
        res.status(500).json({
            "status": "failed",
            "error": error
        });
    }
});

router.patch('/client/:clientId', async (req, res) => {
    const collection = await getCollection(req);
    const clientId = new ObjectId(req.params.clientId);
    try {
        // TODO: validate before saving
        const updated = await collection.updateOne(
            {"_id": clientId},
            {$set: req.body});
        if (updated.matchedCount) {
            const cursor = collection.find({"_id": clientId});
            const updatedClient = await cursor.next();
            res.status(200).json({
                "status": "succeeded",
                "client": updatedClient
            });
        } else {
            res.status(404).json();
        }
    }  catch(error) {
        // TODO use logging instead of sending technical error
        res.status(500).json({
            "status": "failed",
            "error": error
        });
    }
});
