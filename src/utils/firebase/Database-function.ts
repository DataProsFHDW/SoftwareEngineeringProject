import { initializeApp } from "firebase/app";
import { User2 } from "../../models/User";
import { firebaseConfig } from "./firebase-config";

import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import FirestoreCollections from "../../models/FirestoreCollections";
import { ITodo, ITodoGroup } from "../../models/ITodo";
import { TodoType } from "../../models/TodoType";

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firestore = getFirestore(app);
export const auth = getAuth();
export const user_co = "USER_COLLECTION";
export const todo_co = "TO_DO_COLLECTION";
export const group_co = "GROUP_LIST";

/**
 * Handles errors that occur when the user is offline.
 */
const handleOfflineError = (error: any) => {
  console.error("Unable to complete operation while offline:", error);
  throw new Error("Unable to complete operation while offline.");
};

/**
 * Fetches all users from the database.
 * @returns An array of users or null if the user is offline.
 */
export const getUsersFromFirestore = async (): Promise<User2[] | null> => {
  try {
    if (!navigator.onLine) {
      return null;
    }
    let docSnap = await getDocs(
      collection(firestore, FirestoreCollections.USERS)
    );
    return docSnap.docs.map(
      (doc) => new User2(doc.id, doc.data()["username"].toString())
    );
  } catch (error) {
    console.error("Error getting users", error);
    return null;
  }
};

/**
 * Adds a todo to the database.
 * @param todo The todo to add.
 * @returns The id of the newly created todo.
 */
export const addToDoFirestore = async (todo: ITodoGroup) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError("addToDo");
    }
    let todoDoc = await addDoc(collection(firestore, todo_co), todo);
    return todoDoc.id;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

/**
 * Fetch all todos from the database.
 * @returns An array of todos or null if the user is offline.
 */
export const getAllToDosFromFirestore = async (): Promise<
  ITodoGroup[] | null
> => {
  try {
    if (!navigator.onLine) {
      return null;
    }

    let docSnap = await getDocs(collection(firestore, todo_co));

    var todos = docSnap.docs.map((doc) => {
      let timestamp = null;

      if (doc.data()["todoDate"]) {
        // Object { seconds: 1680908377, nanoseconds: 755000000 }
        timestamp = new Timestamp(
          doc.data()["todoDate"]["seconds"],
          doc.data()["todoDate"]["nanoseconds"]).toDate();
      }

      return {
        id: doc.id,
        todoType: TodoType.SIMPLE,
        todoTitle: doc.data()["todoTitle"].toString(),
        todoDescription: doc.data()["todoDescription"].toString(),
        todoDate: timestamp,
        users: doc.data()["users"],
        isDeleted: false,
        isSynced: true,
        isOpen: doc.data()["isOpen"] ?? true,
      };
    })
      .filter((todo) => todo.users.includes(auth.currentUser?.uid));

    return todos;
  } catch (error) {
    console.error("Error getting all todo:", error);
    return null;
  }
};

/**
 * Updates a todo in the database.
 * @param todoId The id of the todo to update.
 * @param todo The updated todo.
 */
export const updateToDoToFirestore = async (todoId: string, todo: ITodo) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError("updateToDo");
    }
    await setDoc(doc(firestore, todo_co, todoId), todo, {
      merge: true,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

/**
 * Deletes a todo from the database.
 * @param todoId The id of the todo to delete.
 */
export const deleteToDoToFirestore = async (todoId: string) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError("deleteToDo");
    }
    await deleteDoc(doc(firestore, todo_co, todoId.toString()));
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};