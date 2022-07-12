const { ObjectId } = require('mongodb');

const { getCollection } = require('./utils');


class ClientService {
    
    async getAll (req) {
        try {
            const collection = await getCollection(req, "client");
            return await collection.find().toArray();
        } catch(error) {
            // TODO use logging
            return false;
        }
    }

    async create (req) {
        const collection = await getCollection(req, "client");
        try {
            // TODO: validate before saving
            const created = await collection.insertOne(req.body);
            if (created.acknowledged) {
                const cursor = collection.find({
                    "_id": created.insertedId
                });
                const newClient = await cursor.next();
                return newClient;
            } else {
                return false;
            }
        }  catch(error) {
            // TODO use logging instead of sending technical error
            return false;
        }
    }

    async getOne (req, clientId) {
        const collection = await getCollection(req, "client");
        let response = {
            'error': false,
            'found': false
        };
        try {
            const client = await collection.findOne({
                "_id": new ObjectId(clientId)
            });
            if (client){
                response['client'] = client;
                response['found'] = true;
            } 
        } catch(error) {
            response['error'] = true;
        }
        return response;
    }

    async updateOne (req, clientId) {
        const collection = await getCollection(req, "client");
        const clientIdObj = new ObjectId(clientId);
        let response = {
            'error': false,
            'found': false
        };
        try {
            // TODO: validate before saving
            const updated = await collection.updateOne(
                {"_id": clientIdObj},
                {$set: req.body});
            if (updated.matchedCount) {
                const cursor = collection.find({"_id": clientIdObj});
                const updatedClient = await cursor.next();
                response['client'] = updatedClient;
                response['found'] = true;
            }
        }  catch(error) {
            // TODO use logging instead of sending technical error
            response['error'] = true;
        }
        return response;
    }
}

module.exports = ClientService;