/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const TodoTaskAction = ({ deleteTodoMutation, updateTodoMutation, todo }) => {
  // Handler
  const onDeleteTodoMutationHandler = (todo) => {
    Swal.fire({
      title: "Konfirmasi Hapus Task",
      text: "Apakah kamu yakin menghapus task ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batalkan",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTodoMutation.mutate({ id: todo.id });
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
          title: "Tugas berhasil dihapus",
        });
      }
    });
  };

  const onUpdateTodoMutationHandler = (todo) => {
    updateTodoMutation.mutate({
      ...todo,
      completed: !todo.completed,
      updatedAt: new Date().toISOString(),
    });

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

    if (!todo.completed) {
      Toast.fire({
        icon: "success",
        title: "Tugas ditandai selesai",
      });
    }
  };

  return (
    <div className="todo-list-item__action">
      <span className="todo-list-item__action-trash me-2">
        <button
          onClick={() => onDeleteTodoMutationHandler(todo)}
          title="Hapus"
          className="btn btn-danger btn-md rounded"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </span>
      <span className="todo-list-item__action-completed">
        <button
          type="button"
          onClick={() => onUpdateTodoMutationHandler(todo)}
          title="Tandai selesai"
          className="btn btn-primary btn-md rounded"
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </span>
    </div>
  );
};

export default TodoTaskAction;
