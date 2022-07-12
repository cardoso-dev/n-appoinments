const express = require('express');
const { ObjectId } = require('mongodb');

const { getCollection } = require('./utils');

const router = express.Router()

module.exports = router;

router.post('/', async (req, res) => {
    const collection = await getCollection(req, "client");
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

router.get('/', async (req, res) => {
    try {
        const collection = await getCollection(req, "client");
        res.status(200).json(await collection.find().toArray());
    } catch(error) {
        // TODO use logging instead of sending technical error
        res.status(500).json({
            "status": "failed",
            "error": error
        });
    }
});

router.get('/:clientId', async (req, res) => {
    try {
        const collection = await getCollection(req, "client");
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

router.patch('/:clientId', async (req, res) => {
    const collection = await getCollection(req, "client");
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
