import { useRef, useState } from "react";
import { useDeleteTodoMutation, useGetTodosQuery } from "./service/Service";
import { setId } from "./slice/Slice";
import { useAppDispatch } from "./store";
import "./style.scss";

const ReduxToolkit = () => {
  const { data, isFetching } = useGetTodosQuery();

  const [deleteTodo] = useDeleteTodoMutation();
  const dispatch = useAppDispatch();

  const [currentId, setCurrentId] = useState<number | undefined>(undefined);

  const idInput:React.LegacyRef<HTMLInputElement> | undefined = useRef(null);

  const handleDeleteTodo = (id: number) => {
    deleteTodo({ id: id });
  };

  const handleUpdateTodo = (id: number) => {
    dispatch(setId(id));
  };

  const handleAddTodo = () => {
    if(idInput) {
      idInput.current?.focus();
    }
  };

  const handleAddRandomTodo = () => {
    console.log("alo");
  };

  return (
    <div id="container">
      <p>{isFetching ? "Loading..." : ""}</p>
      <div>
        <label htmlFor="">Nhập id</label>
        <input
          type="text"
          ref={idInput}
          value={currentId}
          onChange={(e) => {
            setCurrentId(Number(e.target.value));
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTodo();
            }
          }}
        />
        <button onClick={() => handleAddTodo()}>Add todo</button>
        <button onClick={() => handleAddRandomTodo()}>Add random</button>
      </div>
      {!isFetching && data &&
        data.map((item) => (
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
