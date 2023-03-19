import { TodoType } from "./TodoType";

export interface ITodo {
    id: string; // TODO change id to Firebase doc id
    todoType: TodoType;
    todoTitle: string| number; // Number just cause Error in Modal Input field
    todoDescription?: string;
    //creator: string = "";
    //inputOnClick:any;

}