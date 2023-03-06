import { TodoType } from "./TodoType";
import { TodoInterface } from "./TodoInterface";


export class Todo implements TodoInterface {
    todoType: TodoType;
    todoTitle: string;
    todoDescription: string;
    //creator: string = "";
    //inputOnClick:any;

    constructor(todoType: TodoType, todoTitle: string, todoDescription: string ) {
        this.todoType = todoType;
        this.todoTitle = todoTitle;
        this.todoDescription = todoDescription;
    }


}