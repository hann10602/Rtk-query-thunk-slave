import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DeleteTodoType, TodoType } from "../../../types";
import { Omit } from "@reduxjs/toolkit/dist/tsHelpers";
import { MutationResp } from "./resp.type";

export const todoApi = createApi({
  reducerPath: "todoList",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8081/api/v1",
  }),
  keepUnusedDataFor: 30,
  tagTypes: ["Todo"],
  endpoints: (build) => ({
    getTodo: build.query<TodoType, number>({
      query: (id: number) => ({
        url: `todo/${id}`,
        method: "GET",
        headers: {
          Authentication: "Bearer",
        },
        params: {
          test: "test"
        }
      }),
      providesTags: ["Todo"],
    }),
    getTodos: build.query<TodoType[], void>({
      query: () => "todos",
      providesTags: (result) => {
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: "Todo" as const, id }), {
              type: "Todo",
              id: "LIST",
            }),
          ];

          return final;
        }

        return [{ type: "Todo", id: "LIST" }];
      },
    }),

    addTodo: build.mutation<MutationResp, Omit<TodoType, "id">>({
      query: (body: TodoType) => {
        return {
          url: "/create",
          method: "POST",
          headers: {
            Authentication: "Bearer",
          },
          body,
        };
      },
      invalidatesTags: ["Todo"],
    }),
    updateTodo: build.mutation<TodoType, TodoType>({
      query: (body: TodoType) => {
        return { url: "/update", method: "PUT", body };
      },
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: build.mutation<DeleteTodoType, DeleteTodoType>({
      query: (body: DeleteTodoType) => ({
        url: "/delete",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
