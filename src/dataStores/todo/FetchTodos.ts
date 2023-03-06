import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "../../models/Todo";
import { TodoType } from "../../models/TodoType";
import { todoSlice } from "./TodoSlice";

/** Contains the logic for fetching the todo information.
 * Results used in {@link todoSlice}.
 */
export const fetchTodoList = createAsyncThunk("checkbox/todo/fetchTaskList",
    async (obj: { accessToken: string, idToken: string }) => {
        return [
            new Todo(TodoType.SINGLE, "First Demo Todo", "Sheesh this good diese",),
            new Todo(TodoType.GROUP, "Group Todo", "Try to design this ;)",)
        ];

        /* Demo logic */
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
            .then((response) => response.json()/* Or .text() <= since it is a readable stream object */)
            .catch((error) => error)
    }
);