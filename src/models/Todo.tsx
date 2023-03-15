import { TodoType } from "./TodoType";
import { TodoInterface } from "./TodoInterface";
import { uuidv4 } from "@firebase/util";
import { User } from "./User";

export class Todo implements TodoInterface {
    id: string;
    todoType: TodoType;
    todoTitle: string;
    todoDescription: string;
/*  creator: User;
    responsible: User;
    inputOnClick:any; 
    Tag: string;
    todos: Array<string>;
    Prio: number;
    completed: boolean;
    Date: number;
*/

    constructor(todoType: TodoType, todoTitle: string, todoDescription: string) {
        this.id = uuidv4(); // TODO change id to Firebase doc id
        this.todoType = todoType;
        this.todoTitle = todoTitle;
        this.todoDescription = todoDescription;
    }

}