import { initializeApp } from "firebase/app";
import { firebaseConfig } from './utils/firebase/firebase-config';

import { EmailAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firestore = getFirestore(app);
export const auth = getAuth();

// TODO Scheiß auf persistence, wir machen es einfach in unserem localstorage ;)

const handleOfflineError = (error: any) => {
  console.error('Unable to complete operation while offline:', error);
  throw new Error('Unable to complete operation while offline.');
};


interface User {
  username: string;
  name: string;
  surname: string;
  user_to_do_list: Array<string>;
  group_list: Array<string>;
}

interface Todo {
  Name: string;
  Tag: string;
  todos: Array<string>;
  Prio: number;
  description: string;
  completed: boolean;
  creator: string;
  Date: number;
  type: string;
}

interface Group {
  name: string;
  group_todo_list: string[];
}

const addUser = async (user: User) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('addUser');
    }

    // TODO https://firebase.google.com/docs/firestore/quickstart#web-version-9
    let userDoc = await addDoc(collection(firestore, "USER_COLLECTION"), user);
    // TODO Ich würde die USER_COLLECTION als statischen String ausspeichern, so passieren keine Typos auch bei anderen Abfragen.  

    /* const usersRef = dbRef.child('USER_COLLECTION');
    const userRef = usersRef.push();
    await userRef.set(user); */

    // TODO id ist die documentID => Unique in jeder collection
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
    const userRef = dbRef.child(`USER_COLLECTION/${userId}`);
    const snapshot = await userRef.once('value');
    return snapshot.val();
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

const updateUser = async (userId: string, updates: Partial<User>) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('updateUser');
    }
    const userRef = dbRef.child(`USER_COLLECTION/${userId}`);
    await userRef.update(updates);
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
    const userRef = dbRef.child(`USER_COLLECTION/${userId}`);
    await userRef.remove();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete user from database.');
  }
};

const addToDo = async (todo: Todo) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('addToDo');
    }
    const todosRef = dbRef.child(`TO_DO_COLLECTION`);
    const todoRef = todosRef.push();
    await todoRef.set(todo);
    return todoRef.key;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

const getToDo = async (todoId: string) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('getToDo');
    }
    const todoRef = dbRef.child(`TO_DO_COLLECTION/${todoId}`);
    const snapshot = await todoRef.once('value');
    return snapshot.val();
  } catch (error) {
    console.error('Error getting todo:', error);
    throw error;
  }
};

const updateToDo = async (todoId: string, updates: Partial<Todo>) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('updateToDo');
    }
    const todoRef = dbRef.child(`TO_DO_COLLECTION/${todoId}`);
    await todoRef.update(updates);
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

const deleteToDo = async (todoId: string) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('deleteToDo');
    }
    const todoRef = dbRef.child(`TO_DO_COLLECTION/${todoId}`);
    await todoRef.remove();
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
    const groupsRef = dbRef.child('GROUP_LIST');
    const groupRef = groupsRef.push();
    await groupRef.set(group);
    return groupRef.key;
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
    const groupRef = dbRef.child(`GROUP_LIST/${groupId}`);
    const snapshot = await groupRef.once('value');
    return snapshot.val();
  } catch (error) {
    console.error('Error getting group:', error);
    throw error;
  }
};

const updateGroup = async (groupId: string, updates: Partial<Group>) => {
  try {
    if (!navigator.onLine) {
      handleOfflineError('updateGroup');
    }
    const groupRef = dbRef.child(`GROUP_LIST/${groupId}`);
    await groupRef.update(updates);
    return groupId;
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
    const groupRef = dbRef.child(`GROUP_LIST/${groupId}`);
    await groupRef.remove();
    return groupId;
  } catch (error) {
    console.error('Error deleting group:', error);
    throw error;
  }
};
