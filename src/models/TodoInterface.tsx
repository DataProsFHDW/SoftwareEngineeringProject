import { TodoType } from "./TodoType";

export interface TodoInterface {
    id: string;
    todoType: TodoType;
    todoTitle: string;
    todoDescription: string;
    //creator: string = "";
    //inputOnClick:any;

}