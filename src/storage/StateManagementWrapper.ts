import { useEffect, useState } from "react";
import { Preferences } from '@capacitor/preferences';
import useGlobalStorage from "./StateManagement";
import { ITodo, ITodoGroup } from "../models/ITodo";
import NotificationUtils from "../utils/NotificationUtils";
import { addToDoFirestore, auth, deleteToDoToFirestore, getAllToDosFromFirestore, getUsersFromFirestore, updateToDoToFirestore } from "../Database-function";
import { useIonToast } from "@ionic/react";
import { uuidv4 } from "@firebase/util";
import { Network } from '@capacitor/network';

// https://medium.com/ringcentral-developers/use-react-hooks-with-storage-as-global-state-management-f2945492aade
export const useTodoStorage = () => {
    const useStorage = useGlobalStorage();
    const [storage, setStorage] = useStorage("todoStorage", []);
    const [present] = useIonToast();

    const refreshTodos = async () => {
        try {
            // TODO refresh todos try
            await Network.getStatus().then(async (value) => {
                console.log("Wrong Data???", value)
                if (!value.connected) {
                    present({ message: "Please enable internet.", duration: 1500, position: "bottom" });
                    console.log("Please enable internet")
                    return;
                } else {
                    console.log("Trying to upload offline data");
                    getTodoList().forEach(async (todo) => {
                        if (!todo.isSynced) {
                            try {
                                if (todo.isDeleted) {
                                    await deleteToDoToFirestore(todo.id);
                                    return;
                                } else {
                                    await updateToDoToFirestore(todo.id, todo);
                                }
                            } catch (error) {
                                console.error("Error while saving to firebase", error);
                                present({ message: "Please try again.", duration: 1500 });
                            }
                        }
                    });

                    var todos = await getAllToDosFromFirestore();
                    setStorage(todos);
                }
            });
        } catch (exception) {
            present({ message: "Please try again.", duration: 1500 });
        }
    }

    const getTodoList = (): ITodoGroup[] => {
        if (storage as ITodoGroup) {
            return storage as ITodoGroup[]
        }
        return [];
        // TODO get from firebase
    }

    const setTodoList = async (todolist: ITodoGroup[]) => await setStorage(todolist);

    const addTodo = async (todo: ITodo) => {
        NotificationUtils.schedule(new Date(), todo.todoTitle.toString(), todo.todoDescription ?? "");
        try {
            if ((await Network.getStatus()).connected) {
                var id = await addToDoFirestore({
                    id: todo.id,
                    todoType: todo.todoType,
                    todoTitle: todo.todoTitle,
                    todoDescription: todo.todoDescription,
                    users: [auth.currentUser?.uid!],
                    isDeleted: false,
                    isSynced: true,
                });
                await setStorage([...storage, {
                    id: id,
                    todoType: todo.todoType,
                    todoTitle: todo.todoTitle,
                    todoDescription: todo.todoDescription,
                    users: [auth.currentUser?.uid!],
                    isDeleted: false,
                    isSynced: true,
                },]);
            } else {
                await setStorage([...storage, {
                    id: uuidv4,
                    todoType: todo.todoType,
                    todoTitle: todo.todoTitle,
                    todoDescription: todo.todoDescription,
                    users: [auth.currentUser?.uid!],
                    isDeleted: false,
                    isSynced: false,
                },]);
            }
        } catch (error) {
            console.error("Error while saving to firebase", error);
            present({ message: "Please try again.", duration: 1500 });
        }
    }

    const removeTodo = async (todo: ITodo) => removeTodoById(todo.id);

    const removeTodoById = async (id: string) => {
        console.log(getUsersFromFirestore(), "users");
        try {
            if ((await Network.getStatus()).connected) {
                await deleteToDoToFirestore(id);
                let todoList: ITodoGroup[] = storage;
                todoList = todoList.filter((item: ITodo) => item.id !== id);
                setTodoList(todoList);
            } else {
                let todoList: ITodoGroup[] = storage;
                todoList = todoList.map((item: ITodoGroup) => {
                    if (item.id === id) {
                        return {
                            id: uuidv4(),
                            todoType: item.todoType,
                            todoTitle: item.todoTitle,
                            todoDescription: item.todoDescription,
                            users: item.users,
                            isDeleted: true,
                            isSynced: false,
                        };
                    }
                    return item;
                });
                setTodoList(todoList);
            }
        } catch (error) {
            console.error("Error while removing from firebase", error);
            present({ message: "Please try again.", duration: 1500 });
        }
    }

    const updateTodo = async (todo: ITodoGroup) => {
        try {
            if ((await Network.getStatus()).connected) {
                await updateToDoToFirestore(todo.id, todo);
                let todoList: ITodoGroup[] = storage;
                todoList = todoList.map((item: ITodoGroup) => {
                    if (item.id === todo.id) {
                        return todo;
                    }
                    return item;
                }
                );
                setTodoList(todoList);
            } else {
                let todoList: ITodoGroup[] = storage;
                todoList = todoList.map((item: ITodoGroup) => {
                    if (item.id === todo.id) {
                        return {
                            id: todo.id,
                            todoType: todo.todoType,
                            todoTitle: todo.todoTitle,
                            todoDescription: todo.todoDescription,
                            users: todo.users,
                            isDeleted: todo.isDeleted,
                            isSynced: false,
                        };
                    }
                    return item;
                }
                );
                setTodoList(todoList);
            }
        } catch (error) {
            console.error("Error while updating Todo to firebase", error);
            present({ message: "Please try again.", duration: 1500 });
        }
    }

    const clearStorage = async () => await setStorage([]);

    return { storage, refreshTodos, getTodoList, setTodoList, clearStorage, addTodo, removeTodo, removeTodoById, updateTodo };
};