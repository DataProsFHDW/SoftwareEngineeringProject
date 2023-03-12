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

    constructor(todoType: TodoType | null | undefined, todoTitle: string | null | undefined, todoDescription: string | undefined | null, id: string = uuidv4()) { // TODO change id to Firebase doc id
        this.id = id;
        this.todoType = todoType ?? TodoType.SINGLE;
        this.todoTitle = todoTitle ?? "Title";
        this.todoDescription = todoDescription ?? "";
    }

}