import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import api from "./services/api";

import "./index.css";

interface Category {
  id: string;
  title: string;
}
interface Todo {
  id: string;
  title: string;
  category_id: string;
  done: boolean;
  created_date: Date;
  updated_date?: Date;
  conclusion_date?: Date;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const getCategory = (_id: string): string | null => {
    const category = categories.find(({ id }) => id === _id) as Category;
    return category?.title || null;
  };

  const deleteTodo = async (_id: string): Promise<void> => {
    setTodos((todos) => todos.filter((t) => (t.id !== _id ? t : null)));
    await api.delete(`/todos/${_id}`);
  };

  const setDone = async (_id: string): Promise<void> => {
    const { data } = await api.post(`todos/${_id}/done`);
    setTodos((todos) => {
      return todos.map((t) => (t.id !== _id ? t : data));
    });
  };

  const saveTodo = async () => {
    const { data } = await api.post("/todos", {
      title,
      category,
    });

    const newCategory = {
      ...data.category,
    };

    const newTodo = {
      ...data,
      category_id: newCategory.id,
    };

    setCategories((categories) => [...categories, newCategory]);
    setTodos((todos) => [...todos, newTodo]);
  };

  useEffect(() => {
    api.get("/categories").then(({ data }) => {
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    api.get("/todos").then(({ data }) => {
      setTodos(data);
    });
  }, [categories]);

  return (
    <div className="App">
      <Header />
      <TodoForm
        title={title}
        category={category}
        saveTodo={saveTodo}
        setTitle={setTitle}
        setCategory={setCategory}
      />
      <TodoList
        todos={todos}
        getCategory={getCategory}
        deleteTodo={deleteTodo}
        setDone={setDone}
      />
    </div>
  );
};

export default App;
