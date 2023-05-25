import axios from "axios";

const todosApi = axios.create({
  baseURL: "http://localhost:5000",
});

export async function getTodos() {
  const controller = new AbortController();
  const endpoint = "/todos";

  try {
    const response = await todosApi.get(endpoint, {
      method: "GET",
      signal: controller.signal,
      validateStatus: (status) => status < 300 || status < 500,
    });

    return response.data;
  } catch (error) {
    console.log({ message: error.message });
    controller.abort();
  }
}

export async function addTodo(todo) {
  const controller = new AbortController();
  const endpoint = "/todos";

  try {
    const response = await todosApi.post(endpoint, todo);
    return response.data;
  } catch (error) {
    console.log({ message: error.message });
    controller.abort();
  }
}

export async function updateTodo(todo) {
  const controller = new AbortController();
  const endpoint = "/todos";
  const { id } = todo;

  try {
    const response = await todosApi.put(`${endpoint}/${id}`, todo);
    return response.data;
  } catch (error) {
    console.log({ message: error.message });
    controller.abort();
  }
}

export async function deleteTodo({ id }) {
  const controller = new AbortController();
  const endpoint = "/todos";

  try {
    const response = await todosApi.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.log({ message: error.message });
    controller.abort();
  }
}

export default todosApi;
