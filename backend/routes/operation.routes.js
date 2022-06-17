module.exports = (app) => {
  const operations = require("../controllers/operation.controller");

  // Create a new operation
  app.post("/operations", operations.create);

  // Retrieve all operations
  app.get("/operations", operations.findAll);

  // Retrieve a single operation with operationId
  app.get("/operations/:operationId", operations.findOne);
};
