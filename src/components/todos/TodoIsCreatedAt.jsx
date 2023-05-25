/* eslint-disable react/prop-types */
import { format, parseISO } from "date-fns";

const TodoIsCreatedAt = ({ isCreatedAt }) => {
  return (
    <div className="todo-list-item__createdAt">
      Dibuat, {isCreatedAt && format(parseISO(isCreatedAt), "dd MMM YYY")}
    </div>
  );
};

export default TodoIsCreatedAt;
