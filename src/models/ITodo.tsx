import { TodoType } from "./TodoType";

export interface ITodo {
    id: string; // TODO change id to Firebase doc id
    todoType: TodoType;
    todoTitle: number | string; // Number just cause Error in Modal Input field
    todoDescription?: string | null | undefined;
    todoDate?: Date | null | undefined;
    todoCreationDate?: Date | null | undefined;
    //creator: string = "";
    //inputOnClick:any;  

}

export interface ITodoGroup extends ITodo {
    users: string[];
    isDeleted: boolean;
    isSynced: boolean;
}