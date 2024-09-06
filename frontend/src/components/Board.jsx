import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddTaskForm from "./AddTaskForm.jsx";
import Task from "./Task.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, [auth]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);

    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${draggableId}`,
        movedTask,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 p-4">
        <Droppable droppableId="To Do">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-gray-200 p-4 rounded-lg shadow-md w-full sm:w-80"
            >
              <h2 className="text-lg font-bold mb-4">To Do</h2>
              {tasks
                .filter((task) => task.status === "To Do")
                .map((task, index) => (
                  <Task key={task._id} task={task} index={index} />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="In Progress">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-yellow-200 p-4 rounded-lg shadow-md w-full sm:w-80"
            >
              <h2 className="text-lg font-bold mb-4">In Progress</h2>
              {tasks
                .filter((task) => task.status === "In Progress")
                .map((task, index) => (
                  <Task key={task._id} task={task} index={index} />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="Completed">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-green-200 p-4 rounded-lg shadow-md w-full sm:w-80"
            >
              <h2 className="text-lg font-bold mb-4">Completed</h2>
              {tasks
                .filter((task) => task.status === "Completed")
                .map((task, index) => (
                  <Task key={task._id} task={task} index={index} />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <AddTaskForm />
    </DragDropContext>
  );
};

export default Board;
