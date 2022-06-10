module.exports = (app) => {
  const accounts = require("../controllers/account.controller");

  // Create a new car
  app.post("/accounts", accounts.create);

  // Retrieve all accounts
  app.get("/accounts", accounts.findAll);

  // Retrieve a single car with carId
  app.get("/accounts/:accountId", accounts.findOne);

  // Update a car with carId
  app.put("/accounts/:accountId", accounts.update);

  // Delete a account with accountId
  app.delete("/accounts/:accountId", accounts.delete);
};
