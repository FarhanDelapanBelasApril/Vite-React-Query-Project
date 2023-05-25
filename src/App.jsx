/* eslint-disable no-unused-vars */
import { Fragment } from "react";
import NavigationBar from "./components/NavigationBar";
import TodoList from "./components/todos/TodoList";
import FooterSection from "./components/FooterSection";

export default function App() {
  return (
    <Fragment>
      <NavigationBar />
      <main
        className="container-fluid d-flex flex-column py-5 pt-5 mt-5"
        style={{ position: "relative" }}
      >
        <TodoList />
        <FooterSection />
      </main>
    </Fragment>
  );
}
