import { useQuery } from "react-query";
import { getTodos } from "../api/todosApi";

export const useGetTodo = () => {
  return useQuery("todos", getTodos, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    select: (data) => data.sort().reverse(),
  });
};
