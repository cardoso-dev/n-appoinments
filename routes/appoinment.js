const express = require('express');
const { ObjectId } = require('mongodb');

const { getCollection } = require('./utils');

const router = express.Router()

module.exports = router;

router.post('/', async (req, res) => {
    const collection = await getCollection(req, "appoinment");
    try {
        // TODO: validate before saving
        const created = await collection.insertOne(req.body);
        if (created.acknowledged) {
            const cursor = collection.find({
                "_id": created.insertedId
            });
            const newAppoinment = await cursor.next();
            res.status(200).json({
                "status": "succeeded",
                "appoinment": newAppoinment
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
        const collection = await getCollection(req, "appoinment");
        res.status(200).json(await collection.find().toArray());
    } catch(error) {
        // TODO use logging instead of sending technical error
        res.status(500).json({
            "status": "failed",
            "error": error
        });
    }
});

router.get('/:appoinmentId', async (req, res) => {
    try {
        const collection = await getCollection(req, "appoinment");
        const appoinment = await collection.findOne({
            "_id": new ObjectId(req.params.appoinmentId)
        })
        if (appoinment){
            res.status(200).json(appoinment);
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

router.patch('/:appoinmentId', async (req, res) => {
    const collection = await getCollection(req, "appoinment");
    const appoinmentId = new ObjectId(req.params.appoinmentId);
    try {
        // TODO: validate before saving
        const updated = await collection.updateOne(
            {"_id": appoinmentId},
            {$set: req.body});
        if (updated.matchedCount) {
            const cursor = collection.find({"_id": appoinmentId});
            const updatedAppoinment = await cursor.next();
            res.status(200).json({
                "status": "succeeded",
                "appoinment": updatedAppoinment
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
