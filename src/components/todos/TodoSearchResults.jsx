/* eslint-disable react/prop-types */
import { Fragment } from "react";
import TodoListItem from "./TodoListItem";

export default function TodoSearchResults({
  todos,
  updateTodoMutation,
  deleteTodoMutation,
}) {
  return (
    <Fragment>
      {!todos.length ? (
        <div className="m-auto text-center py-3">
          Daftar Kegiatan Ditemukan.
        </div>
      ) : (
        <TodoListItem
          todos={todos}
          updateTodoMutation={updateTodoMutation}
          deleteTodoMutation={deleteTodoMutation}
        />
      )}
    </Fragment>
  );
}
