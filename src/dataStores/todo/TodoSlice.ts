import { Dispatch, createSlice, ThunkDispatch, createAsyncThunk } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TodoType } from "../../models/TodoType";
import { AnyAction } from "redux";
import { combinedReducersTodo } from "../Reducers";
import { fetchTodoList } from "./FetchTodos";
import { debug } from "console";
import { postTodoList } from "./PostTodos";
import { Todo } from "../../models/Todo";

export const todoSlice = createSlice({
    name: 'todoRoot',
    initialState: {
        todoList: <Todo[]>[],
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
            state.todoList.push(action.payload as Todo);
        })
    }
})

/*Non Asnyc Call => export const { updateTodoStat } = todoSlice.actions */

export type TodoStateType = ReturnType<typeof combinedReducersTodo>
export type AppDispatch = Dispatch<AnyAction> & ThunkDispatch<TodoStateType, null, AnyAction>

export const useTodoSelector: TypedUseSelectorHook<TodoStateType> = useSelector
export const useTodoDispatch: () => AppDispatch = useDispatch