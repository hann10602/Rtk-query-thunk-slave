import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "./store";
import {
  addTodo,
  deleteTodo,
  isAddingTodoSelector,
  isSetRandomTodoSelector,
  todosSelector,
  updateTodo,
} from "./slice/Slice";
import { useSelector } from "react-redux";
import "./style.scss";

const ReduxToolkit = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  const dispatch = useAppDispatch();

  const idInput: React.LegacyRef<HTMLInputElement> | undefined =
    useRef<HTMLInputElement>(null);

  const isAdding = useSelector(isAddingTodoSelector);
  const isSetRandomTodo = useSelector(isSetRandomTodoSelector);

  useEffect(() => {
    if (isAdding === false && isSetRandomTodo === false) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [isAdding || isSetRandomTodo]);

  const todos = useSelector(todosSelector);

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodo = (id: number) => {
    dispatch(updateTodo(id));
  };

  const handleAddTodo = () => {
    dispatch(addTodo(id));
    idInput.current?.focus();
  };

  return (
    <div id="container">
      <p>{isLoading ? "Loading..." : ""}</p>
      <div>
        <label htmlFor="">Nhập id</label>
        <input
          type="text"
          ref={idInput}
          value={id}
          onChange={(e) => {
            setId(Number(e.target.value));
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTodo();
            }
          }}
        />
        <button onClick={() => handleAddTodo()}>Add todo</button>
      </div>
      {todos.map((item) => (
        <div key={item.id} className="todo">
          <div>
            <p>id: {item.id}</p>
            <p>todo: {item.todo}</p>
            <p>is completed: {item.completed.toString()}</p>
          </div>
          <div>
            <button onClick={() => handleUpdateTodo(item.id)}>update</button>
            <button onClick={() => handleDeleteTodo(item.id)}>delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReduxToolkit;
