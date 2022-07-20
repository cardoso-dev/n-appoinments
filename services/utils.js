const { Collection } = require('mongodb');
const { getDb } = require('../database/db');

module.exports = {
    getCollection: async (name) => {
        return await getDb().collection(name);
    }
}