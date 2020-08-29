import React from "react";

import useTodoContext from "../../contexts/TodoContext";
import { Todo } from "../../contexts/contextIntefaces";

import "./index.css";

const TodoList = () => {
  const { todos, getCategory, setDone, deleteTodo } = useTodoContext();
  const renderTodos = () => {
    return todos.map(
      ({
        id,
        title,
        category_id,
        done,
        created_date,
        updated_date,
        conclusion_date,
      }: Todo) => (
        <tr key={id}>
          <td>{title}</td>
          <td>{getCategory(category_id)}</td>
          <td>{new Date(created_date).toLocaleDateString()}</td>
          <td>
            {updated_date ? new Date(updated_date).toLocaleDateString() : ""}
          </td>
          <td>{done ? "yes" : "no"}</td>
          <td>
            {conclusion_date
              ? new Date(conclusion_date).toLocaleDateString()
              : ""}
          </td>
          <td>
            <button className="delete" onClick={() => deleteTodo(id)}>
              Delete
            </button>
            {!done ? (
              <button className="done" onClick={() => setDone(id)}>
                Done
              </button>
            ) : null}
          </td>
        </tr>
      )
    );
  };

  return (
    <div id="table-container">
      <table cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <td>title</td>
            <td>category</td>
            <td>created</td>
            <td>updated</td>
            <td>done</td>
            <td>conclusion_date</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>{renderTodos()}</tbody>
      </table>
    </div>
  );
};

export default TodoList;
