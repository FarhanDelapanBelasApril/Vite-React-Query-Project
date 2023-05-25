/* eslint-disable react/prop-types */
import { Fragment, useRef } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function TodoAdd({
  newTask,
  setNewTask,
  onSubmitChangeEventHandler,
}) {
  // Set input ref
  const inputRef = useRef();

  return (
    <Fragment>
      <div>
        <Form
          onSubmit={onSubmitChangeEventHandler}
          className="todo-add__form py-3"
        >
          <InputGroup className="mb-3">
            <Form.Control
              className="todo-add__form-input"
              placeholder="Tambah Kegiatan Baru"
              aria-label="Tambah Kegiatan Baru"
              aria-describedby="basic-addon2"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              ref={inputRef}
            />
            <button
              type="submit"
              title="Tandai selesai"
              className="btn btn-primary btn-lg  ms-2 rounded"
            >
              <FontAwesomeIcon icon={faUpload} />
            </button>
          </InputGroup>
        </Form>
      </div>
    </Fragment>
  );
}
