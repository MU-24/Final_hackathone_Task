const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// Get Tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Add Task
router.post("/", auth, async (req, res) => {
  const { title, status } = req.body;
  try {
    const newTask = new Task({ title, status, user: req.user.id });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update Task
router.put("/:id", auth, async (req, res) => {
  const { title, status } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    task.title = title || task.title;
    task.status = status || task.status;
    task.updatedAt = Date.now();

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete Task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    await task.remove();
    res.json({ msg: "Task removed" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
