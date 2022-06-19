module.exports = (app) => {
  const accounts = require("../controllers/account.controller");

  // Create a new account
  app.post("/accounts", accounts.create);

  // Retrieve all accounts
  app.get("/accounts", accounts.findAll);

  // Retrieve a single account with accountId
  app.get("/accounts/:accountNumber", accounts.findOne);

  // Update a account with accountId
  app.put("/accounts/:accountId", accounts.update);

  // Delete a account with accountId
  app.delete("/accounts/:accountId", accounts.delete);
};
