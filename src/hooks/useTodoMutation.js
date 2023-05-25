/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "react-query";
import { addTodo, updateTodo, deleteTodo } from "../api/todosApi";

// Mutation
const queryClient = useQueryClient();

export const addTodoMutation = useMutation(addTodo, {
  onSuccess: () => {
    queryClient.invalidateQueries("todos");
  },
});

export const updateTodoMutation = useMutation(updateTodo, {
  onSuccess: () => {
    queryClient.invalidateQueries("todos");
  },
});

export const deleteTodoMutation = useMutation(deleteTodo, {
  onSuccess: () => {
    queryClient.invalidateQueries("todos");
  },
});
