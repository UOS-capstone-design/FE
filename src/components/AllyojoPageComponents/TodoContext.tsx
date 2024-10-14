import React, {createContext, useState, useContext} from 'react';
import {Todo} from '../../types';
import uuid from 'react-native-uuid';

interface TodoContextType {
  currentTodo: Todo;
  setCurrentTodo: React.Dispatch<React.SetStateAction<Todo>>;
  updateTodo: (updates: Partial<Todo>) => void;
}

export const TodoContextManager = createContext<TodoContextType | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
  initialTodo: Todo | undefined;
};

const defaultTodo: Todo = {
  id: uuid.v4() as string,
  title: '',
  description: '',
  timer: new Date(),
  active: false,
};

export const TodoContext = ({children, initialTodo}: Props) => {
  const [currentTodo, setCurrentTodo] = useState<Todo>(
    initialTodo || defaultTodo,
  );

  const updateTodo = (updates: Partial<Todo>) => {
    setCurrentTodo(prev => ({...prev, ...updates}));
  };

  return (
    <TodoContextManager.Provider
      value={{currentTodo, setCurrentTodo, updateTodo}}>
      {children}
    </TodoContextManager.Provider>
  );
};
