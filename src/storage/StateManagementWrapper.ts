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

        // TODO get from firebase
    }

    const setTodoList = async (todolist: TodoInterface[]) => await setStorage(todolist);

    const addTodo = async (todo: TodoInterface) {
        await setStorage([...storage, todo]);
        // TODO add in firebase
    }

    const removeTodo = async (todo: TodoInterface) => removeTodoById(todo.id);


    const removeTodoById = async (id: string) => {
        let todoList: TodoInterface[] = storage;
        todoList = todoList.filter((item: TodoInterface) => item.id !== id);
        setTodoList(todoList);

        // TODO remove in firebase
    }

    const updateTodo = async (todo: TodoInterface) => {
        let todoList: TodoInterface[] = storage;
        todoList = todoList.map((item: TodoInterface) => {
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