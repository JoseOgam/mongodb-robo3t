var express = require("express");
require("./db/mongoose");
var User = require("./models/users");
var Task = require("./models/task");

var app = express();
var port = process.env.PORT || 3000;

app.use(express.json());
app.post("/users", (req, res) => {
  // console.log(req.body);
  var user = new User(req.body);
  // res.send('nodejs development');
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//get one user
app.get("/users/:id", (req, res) => {
  var id = req.params.id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(400).send();
      }
      res.send(user);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
  //   console.log(req.params);
});

//updating Request
// app.put('/users', (req, res)=>{
//     var id = parseInt(req.params.id);
//     var updateUser = new User(req.body);
//     User.find(User["Users" + id] != null).then(()=>{
//     // update user
//     User["Users" + id] = updateUser;
//     console.log("--->Update Successfully, users: \n" + JSON.stringify(User))

//     // return
//     res.end("Update Successfully! \n" + JSON.stringify(updateUser));

//     }).catch((e)=>{
//         res.end("User Don't exist7\4444444444]]]]\n:" + JSON.stringify(updateUser));
//     })
// })

//create a post request for task
app.post("/tasks", (req, res) => {
  var task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

//get request for tasks
app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
