import { uuidv4 } from "@firebase/util";

export class User {
    id: string;
    name: string;
    surname: string;
    username: string;
    groupList: string[] | null;
    userToDoList: string[] | null;
  
    constructor(name: string, surname: string, username: string) {  
        this.id = uuidv4();
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.groupList = null;
        this.userToDoList = null;
    }

}