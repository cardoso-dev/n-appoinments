const mongoClient = require("mongodb").MongoClient;

// TODO read the following constants from the environment 
const dbName = "appoinments";
const dbHostname = "appoinments-db:27017";
const connectionUrl = `mongodb://${dbHostname}`;

let dbConnection;

module.exports = {
  connectDb: () => {
    return new Promise(function(resolve, reject) {
      mongoClient.connect(connectionUrl, (err, db) => {
        if (err || !db) {
          reject(err);
        }else{
          dbConnection = db.db(dbName);
          resolve();
        }
      });
    });
  },

  getDb: () => {
    return dbConnection;
  }
};
