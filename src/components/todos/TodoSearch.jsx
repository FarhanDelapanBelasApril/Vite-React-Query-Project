/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useMemo, useRef } from "react";
import { Form, InputGroup } from "react-bootstrap";

export default function TodoSearch({
  todos,
  searchTodo,
  setSearchTodo,
  setSearchResultsTodo,
}) {
  const ref = useRef();

  const onSearchTodoChangeHandler = (e) => {
    setSearchTodo(e.target.value);
  };

  const items = todos?.filter((item) =>
    item.task.toLowerCase().includes(searchTodo.toLowerCase())
  );

  useMemo(() => {
    setTimeout(() => {
      setSearchResultsTodo(items);
    }, 500);
  });

  return (
    <div className="row justify-content-end g-3">
      <div className="col-lg-5">
        <div>
          <Form onSubmit={(e) => e.preventDefault()} className=" py-3">
            <InputGroup className="mb-3">
              <Form.Control
                type="search"
                className="todo-search__input"
                placeholder="Cari..."
                aria-label="Cari..."
                aria-describedby="basic-addon2"
                ref={ref}
                onChange={onSearchTodoChangeHandler}
                value={searchTodo}
              />
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
}
