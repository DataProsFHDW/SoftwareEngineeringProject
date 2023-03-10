import { useEffect, useState } from "react";
import { Preferences } from '@capacitor/preferences';
import useGlobalStorage from "./StateManagement";
import { Todo } from "../models/Todo";
import { TodoInterface } from "../models/TodoInterface";

// https://medium.com/ringcentral-developers/use-react-hooks-with-storage-as-global-state-management-f2945492aade
export const useTodoStorage = () => {
    const useStorage = useGlobalStorage();
    const [storage, setStorage] = useStorage("todoStorage");

    const getTodoList = (): TodoInterface[] => {
        return storage;
    }

    const setTodoList = async (todolist: TodoInterface[]) => {
        console.log("received", todolist)
        await setStorage(todolist);
        return Object.values(storage);
    }

    const clearStorage = async () => {
        await setStorage([]);
    }

    return { getTodoList, setTodoList, clearStorage };
};