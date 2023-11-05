import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import { rtkInitialState } from "../../../constant/rtk";
import { TodoType } from "../../../types";
import { AppDispatch, RootState } from "../store";

type rtkState = {
  isSettingRandomTodo: boolean;
  isAddingTodo: boolean;
  todos: TodoType[];
  todo: TodoType | undefined;
};

const initialState: rtkState = {
  isSettingRandomTodo: false,
  isAddingTodo: false,
  todos: rtkInitialState,
  todo: undefined,
};

//hàm add todo sử dụng createAsyncThunk xử lý async
export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (param: number) => {
    try {
      const res = await fetch(`https://dummyjson.com/todos/${param}`);
      if (res.status === 200) {
        return res.json();
      }
    } catch (err) {
      return isRejectedWithValue(err);
    }
  }
);

//hàm chính get random todo của redux-thunk core
export const setRandomTodo = () => (dispatch: AppDispatch) => {
  dispatch(setRandomTodoPending());

  axios
    .get(`https://dummyjson.com/todos/random`)
    .then((resp) => dispatch(setRandomTodoFullFilled(resp.data)))
    .catch((err) => {
      dispatch(setRandomTodoRejected());
      console.log(err);
    });
};



const rtkSlice = createSlice({
  name: "redux",
  initialState,
  reducers: {
    //2 hàm đồng bộ
    updateTodo: (state, action) => {
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload) {
          item.completed = !item.completed;
        }

        return item;
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.id != action.payload);
    },

    //3 trạng thái get random todo của redux-thunk core
    setRandomTodoPending: (state) => {
      state.isSettingRandomTodo = true;
    },
    setRandomTodoFullFilled: (state, action) => {
      if (action.payload !== undefined) {
        state.todos.push(action.payload);
      }
      state.isSettingRandomTodo = false;
    },
    setRandomTodoRejected: (state) => {
      state.isSettingRandomTodo = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.pending, (state) => {
        state.isAddingTodo = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.todos.push(action.payload);
        }
        state.isAddingTodo = false;
      })
      .addCase(addTodo.rejected, (state) => {
        state.isAddingTodo = false;
      });
  },
});

export const rtkReducer = rtkSlice.reducer;

export const isAddingTodoSelector = (state: RootState) =>
  state.rtkReducer.isAddingTodo;

export const isSetRandomTodoSelector = (state: RootState) =>
  state.rtkReducer.isSettingRandomTodo;

export const todosSelector = (state: RootState) => state.rtkReducer.todos;

export const todoSelector = (state: RootState) => state.rtkReducer.todo;

export const rtkAsyncAction = {
  addTodo,
  setRandomTodo,
};

export const {
  updateTodo,
  deleteTodo,
  setRandomTodoPending,
  setRandomTodoFullFilled,
  setRandomTodoRejected,
} = rtkSlice.actions;
