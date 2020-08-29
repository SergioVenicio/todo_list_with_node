import React, { useState } from "react";
import useTodoContext from "../../contexts/TodoContext";

import "./index.css";

const TodoForm = () => {
  const { saveTodo } = useTodoContext();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleSave = async () => {
    await saveTodo(title, category);
  };

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
      <button type="button" onClick={() => handleSave()}>
        Save
      </button>
    </form>
  );
};

export default TodoForm;
