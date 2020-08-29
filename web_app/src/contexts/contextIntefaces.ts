export interface Category {
  id: string;
  title: string;
}

export interface Todo {
  id: string;
  title: string;
  category_id: string;
  done: boolean;
  created_date: Date;
  updated_date?: Date;
  conclusion_date?: Date;
}

export interface TodoProviderProps {
  children: React.ReactNode;
}

export interface TodoContextInterface {
  todos: Todo[];
  categories: Category[];
  setTodos: Function;
  setCategories: Function;
  saveTodo: Function;
  deleteTodo: Function;
  getCategory: Function;
  setDone: Function;
}
