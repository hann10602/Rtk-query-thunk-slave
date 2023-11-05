import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { rtkReducer } from "./slice/Slice";
import thunk from "redux-thunk";

export const rtkStore = configureStore({
  reducer: {
    rtkReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk],
});

export type RootState = ReturnType<typeof rtkStore.getState>;
export type AppDispatch = typeof rtkStore.dispatch;
export const useAppDispatch = useDispatch<AppDispatch>;
