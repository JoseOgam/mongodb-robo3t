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
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
//update task
app.patch("/tasks/:id", async (req, res) => {
  var updates = Object.keys(req.body);
  var allowedUpdates = ["description", "completed"];
  var isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid data input" });
  }
  try {
    var task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
//delete task
app.delete("/tasks/:id", async (req, res) => {
  var id = req.params.id;
  try {
    var task = await Task.findByIdAndDelete(id);
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});
