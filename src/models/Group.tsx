import { uuidv4 } from "@firebase/util";
import { User } from "./User";

export class Group {
    id: string;
    GROUP_NAME: string;
    GROUP_TODO_LIST: any[] | null;
    USER_COLLECTION: Record<string, User> | null;

  constructor(groupName: string) {
    this.id = uuidv4();
    this.GROUP_NAME = groupName;
    this.GROUP_TODO_LIST = null;
    this.USER_COLLECTION = null;
  }
}