import { uuidv4 } from "@firebase/util";

/**
 * User class to create a User
 */
export class User2 {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

}

/**
 * User class to create a User
 */
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