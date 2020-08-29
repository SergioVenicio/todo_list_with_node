import React, { createContext, useEffect, useState, useContext } from "react";

import api from "../services/api";

import {
  TodoProviderProps,
  TodoContextInterface,
  Category,
  Todo,
} from "./contextIntefaces";

const defaultValue: TodoContextInterface = {
  todos: [],
  categories: [],
  setTodos: function () {},
  setCategories: function () {},
  saveTodo: function () {},
  deleteTodo: function () {},
  setDone: function () {},
  getCategory: function () {},
};

const TodoContext = createContext<TodoContextInterface>(defaultValue);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const saveTodo = async (title: string, category: string) => {
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
    <TodoContext.Provider
      value={{
        todos,
        categories,
        setTodos,
        setCategories,
        saveTodo,
        getCategory,
        deleteTodo,
        setDone,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

function useTodoContext() {
  const context = useContext(TodoContext);
  const {
    todos,
    categories,
    setTodos,
    setCategories,
    saveTodo,
    getCategory,
    deleteTodo,
    setDone,
  } = context;

  return {
    todos,
    categories,
    setTodos,
    setCategories,
    saveTodo,
    getCategory,
    deleteTodo,
    setDone,
  };
}

export default useTodoContext;
