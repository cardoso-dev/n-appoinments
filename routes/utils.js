module.exports = {
    getCollection: async (req, name) => {
        const db = req.app.locals.appoinmentDb;
        const collection = db.collection(name);
        
        return collection
    }
}