import { useEffect, useState } from "react";
import { Preferences } from '@capacitor/preferences';
import useGlobalStorage from "./StateManagement";
import { Todo } from "../models/Todo";
import { TodoInterface } from "../models/TodoInterface";

// https://medium.com/ringcentral-developers/use-react-hooks-with-storage-as-global-state-management-f2945492aade
export const useTodoStorage = () => {
    const useStorage = useGlobalStorage();
    const [storage, setStorage] = useStorage("todoStorage", { todoList: [], selectedTodo: null });

    const getTodoList = (): TodoInterface[] => {
        if (storage.todoList as TodoInterface) {
            return storage.todoList as TodoInterface[]
        }
        return [];
    }

    const getSelectedTodo = (): TodoInterface | null => {
        if (storage.selectedTodo as TodoInterface) {
            return storage.selectedTodo as TodoInterface
        }
        return null;
    }

    const setTodoList = async (todolist: TodoInterface[]) => await setStorage({ selectedTodo: storage.selectedTodo, todoList: todolist });

    const setSelectedTodo = async (todo: TodoInterface | null) => await setStorage({ selectedTodo: todo, todoList: storage.todoList });

    const addTodo = async (todo: TodoInterface) => {
        await setStorage({ selectedTodo: storage.selectedTodo, todoList: [...storage.todoList, todo] });
    }

    const removeTodo = async (todo: TodoInterface) => removeTodoById(todo.id);

    const removeTodoById = async (id: string) => {
        let todoList: TodoInterface[] = storage.todoList;
        todoList = todoList.filter((item: TodoInterface) => item.id !== id);
        setTodoList(todoList);
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
    }

    const clearStorage = async () => await setStorage([]);

    return { storage, getSelectedTodo, getTodoList, setSelectedTodo, setTodoList, clearStorage, addTodo, removeTodo, removeTodoById, updateTodo };
};