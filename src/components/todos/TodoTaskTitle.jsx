/* eslint-disable react/prop-types */
const TodoTaskTitle = ({ isCompleted, taskTitle }) => {
  return (
    <div
      className={`todo-list-item__task ${
        isCompleted ? "text-decoration-line-through" : ""
      }`}
    >
      {`${taskTitle.length >= 30 ? taskTitle.slice(0, 30) + "..." : taskTitle}`}
    </div>
  );
};

export default TodoTaskTitle;
