import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "../../models/Todo";
import { TodoType } from "../../models/TodoType";
import { todoSlice } from "./TodoSlice";

/** Contains the logic for posting the todo information.
 * Results used in {@link todoSlice}.
 */
export const postTodoList = createAsyncThunk("checkbox/todo/postTaskList",
    async (obj: { todo: Todo }) => {
        return obj.todo;

        /* Demo logic 
        var url = `https://DemoUrl`

        return fetch(
            url,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    accessToken: `${obj.accessToken}`, idToken: `${obj.idToken}`
                })
            })
            .then((response) => response.json()/* Or .text() <= since it is a readable stream object * /)
    .catch((error) => error) */
    }
);