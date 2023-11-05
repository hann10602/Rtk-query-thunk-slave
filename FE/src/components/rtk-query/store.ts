import { configureStore } from "@reduxjs/toolkit";
import { rtkReducer } from "./slice/Slice";
import { todoApi } from "./service/Service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";

export const rtkQueryStore = configureStore({
  reducer: {
    rtkReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

setupListeners(rtkQueryStore.dispatch);

export type RootState = ReturnType<typeof rtkQueryStore.getState>;
export type AppDispatch = typeof rtkQueryStore.dispatch;
export const useAppDispatch = useDispatch<AppDispatch>;
