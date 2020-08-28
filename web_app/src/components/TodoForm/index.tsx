import React from "react";

import "./index.css";

interface TodoFormData {
  title: string;
  category: string;
  setTitle: Function;
  setCategory: Function;
  saveTodo: Function;
}

const TodoForm = ({
  title,
  category,
  setTitle,
  setCategory,
  saveTodo,
}: TodoFormData) => {
  return (
    <form>
      <input
        name="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        name="category"
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="button" onClick={() => saveTodo()}>
        Save
      </button>
    </form>
  );
};

export default TodoForm;
