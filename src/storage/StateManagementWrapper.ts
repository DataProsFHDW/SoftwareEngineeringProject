import { useEffect, useState } from "react";
import { Preferences } from '@capacitor/preferences';
import useGlobalStorage from "./StateManagement";
import { ITodo } from "../models/ITodo";

// https://medium.com/ringcentral-developers/use-react-hooks-with-storage-as-global-state-management-f2945492aade
export const useTodoStorage = () => {
    const useStorage = useGlobalStorage();
    const [storage, setStorage] = useStorage("todoStorage", []);

    const getTodoList = (): ITodo[] => {
        if (storage as ITodo) {
            return storage as ITodo[]
        }
        return [];
    }

    const setTodoList = async (todolist: ITodo[]) => await setStorage(todolist);

    const addTodo = async (todo: ITodo) => await setStorage([...storage, todo]);

    const removeTodo = async (todo: ITodo) => removeTodoById(todo.id);

    const removeTodoById = async (id: string) => {
        let todoList: ITodo[] = storage;
        todoList = todoList.filter((item: ITodo) => item.id !== id);
        setTodoList(todoList);
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
    }

    const clearStorage = async () => await setStorage([]);

    return { storage, getTodoList, setTodoList, clearStorage, addTodo, removeTodo, removeTodoById, updateTodo };
};