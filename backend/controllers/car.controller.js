const Car = require("../models/car.model");

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body.model) {
    return res.status(400).send({
      message: "Car model can not be empty",
    });
  } else if (!req.body.color) {
    return res.status(400).send({
      message: "Car color can not be empty",
    });
  }

  // Create a Note
  const car = new Car({
    model: req.body.model,
    color: req.body.color,
  });

  // Save Note in the database
  car
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Car.find()
    .then((cars) => {
      res.send(cars);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cars.",
      });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  Car.findById(req.params.carId)
    .then((car) => {
      if (!car) {
        return res.status(404).send({
          message: "Car not found with id " + req.params.carId,
        });
      }
      res.send(car);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Car not found with id " + req.params.carId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving car with id " + req.params.carId,
      });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.model) {
    return res.status(400).send({
      message: "Car model can not be empty",
    });
  }

  // Find note and update it with the request body
  Car.findByIdAndUpdate(
    req.params.carId,
    {
      model: req.body.model,
      color: req.body.color,
    },
    { new: true }
  )
    .then((car) => {
      if (!car) {
        return res.status(404).send({
          message: "Car not found with id " + req.params.carId,
        });
      }
      res.send(car);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Car not found with id " + req.params.carId,
        });
      }
      return res.status(500).send({
        message: "Error updating car with id " + req.params.carId,
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Car.findByIdAndRemove(req.params.carId)
    .then((car) => {
      if (!car) {
        return res.status(404).send({
          message: "Car not found with id " + req.params.carId,
        });
      }
      res.send({ message: "Car deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Car not found with id " + req.params.carId,
        });
      }
      return res.status(500).send({
        message: "Could not delete car with id " + req.params.carId,
      });
    });
};
