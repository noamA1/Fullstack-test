module.exports = (app) => {
  const operations = require("../controllers/operation.controller");

  // Create a new car
  app.post("/operations", operations.create);

  // Retrieve all operations
  app.get("/operations", operations.findAll);

  // Retrieve a single car with carId
  app.get("/operations/:operationId", operations.findOne);

  // Update a car with carId
  app.put("/operations/:operationId", operations.update);

  // Delete a operation with operationId
  app.delete("/operations/:operationId", operations.delete);
};
