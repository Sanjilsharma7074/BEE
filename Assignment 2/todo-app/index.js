const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // Use EJS as the template engine

// Middleware to log request timestamps
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Route to display all tasks
app.get("/", (req, res) => {
  fs.readFile("tasks.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading tasks file.");
    }
    const tasks = JSON.parse(data);
    res.render("index", { tasks }); // Render tasks on the page
  });
});

// Route to get a specific task by ID
app.get("/task", (req, res) => {
  const taskId = parseInt(req.query.id); // Get task ID from query parameter

  fs.readFile("tasks.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading tasks file.");
    }
    const tasks = JSON.parse(data);
    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
      return res.status(404).send("Task not found.");
    }
    res.json(task);
  });
});

// Route to add a new task
app.post("/add-task", (req, res) => {
  const newTask = {
    task: req.body.task,
  };

  fs.readFile("tasks.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading tasks file.");
    }
    const tasks = JSON.parse(data);
    tasks.push({...newTask, id:tasks.length+1});

    fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error saving task.");
      }
      res.redirect("/"); // Redirect back to homepage
    });
  });
});

// Route to update task completion status
app.post("/update-task", (req, res) => {
  const taskId = parseInt(req.body.id);

  fs.readFile("tasks.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading tasks file.");
    }
    let tasks = JSON.parse(data);

    tasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.completed = req.body.completed ? true : false;
      }
      return task;
    });

    fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error updating task.");
      }
      res.redirect("/");
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
