/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Fragment, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addTodo, updateTodo, deleteTodo } from "../../api/todosApi";
import { useGetTodo } from "../../hooks/useTodo";
import { nanoid } from "nanoid";
import loadable from "@loadable/component";
import Swal from "sweetalert2";

const TodoAdd = loadable(() => import("../todos/TodoAdd"));
const TodoListItem = loadable(() => import("../todos/TodoListItem"));
const TodoSearch = loadable(() => import("../todos/TodoSearch"));
const TodoSearchResults = loadable(() => import("../todos/TodoSearchResults"));
const TodoHeadingName = loadable(() => import("../todos/TodoHeadingName"));

export default function TodoList() {
  const [newTask, setNewTask] = useState("");
  const [searchTodo, setSearchTodo] = useState("");
  const [searchResultsTodo, setSearchResultsTodo] = useState([]);
  const { isLoading, isError, error, data: todos } = useGetTodo();
  const queryClient = useQueryClient();

  // Mutation
  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  // Handler
  const onSubmitChangeEventHandler = (e) => {
    const date = new Date();
    const currentDate = date.toISOString();

    e.preventDefault();

    if (newTask.length) {
      addTodoMutation.mutate({
        id: nanoid(16),
        task: newTask,
        completed: false,
        createdAt: currentDate,
        updatedAt: null,
      });

      setNewTask("");

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Tugas baru ditambahkan",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tugas tidak boleh kosong!",
        position: "center",
      });
    }
  };

  const [isTodo, setIsTodo] = useState(true);
  const [isTodoCompleted, setIsTodoCompleted] = useState(false);
  const [isTodoUnCompleted, setIsTodoUnCompleted] = useState(false);

  return (
    <Fragment>
      <div
        className="todo container py-3"
        style={{ position: "relative", marginTop: "50px" }}
      >
        <div className="row justify-content-center align-content-center g-2">
          <div className="col-lg-8 col-sm-12 col-md-12">
            <div className="mb-3">
              <TodoHeadingName name="Daftar Kegiatan" />
              <div
                className="d-flex justify-content-arround flex-wrap g-2"
                style={{ position: "relative" }}
              >
                <button
                  onClick={() => setIsTodo(true)}
                  type="button"
                  className="btn btn-md btn-primary rounded-pill mt-3"
                >
                  Semua ({todos?.length})
                </button>
                <button
                  onClick={() => {
                    setIsTodo(false);
                    setIsTodoCompleted(true);
                  }}
                  type="button"
                  className="btn btn-md btn-primary rounded-pill mt-3 ms-2"
                >
                  Selesai ({todos?.filter((todo) => todo.completed).length})
                </button>
                <button
                  onClick={() => {
                    setIsTodo(false);
                    setIsTodoCompleted(false);
                    setIsTodoUnCompleted(true);
                  }}
                  type="button"
                  className="btn btn-md btn-primary rounded-pill mt-3 ms-2"
                >
                  Belum Selesai (
                  {todos?.filter((todo) => !todo.completed).length})
                </button>
              </div>
            </div>

            {isTodo && (
              <TodoAdd
                onSubmitChangeEventHandler={onSubmitChangeEventHandler}
                newTask={newTask}
                setNewTask={setNewTask}
              />
            )}

            {isTodoCompleted && !isTodo ? (
              <TodoSearch
                todos={todos?.filter((todo) => todo.completed)}
                searchTodo={searchTodo}
                setSearchTodo={setSearchTodo}
                setSearchResultsTodo={setSearchResultsTodo}
              />
            ) : isTodoUnCompleted && !isTodo && !isTodoCompleted ? (
              <TodoSearch
                todos={todos?.filter((todo) => !todo.completed)}
                searchTodo={searchTodo}
                setSearchTodo={setSearchTodo}
                setSearchResultsTodo={setSearchResultsTodo}
              />
            ) : (
              <TodoSearch
                todos={todos}
                searchTodo={searchTodo}
                setSearchTodo={setSearchTodo}
                setSearchResultsTodo={setSearchResultsTodo}
              />
            )}

            <div className="todo-list py-3" style={{ position: "relative" }}>
              {isLoading && (
                <div className="todo-list__loadeddata">Sedang memuat...</div>
              )}
              {isError && (
                <div className="todo-list__loadeddata">{error.message}</div>
              )}

              {isTodo && (
                <>
                  {!isLoading && !isError && (
                    <Fragment>
                      {!todos.length ? (
                        <div className="m-auto text-center py-3">
                          Belum Ada Daftar Kegiatan.
                        </div>
                      ) : (
                        <Fragment>
                          {!searchTodo.length ? (
                            <TodoListItem
                              todos={todos}
                              updateTodoMutation={updateTodoMutation}
                              deleteTodoMutation={deleteTodoMutation}
                            />
                          ) : (
                            <TodoSearchResults
                              todos={searchResultsTodo}
                              updateTodoMutation={updateTodoMutation}
                              deleteTodoMutation={deleteTodoMutation}
                            />
                          )}
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                </>
              )}

              {isTodoCompleted && !isTodo && (
                <>
                  {!isLoading && !isError && (
                    <Fragment>
                      {!todos.length ? (
                        <div className="m-auto text-center py-3">
                          Belum Ada Daftar Kegiatan.
                        </div>
                      ) : (
                        <Fragment>
                          {!searchTodo.length ? (
                            <TodoListItem
                              todos={todos.filter((todo) => todo.completed)}
                              updateTodoMutation={updateTodoMutation}
                              deleteTodoMutation={deleteTodoMutation}
                            />
                          ) : (
                            <TodoSearchResults
                              todos={searchResultsTodo}
                              updateTodoMutation={updateTodoMutation}
                              deleteTodoMutation={deleteTodoMutation}
                            />
                          )}
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                </>
              )}

              {isTodoUnCompleted && !isTodo && !isTodoCompleted && (
                <>
                  {!isLoading && !isError && (
                    <Fragment>
                      {!todos.length ? (
                        <div className="m-auto text-center py-3">
                          Belum Ada Daftar Kegiatan.
                        </div>
                      ) : (
                        <Fragment>
                          {!searchTodo.length ? (
                            <TodoListItem
                              todos={todos.filter((todo) => !todo.completed)}
                              updateTodoMutation={updateTodoMutation}
                              deleteTodoMutation={deleteTodoMutation}
                            />
                          ) : (
                            <TodoSearchResults
                              todos={searchResultsTodo}
                              updateTodoMutation={updateTodoMutation}
                              deleteTodoMutation={deleteTodoMutation}
                            />
                          )}
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
