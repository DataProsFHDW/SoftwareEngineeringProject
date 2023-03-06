import { TodoType } from "./TodoType";

export class Todo {
    todoType: TodoType;
    todoTitle: string;
    todoDescription: string = "";
    //creator: string = "";

    constructor(todoType: TodoType, todoTitle: string, todoDescription: string ) {
        this.todoType = todoType;
        this.todoTitle = todoTitle;
        this.todoDescription = todoDescription;
    }


}