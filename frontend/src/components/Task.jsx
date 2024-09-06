import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => (
  <Draggable draggableId={task._id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <h3>{task.title}</h3>
      </div>
    )}
  </Draggable>
);

export default Task;
