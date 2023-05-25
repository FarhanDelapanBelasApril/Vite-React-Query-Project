/* eslint-disable react/prop-types */
export default function TodoIsCompleted({ isCompleted }) {
  return (
    <div className="todo-list-item__iscompleted mb-2 d-flex justify-content-end g-0">
      <button
        style={{ fontSize: "16px", fontWeight: "400" }}
        type="button"
        className="btn btn-dark btn-md rounded-pill"
      >
        {isCompleted ? "Ditandai sudah selesai" : "Belum selesai"}
      </button>
    </div>
  );
}
