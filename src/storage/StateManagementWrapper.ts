import { useEffect, useState } from "react";
import { Preferences } from '@capacitor/preferences';
import useGlobalStorage from "./StateManagement";
import { ITodo } from "../models/ITodo";
import NotificationUtils from "../utils/NotificationUtils";

// https://medium.com/ringcentral-developers/use-react-hooks-with-storage-as-global-state-management-f2945492aade
export const useTodoStorage = () => {
    const useStorage = useGlobalStorage();
    const [storage, setStorage] = useStorage("todoStorage", []);

    const getTodoList = (): ITodo[] => {
        if (storage as ITodo) {
            return storage as ITodo[]
        }
        return [];

        // TODO get from firebase
    }

    const setTodoList = async (todolist: ITodo[]) => await setStorage(todolist);

    const addTodo = async (todo: ITodo) => {
        NotificationUtils.schedule(new Date(), todo.todoTitle.toString(), todo.todoDescription ?? "");
        await setStorage([...storage, todo]);
    }

    const removeTodo = async (todo: ITodo) => removeTodoById(todo.id);


    const removeTodoById = async (id: string) => {
        let todoList: ITodo[] = storage;
        todoList = todoList.filter((item: ITodo) => item.id !== id);
        setTodoList(todoList);

        // TODO remove in firebase
    }

    const updateTodo = async (todo: ITodo) => {
        let todoList: ITodo[] = storage;
        todoList = todoList.map((item: ITodo) => {
            if (item.id === todo.id) {
                return todo;
            }
            return item;
        }
        );
        setTodoList(todoList);

        // TODO update in firebase
    }

    const clearStorage = async () => await setStorage([]);

    return { storage, getTodoList, setTodoList, clearStorage, addTodo, removeTodo, removeTodoById, updateTodo };
};