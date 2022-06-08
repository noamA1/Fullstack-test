const databaseConfig = require("./databaseConfig");

const MongoClient = require("mongodb").MongoClient;

module.exports.createNewCollection = () => {
  MongoClient.connect(databaseConfig.url, (err, db) => {
    if (err) {
      throw err;
    }
    const dbo = db.db("test");
    dbo.createCollection("users", (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log("Collection created!");
      }
      db.close();
    });
  });
};
