import { Dispatch, createSlice, ThunkDispatch, createAsyncThunk } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TodoType } from "../../models/TodoType";
import { AnyAction, combineReducers } from "redux";
import { fetchTodoList } from "./FetchTodos";
import { postTodoList } from "./PostTodos";

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todoList: [],
        index: 0,
    },
    reducers: { /* Non Async calls */
        /** 
         * Defines the size of a card
         * @param action has to be a type of [todoType]
         * /
        updateTodoState: (state, action) => {
            state.todoType = action.payload;
        },*/
    },
    extraReducers(builder) { /* Async calls */
        builder.addCase(fetchTodoList.fulfilled, (state, action) => {
            console.log("Fetch of TodoList success", action.payload)
            state.todoList = action.payload;
        })

        builder.addCase(postTodoList.fulfilled, (state, action) => {
            console.log("Post of TodoList success", action.payload)
            state.todoList.push(action.payload);
        })
    }
})

export const selectTodoList = state => state.todo.todoList;
export const todoReducerNew = todoSlice.reducer;
