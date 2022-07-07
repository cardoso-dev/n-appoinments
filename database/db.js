const { MongoClient } = require("mongodb");

// TODO read the following constants from the environment 
const dbName = "appoinments";
const dbHostname = "appoinments-db:27017";
const connectionUrl = `mongodb://${dbHostname}`;

const client = new MongoClient(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectDb: async (callback) => {
    client.connect((err, db) => {
      if (err || !db) {
        return callback(err);
      }
      dbConnection = db.db(dbName);
      return callback();
    });
  },

  getDb: () => {
    return dbConnection;
  }
};
