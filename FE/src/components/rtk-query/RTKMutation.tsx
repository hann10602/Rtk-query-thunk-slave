import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { TodoType } from "../../types";
import {
  useAddTodoMutation,
  useGetTodoQuery,
  useUpdateTodoMutation,
} from "./service/Service";
import { setId, todoIdSelector } from "./slice/Slice";
import { useAppDispatch } from "./store";
import { isEntityError } from "../../utils/helpers";

type FormError = {
  [key in keyof TodoType]: string;
};

const initialState: TodoType = {
  id: 0,
  todo: "",
  completed: false,
  userId: 0,
};

const RTKMutation = () => {
  const [todo, setTodo] = useState<TodoType>(initialState);

  const dispatch = useAppDispatch();

  const [addTodo, addTodoResult] = useAddTodoMutation();
  const [updateTodo, updateTodoResult] = useUpdateTodoMutation();

  const todoId = useSelector(todoIdSelector);

  const { data, refetch } = useGetTodoQuery(todoId, { skip: !todoId });

  useEffect(() => {
    if (data) {
      setTodo(data);
    }
  }, [data]);

  const handleSubmitTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo.id !== 0) {
      await updateTodo(todo).unwrap();
      dispatch(setId(0));
    } else {
      await addTodo(todo).unwrap();
    }

    setTodo(initialState);
  };

  return (
    <form onSubmit={handleSubmitTodo}>
      {todoId !== 0 && (
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="id" style={{ width: 100, display: "inline-block" }}>
            Id:
          </label>
          <input
            type="number"
            name="id"
            placeholder="Nhap id"
            required
            value={todo.id}
            onChange={(e) =>
              setTodo((prev) => {
                return { ...prev, id: Number(e.target.value) };
              })
            }
          />
        </div>
      )}
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="todo" style={{ width: 100, display: "inline-block" }}>
          Todo:
        </label>
        <input
          type="text"
          name="todo"
          placeholder="Nhap todo"
          value={todo.todo}
          required
          onChange={(e) =>
            setTodo((prev) => {
              return { ...prev, todo: e.target.value };
            })
          }
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="userId" style={{ width: 100, display: "inline-block" }}>
          User id:
        </label>
        <input
          type="number"
          name="userId"
          placeholder="Nhap user id"
          value={todo.userId}
          required
          onChange={(e) =>
            setTodo((prev) => {
              return { ...prev, userId: Number(e.target.value) };
            })
          }
        />
      </div>
      {(addTodoResult || updateTodoResult) && (
        <p>
          {addTodoResult.data?.message}
          {updateTodoResult.data?.message}
        </p>
      )}
      <button type="button" onClick={() => refetch()}>
        Refetch
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RTKMutation;
