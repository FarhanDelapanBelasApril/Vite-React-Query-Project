/* eslint-disable react/prop-types */
import { Fragment } from "react";
import TodoIsCompleted from "./TodoIsCompleted";
import TodoIsCreatedAt from "./TodoIsCreatedAt";
import TodoTaskTitle from "./TodoTaskTitle";
import TodoTaskAction from "./TodoTaskAction";

export default function TodoListItem({
  todos,
  deleteTodoMutation,
  updateTodoMutation,
}) {
  return (
    <Fragment>
      {todos?.map((todo, index) => (
        <div key={index} className="todo-list-item">
          <TodoIsCompleted isCompleted={todo.completed} />
          <TodoIsCreatedAt isCreatedAt={todo.createdAt} />
          <div className="d-flex justify-content-between align-items-center flex-wrap g-2">
            <TodoTaskTitle isCompleted={todo.completed} taskTitle={todo.task} />
            <TodoTaskAction
              deleteTodoMutation={deleteTodoMutation}
              updateTodoMutation={updateTodoMutation}
              todo={todo}
            />
          </div>
        </div>
      ))}
    </Fragment>
  );
}
