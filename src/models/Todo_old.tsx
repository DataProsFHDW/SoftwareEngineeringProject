import { TodoType } from "./TodoType";
import { ITodo } from "./ITodo";
import { uuidv4 } from "@firebase/util";


export class Todo implements ITodo {
    id: string;
    todoType: TodoType;
    todoTitle: string;
    todoDescription: string;
    //creator: string = "";
    //inputOnClick:any; 

    constructor(todoType: TodoType, todoTitle: string, todoDescription: string) {
        this.id = uuidv4(); // TODO change id to Firebase doc id
        this.todoType = todoType;
        this.todoTitle = todoTitle;
        this.todoDescription = todoDescription;
    }

}