import { useState } from "react";
import axios from "axios";

const AddTaskForm = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title },
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      setTitle("");
      // Refresh tasks or handle UI update
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
