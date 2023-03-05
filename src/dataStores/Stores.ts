import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { combinedReducersTodo } from "./Reducers";

export const combinedStoreTodo = configureStore({
    reducer: combinedReducersTodo,
    middleware: [thunkMiddleware],
})