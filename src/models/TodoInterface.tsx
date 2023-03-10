import { TodoType } from "./TodoType";

export interface TodoInterface {
    todoType: TodoType;
    todoTitle: string;
    todoDescription?: string;
    //creator: string = "";
    //inputOnClick:any;

}