import { TodoType } from "./TodoType";

export interface TodoInterface {
    id: string; // TODO change id to Firebase doc id
    todoType: TodoType;
    todoTitle: string;
    todoDescription?: string;
    //creator: string = "";
    //inputOnClick:any;

}