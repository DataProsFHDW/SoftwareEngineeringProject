import { TodoType } from "./TodoType";

/**
 * Interface for a Todo
 */
export interface ITodo {
    id: string; // TODO change id to Firebase doc id
    todoType: TodoType;
    todoTitle: number | string; // Number just cause Error in Modal Input field
    todoDescription?: string | null | undefined;
    todoDate?: Date | null | undefined;
    todoCreationDate?: Date | null | undefined;
    isOpen: boolean
    //creator: string = "";
    //inputOnClick:any;  

}

/**
 * Interface for a TodoGroup extending from {ITodo}
 */
export interface ITodoGroup extends ITodo {
    users: string[];
    isDeleted: boolean;
    isSynced: boolean;
}