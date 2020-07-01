var express = require("express");
var User = require("../models/users");
var router = express.Router();
var auth = require("../middleware/auth");

//post user
router.post("/users", async (req, res) => {
  var user = new User(req.body);
  try {
    await user.save();
    var token = await user.generateToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});
//login
router.post("/users/login", async (req, res) => {
  try {
    var user = await User.findByCredentials(req.body.email, req.body.password);
    var token = await user.generateToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//get all users
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
  // try {
  //   var users = await User.find({});
  //   res.send(users);
  // } catch (err) {
  //   res.status(500).send(err);
  // }
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
