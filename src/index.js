var express = require("express");
require("./db/mongoose");
var User = require("./models/users");
var Task = require("./models/task");

var app = express();
var port = process.env.PORT || 3000;

app.use(express.json());
app.post("/users", async (req, res) => {
  // console.log(req.body);
  var user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/users", async (req, res) => {
  try {
    var users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get one user
app.get("/users/:id", async (req, res) => {
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

//updating Request

//create a post request for task
app.post("/tasks", async (req, res) => {
  var task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//get request for tasks
app.get("/tasks", async (req, res) => {
  try {
    var task = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
