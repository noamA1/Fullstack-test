const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./common/databaseConfig");
const serverConnections = require("./common/config");
const carRoutes = require("./routes/car.routes");
const { createDB, createNewCollection } = require("./common/createCollection");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(`${dbConfig.url}/FullStack-Test`)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// createNewCollection();

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});

require("./routes/accounts.routes")(app);
require("./routes/operation.routes")(app);

app.listen(serverConnections.port, () => {
  console.log(`Server is listening on port ${serverConnections.port}`);
});
