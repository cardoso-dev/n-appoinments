const { ObjectId } = require('mongodb');

const { getCollection } = require('./utils');


class DocumentService {

    constructor(collectionName) {
        this.collectionName = collectionName;
    }
    
    async getAll (req) {
        const collection = await getCollection(this.collectionName);
        try {
            return await collection.find().toArray();
        } catch(error) {
            // TODO use logging
            return false;
        }
    }

    async create (req) {
        const collection = await getCollection(this.collectionName);
        try {
            const created = await collection.insertOne(req.body);
            if (created.acknowledged) {
                const cursor = collection.find({
                    "_id": created.insertedId
                });
                const newDocument = await cursor.next();
                return newDocument;
            } else {
                return false;
            }
        }  catch(error) {
            // TODO use logging instead of sending technical error
            return false;
        }
    }

    async getOne (req, documentId) {
        const collection = await getCollection(this.collectionName);
        let response = {
            'error': false,
            'found': false
        };

        try {
            const document = await collection.findOne({
                "_id": new ObjectId(documentId)
            });
            if (document){
                response[this.collectionName] = document;
                response['found'] = true;
            } 
        } catch(error) {
            response['error'] = true;
        }
        return response;
    }

    async updateOne (req, documentId) {
        const collection = await getCollection(this.collectionName);
        const documentIdObj = new ObjectId(documentId);
    
        let response = {
            'error': false,
            'found': false
        };
        try {
            const updated = await collection.updateOne(
                {"_id": documentIdObj},
                {$set: req.body});
            if (updated.matchedCount) {
                const cursor = collection.find({"_id": documentIdObj});
                const updatedDocument = await cursor.next();
                response[this.collectionName] = updatedDocument;
                response['found'] = true;
            }
        }  catch(error) {
            // TODO use logging instead of sending technical error
            response['error'] = true;
        }
        return response;
    }
}

module.exports = DocumentService;