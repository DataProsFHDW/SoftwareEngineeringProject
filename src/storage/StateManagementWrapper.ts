import { useEffect, useState } from "react";
import { Preferences } from '@capacitor/preferences';
import useGlobalStorage from "./StateManagement";
import { Todo } from "../models/Todo";
import { TodoInterface } from "../models/TodoInterface";

// https://medium.com/ringcentral-developers/use-react-hooks-with-storage-as-global-state-management-f2945492aade
export const useTodoStorage = () => {
    const useStorage = useGlobalStorage();
    const [storage, setStorage] = useStorage("todoStorage");

    const getTodoList = (): TodoInterface[] => storage;

    const setTodoList = async (todolist: TodoInterface[]) => await setStorage(todolist);

    const addTodo = async (todo: Todo) => await setStorage([...storage, todo]);

    const removeTodo = async (todo: Todo) => {
        let todoList: TodoInterface[] = storage;
        todoList = todoList.filter((item: TodoInterface) => item.id !== todo.id);
        setTodoList(todoList);
    }

    const clearStorage = async () => await setStorage([]);

    return { storage, getTodoList, setTodoList, clearStorage, addTodo };
};