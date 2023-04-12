import { useEffect, useState } from "react";
import { Preferences } from '@capacitor/preferences';
import useGlobalStorage from "./StateManagement";
import { ITodo, ITodoGroup } from "../models/ITodo";
import NotificationUtils from "../utils/NotificationUtils";
import { addToDoFirestore, auth, deleteToDoToFirestore, getAllToDosFromFirestore, getUsersFromFirestore, updateToDoToFirestore } from "../utils/firebase/Database-function";
import { useIonToast } from "@ionic/react";
import { uuidv4 } from "@firebase/util";
import { Network } from '@capacitor/network';

// https://medium.com/ringcentral-developers/use-react-hooks-with-storage-as-global-state-management-f2945492aade
export const useTodoStorage = () => {
    const useStorage = useGlobalStorage();
    const [storage, setStorage] = useStorage("todoStorage", {
        todoList: [], username: null
    });
    const [present] = useIonToast();

    const setUsername = async (username: string | null | undefined) => {
        await setStorage({ todoList: getTodoList(), username: username });
    }

    const getUsername = () => {
        return storage.username;
    }

    const setTodoList = async (todoList: ITodoGroup[]) => {
        await setStorage({ todoList: todoList, username: getUsername() });
    }

    const refreshTodos = async () => {
        try {
            await Network.getStatus().then(async (value) => {
                if (!value.connected || value.connectionType == undefined) {
                    present({ message: "Please enable internet.", duration: 1500, position: "bottom" });
                    console.log("Please enable internet")
                    return;
                } else {
                    try {
                        getTodoList().forEach(async (todo) => {
                            if (!todo.isSynced) {
                                if (todo.isDeleted) {
                                    await deleteToDoToFirestore(todo.id);
                                    return;
                                } else {
                                    await updateToDoToFirestore(todo.id, todo);
                                }

                            }
                        });

                        var todos = await getAllToDosFromFirestore();
                        if (todos) setTodoList(compareTodoList(getTodoList(), todos));
                    } catch (error) {
                        console.error("Error while saving to firebase", error);
                        present({ message: "Please try again.", duration: 1500 });
                    }
                }
            });
        } catch (exception) {
            present({ message: "Please try again.", duration: 1500 });
        }
    }

    const compareTodoList = (listOld: ITodoGroup[], listNew: ITodoGroup[]): ITodoGroup[] => {
        var res: ITodoGroup[] = listNew;
        listOld.forEach((e) => {
            var contains: boolean = false;
            res.forEach((listElement) => {
                if (listElement.id == e.id) {
                    contains = true;
                }
            });
            if (!contains) res = [...res, e];
        });
        return res;
    }

    const getTodoList = (): ITodoGroup[] => {
        if (storage.todoList as ITodoGroup) {
            return storage.todoList as ITodoGroup[]
        }
        return [];
        // TODO get from firebase
    }

    const addTodo = async (todo: ITodo) => {
        // NotificationUtils.schedule(new Date(), todo.todoTitle.toString(), todo.todoDescription ?? "");
        try {
            var networkState = await Network.getStatus();
            if (networkState.connected && networkState.connectionType != undefined) {
                var id = await addToDoFirestore({
                    id: todo.id,
                    todoType: todo.todoType,
                    todoTitle: todo.todoTitle,
                    todoDescription: todo.todoDescription,
                    users: [auth.currentUser?.uid!],
                    isDeleted: false,
                    isSynced: true,
                    isOpen: todo.isOpen,
                });
                setTodoList([...getTodoList(), {
                    id: id,
                    todoType: todo.todoType,
                    todoTitle: todo.todoTitle,
                    todoDescription: todo.todoDescription,
                    users: [auth.currentUser?.uid!],
                    isDeleted: false,
                    isSynced: true,
                    isOpen: todo.isOpen,
                },]);
            } else {
                setTodoList([...getTodoList(), {
                    id: uuidv4(),
                    todoType: todo.todoType,
                    todoTitle: todo.todoTitle,
                    todoDescription: todo.todoDescription,
                    users: [auth.currentUser?.uid!],
                    isDeleted: false,
                    isSynced: false,
                    isOpen: todo.isOpen,
                },]);
                await refreshTodos();
            }
        } catch (error) {
            console.error("Error while saving to firebase", error);
            present({ message: "Please try again.", duration: 1500 });
        }

        NotificationUtils.scheduleAllTodos(getTodoList());
    }

    const removeTodo = async (todo: ITodo) => removeTodoById(todo.id);

    const removeTodoById = async (id: string) => {
        console.log(getUsersFromFirestore(), "users");
        try {
            var networkState = await Network.getStatus();
            if (networkState.connected && networkState.connectionType != undefined) {
                await deleteToDoToFirestore(id);
                let todoList: ITodoGroup[] = getTodoList();
                todoList = todoList.filter((item: ITodo) => item.id !== id);
                setTodoList(todoList);
            } else {
                let todoList: ITodoGroup[] = getTodoList();
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
                            isOpen: item.isOpen,
                        };
                    }
                    return item;
                });
                setTodoList(todoList);
                await refreshTodos();
            }
        } catch (error) {
            console.error("Error while removing from firebase", error);
            present({ message: "Please try again.", duration: 1500 });
        }

        NotificationUtils.scheduleAllTodos(getTodoList());
    }

    const updateTodo = async (todo: ITodoGroup) => {
        try {
            var networkState = await Network.getStatus();
            if (networkState.connected && networkState.connectionType != undefined) {
                await updateToDoToFirestore(todo.id, todo);
                let todoList: ITodoGroup[] = getTodoList();
                todoList = todoList.map((item: ITodoGroup) => {
                    if (item.id === todo.id) {
                        return todo;
                    }
                    return item;
                }
                );
                setTodoList(todoList);
            } else {
                let todoList: ITodoGroup[] = getTodoList();
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
                            isOpen: todo.isOpen,
                        };
                    }
                    return item;
                }
                );
                setTodoList(todoList);
                await refreshTodos();
            }
        } catch (error) {
            console.error("Error while updating Todo to firebase", error);
            present({ message: "Please try again.", duration: 1500 });
        }

        NotificationUtils.scheduleAllTodos(getTodoList());
    }

    const clearStorage = async () => await setStorage({
        todoList: [], username: null
    });

    return { storage, setUsername, getUsername, refreshTodos, getTodoList, setTodoList, clearStorage, addTodo, removeTodo, removeTodoById, updateTodo };
};