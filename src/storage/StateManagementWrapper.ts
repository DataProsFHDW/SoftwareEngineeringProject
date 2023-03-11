import { useEffect, useState } from "react";
import { Preferences } from '@capacitor/preferences';
import useGlobalStorage from "./StateManagement";
import { Todo } from "../models/Todo";
import { TodoInterface } from "../models/TodoInterface";

// https://medium.com/ringcentral-developers/use-react-hooks-with-storage-as-global-state-management-f2945492aade
export const useTodoStorage = () => {
    const useStorage = useGlobalStorage();
    const [storage, setStorage] = useStorage("todoStorage", []);

    const getTodoList = (): TodoInterface[] => {
        if (storage as TodoInterface) {
            return storage as TodoInterface[]
        }
        return [];
    }

    const setTodoList = async (todolist: TodoInterface[]) => await setStorage(todolist);

    const addTodo = async (todo: TodoInterface) => await setStorage([...storage, todo]);

    const removeTodo = async (todo: TodoInterface) => removeTodoById(todo.id);

    const removeTodoById = async (id: string) => {
        let todoList: TodoInterface[] = storage;
        todoList = todoList.filter((item: TodoInterface) => item.id !== id);
        setTodoList(todoList);
    }

    const clearStorage = async () => await setStorage([]);

    return { storage, getTodoList, setTodoList, clearStorage, addTodo, removeTodo, removeTodoById };
};