import {
  createSlice
} from "@reduxjs/toolkit";
import { RootState } from "../store";

type rtkState = {
  todoId: number | undefined;
};

const initialState: rtkState = {
  todoId: 0,
};

const rtkSlice = createSlice({
  name: "rtk",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.todoId = action.payload;
    },
  },
});

export const rtkReducer = rtkSlice.reducer;

export const todoIdSelector = (state: RootState) => state.rtkReducer.todoId;

export const { setId } = rtkSlice.actions;
