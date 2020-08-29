import React from "react";

import { TodoProvider } from "./contexts/TodoContext";

import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import "./index.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <TodoProvider>
        <TodoForm />
        <TodoList />
      </TodoProvider>
    </div>
  );
};

export default App;
