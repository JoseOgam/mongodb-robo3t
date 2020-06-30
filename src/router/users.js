var express = require("express");
var User = require("../models/users");
var router = express.Router();

//post user
router.post("/users", async (req, res) => {
  var user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get all users
router.get("/users", async (req, res) => {
  try {
    var users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get one user
router.get("/users/:id", async (req, res) => {
  var id = req.params.id;
  try {
    var user = await User.findById(id);
    if (!user) {
      return res.status(400).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//update
router.patch("/users/:id", async (req, res) => {
  var updates = Object.keys(req.body);
  var allowedUpdates = ["name", "password", "email", "age"];
  var isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid Updates" });
  }
  try {
    var user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete user
router.delete("/users/:id", async (req, res) => {
  var id = req.params.id;
  try {
    var users = await User.findByIdAndDelete(id);
    if (!users) {
      res.status(404).send();
    }
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
