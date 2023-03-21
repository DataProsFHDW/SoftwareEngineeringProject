import { initializeApp } from "firebase/app";
import { firebaseConfig } from './utils/firebase/firebase-config';
import { Group } from "./models/Group";
import { User, User2 } from "./models/User";

import { EmailAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, deleteDoc, getDoc, getDocs, setDoc, query, where } from "firebase/firestore";
import { group } from "console";
import { Todo } from "./models/Todo_old";
import { ITodo, ITodoGroup } from "./models/ITodo";
import { List } from "@ionic/core/dist/types/components/list/list";
import FirestoreCollectionFields from "./models/FirestoreCollectionFields";
import FirestoreCollections from "./models/FirestoreCollections";
import { TodoType } from "./models/TodoType";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firestore = getFirestore(app);
export const auth = getAuth();
export const user_co = "USER_COLLECTION";
export const todo_co = "TO_DO_COLLECTION";
export const group_co = "GROUP_LIST";

const handleOfflineError = (error: any) => {
  console.error('Unable to complete operation while offline:', error);
  throw new Error('Unable to complete operation while offline.');
};

// https://firebase.google.com/docs/firestore/quickstart#web-version-9

const addUser = async (user: User) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('addUser');
    }
    let userDoc = await addDoc(collection(firestore, user_co), user);
    console.log("Document written with ID: ", userDoc.id);
    return userDoc.id;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

const getUser = async (userId: string) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('getUser');
    }
    let docSnap = await getDoc(doc(firestore, user_co, userId));
    return docSnap;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

const updateUser = async (userId: string, user: User) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('updateUser');
    }
    await setDoc(doc(firestore, user_co, userId), user);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update user in database.');
  }
};

const deleteUser = async (userId: string) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('deleteUser');
    }
    await deleteDoc(doc(firestore, user_co, userId));
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user from database.');
  }
};

export const getUsersFromFirestore = async (): Promise<User2[] | null> => {
  try {
    if (!navigator.onLine) {
      return null;
    }
    let docSnap = await getDocs(collection(firestore, FirestoreCollections.USERS));
    return docSnap.docs.map((doc) => new User2(doc.id, doc.data()["username"].toString()));
  } catch (error) {
    console.error('Error getting users', error);
    return null;
  }
  return null;
};

export const addToDoFirestore = async (todo: ITodoGroup) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('addToDo');
    }
    let todoDoc = await addDoc(collection(firestore, todo_co), todo);
    return todoDoc.id;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const getAllToDosFromFirestore = async (): Promise<ITodoGroup[] | null> => {
  try {
    if (!navigator.onLine) {
      return null;
    }

    let docSnap = await getDocs(collection(firestore, todo_co));

    var todos = docSnap.docs.map((doc) => {
      return {
        id: doc.id,
        todoType: TodoType.SIMPLE,
        todoTitle: doc.data()["todoTitle"].toString(),
        todoDescription: doc.data()["todoDescription"].toString(),
        users: doc.data()["users"],
        isDeleted: false,
        isSynced: true,
      }
    }).filter((todo) => todo.users.includes(auth.currentUser?.uid));

    return todos;
  } catch (error) {
    console.error('Error getting all todo:', error);
    return null;
  }
  return null;
};

const getToDo = async (todoId: string) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('getToDo');
    }
    let docSnap = await getDoc(doc(firestore, todo_co, todoId));
    return docSnap;
  } catch (error) {
    console.error('Error getting todo:', error);
    throw error;
  }
};

export const updateToDoToFirestore = async (todoId: string, todo: ITodo) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('updateToDo');
    }
    var updatedDoc = await setDoc(doc(firestore, todo_co, todoId), todo, { merge: true });
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteToDoToFirestore = async (todoId: string) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('deleteToDo');
    }
    await deleteDoc(doc(firestore, todo_co, todoId.toString()));
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

const addGroup = async (group: Group) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('addGroup');
    }
    let groupDoc = await addDoc(collection(firestore, group_co), group);
    console.log("Document written with ID: ", groupDoc.id);
    return groupDoc.id;
  } catch (error) {
    console.error('Error adding group:', error);
    throw error;
  }
};

const getGroup = async (groupId: string) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('getGroup');
    }
    let docSnap = await getDoc(doc(firestore, group_co, groupId));
    return docSnap;
  } catch (error) {
    console.error('Error getting group:', error);
    throw error;
  }
};

const updateGroup = async (groupId: string, group: Group) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('updateGroup');
    }
    await setDoc(doc(firestore, group_co, groupId), group);
  } catch (error) {
    console.error('Error updating group:', error);
    throw error;
  }
};

const deleteGroup = async (groupId: string) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('deleteGroup');
    }
    await deleteDoc(doc(firestore, group_co, groupId));
  } catch (error) {
    console.error('Error deleting group:', error);
    throw error;
  }
};
