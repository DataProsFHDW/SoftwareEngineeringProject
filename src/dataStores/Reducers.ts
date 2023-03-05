import { combineReducers } from "@reduxjs/toolkit";
import { todoSlice } from "./todo/TodoSlice";

export const combinedReducersTodo = combineReducers({
    todoReducer: todoSlice.reducer,
});
