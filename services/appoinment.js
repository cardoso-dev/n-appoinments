const { ObjectId } = require('mongodb');

const { getCollection } = require('./utils');


class AppoinmentService {
    
    async getAll (req) {
        try {
            const collection = await getCollection(req, "appoinment");
            return await collection.find().toArray();
        } catch(error) {
            // TODO use logging
            return false;
        }
    }

    async create (req) {
        const collection = await getCollection(req, "appoinment");
        try {
            // TODO: validate before saving
            const created = await collection.insertOne(req.body);
            if (created.acknowledged) {
                const cursor = collection.find({
                    "_id": created.insertedId
                });
                const newAppoinment = await cursor.next();
                return newAppoinment;
            } else {
                return false;
            }
        }  catch(error) {
            // TODO use logging instead of sending technical error
            return false;
        }
    }

    async getOne (req, appoinmentId) {
        const collection = await getCollection(req, "appoinment");
        let response = {
            'error': false,
            'found': false
        };
        try {
            const appoinment = await collection.findOne({
                "_id": new ObjectId(appoinmentId)
            });
            if (appoinment){
                response['appoinment'] = appoinment;
                response['found'] = true;
            } 
        } catch(error) {
            response['error'] = true;
        }
        return response;
    }

    async updateOne (req, appoinmentId) {
        const collection = await getCollection(req, "appoinment");
        const appoinmentIdObj = new ObjectId(appoinmentId);
        let response = {
            'error': false,
            'found': false
        };
        try {
            // TODO: validate before saving
            const updated = await collection.updateOne(
                {"_id": appoinmentIdObj},
                {$set: req.body});
            if (updated.matchedCount) {
                const cursor = collection.find({"_id": appoinmentIdObj});
                const updatedAppoinment = await cursor.next();
                response['appoinment'] = updatedAppoinment;
                response['found'] = true;
            }
        }  catch(error) {
            // TODO use logging instead of sending technical error
            response['error'] = true;
        }
        return response;
    }
}

module.exports = AppoinmentService;