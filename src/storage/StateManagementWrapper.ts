import { Network } from '@capacitor/network';
import { uuidv4 } from "@firebase/util";
import { useIonToast } from "@ionic/react";
import { ITodo, ITodoGroup } from "../models/ITodo";
import { addToDoFirestore, deleteToDoToFirestore, getAllToDosFromFirestore, getUsersFromFirestore, updateToDoToFirestore } from "../utils/firebase/Database-function";
import NotificationUtils from "../utils/NotificationUtils";
import useGlobalStorage from "./StateManagement";

/**
 * This is a wrapper for the useGlobalStorage hook.
 * It provides a simple interface to store and retrieve data from the global storage.
 */
export const useTodoStorage = () => {
    const useStorage = useGlobalStorage();
    const [storage, setStorage] = useStorage("todoStorage", {
        todoList: [], username: null
    });
    const [present] = useIonToast();

    /**
     * This method lets you set the username in the global storage.
     * @param username The username to be stored.
     */
    const setUsername = async (username: string | null | undefined) => {
        await setStorage({ todoList: getTodoList(), username: username });
    }

    /**
     * This method lets you retrieve the username from the global storage.
     */
    const getUsername = () => {
        return storage.username;
    }

    /**
     * This method lets you set the todo list in the global storage.
     * @param todoList The todo list to be stored. 
     */
    const setTodoList = async (todoList: ITodoGroup[]) => {
        await setStorage({ todoList: todoList, username: getUsername() });
    }

    /**
     * This method lets you refresh the todo list from the global storage and syncs it with the online state.
     * It also schedules all todos for notifications.
     */
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

    /**
     * This method lets two todo lists be compared and returns a new list with all elements of both lists.
     * It is used to sync the local todo list with the online todo list.
     * @param listOld The old todo list.
     * @param listNew The new todo list.
     * @returns A new todo list with all elements of both lists.
     */
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

    /**
     * This method lets you retrieve the todo list from the global storage.
     * @returns The todo list.
     */
    const getTodoList = (): ITodoGroup[] => {
        if (storage.todoList as ITodoGroup) {
            return storage.todoList as ITodoGroup[]
        }
        return [];
        // TODO get from firebase
    }

    /**
     * This method lets you add a todo to the todo list in the global storage.
     * @param todo The todo to be added.
     * @returns The id of the todo.
     */
    const addTodo = async (todo: ITodoGroup) => {
        // NotificationUtils.schedule(new Date(), todo.todoTitle.toString(), todo.todoDescription ?? "");
        try {
            var networkState = await Network.getStatus();
            if (networkState.connected && networkState.connectionType != undefined) {
                var id = await addToDoFirestore({
                    id: todo.id,
                    todoType: todo.todoType,
                    todoTitle: todo.todoTitle,
                    todoDescription: todo.todoDescription,
                    todoDate: todo.todoDate,
                    //users: [auth.currentUser?.uid!],
                    users: todo.users,
                    isDeleted: false,
                    isSynced: true,
                    isOpen: todo.isOpen,
                });
                setTodoList([...getTodoList(), {
                    id: id,
                    todoType: todo.todoType,
                    todoTitle: todo.todoTitle,
                    todoDescription: todo.todoDescription,
                    todoDate: todo.todoDate,
                    //users: [auth.currentUser?.uid!],
                    users: todo.users,
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
                    todoDate: todo.todoDate,
                    //users: [auth.currentUser?.uid!],
                    users: todo.users,
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

    /**
     * This method lets you remove a todo from the todo list in the global storage.
     * @param todo The todo to be removed.
     */
    const removeTodo = async (todo: ITodo) => removeTodoById(todo.id);

    /**
     * This method lets you remove a todo from the todo list in the global storage.
     * @param id The id of the todo to be removed.
     */
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
                            todoDate: item.todoDate,
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

    /**
     * This method lets you update a todo in the todo list in the global storage.
     * @param todo The todo to be updated.
     */
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
                            todoDate: todo.todoDate,
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

    /**
     * This method lets you clear the entire global storage.
     */
    const clearStorage = async () => await setStorage({
        todoList: [], username: null
    });

    return { storage, setUsername, getUsername, refreshTodos, getTodoList, setTodoList, clearStorage, addTodo, removeTodo, removeTodoById, updateTodo };
};