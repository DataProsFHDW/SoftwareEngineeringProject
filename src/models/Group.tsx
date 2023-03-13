import { TodoType } from "./TodoType";
import { TodoInterface } from "./TodoInterface";
import { uuidv4 } from "@firebase/util";


export class Todo implements TodoInterface {
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