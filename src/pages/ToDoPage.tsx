import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { stringify } from "querystring";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ToDoComponent } from "../components/ToDoComponent";
import { fetchTodoList } from "../dataStores/todo/FetchTodos";
import { postTodoList } from "../dataStores/todo/PostTodos";
import { useTodoDispatch, useTodoSelector } from "../dataStores/todo/TodoSlice";
import { Todo } from "../models/Todo";
import { TodoType } from "../models/TodoType";
import "./Page.css";

export const ToDoPage: React.FC = () => {

  const todoReducer = useTodoSelector((state) => state.todoReducer)
  var dispatch = useTodoDispatch();

  useEffect(() => {
    dispatch(fetchTodoList({
      accessToken: "demo",
      idToken: "for_you_to_see_<3"
    }));
  }, []) // [] => do on initial render of todoPageComponent

  /*const [todoList, setTodoList] = useState<string[]>([]);*/

  let toDoRender = todoReducer.todoList.map((todo, index) => {
    return (
      <ToDoComponent
        key={"ToDo-" + index}
        id={"ToDo-" + index}
        title={todo.todoTitle}
      />
    )
  });
  let count = [1, 2, 3, 4, 5]

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-text-center">Your To Dos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <>
          <IonText>Your trustworthy ToDo App</IonText>
          <br />
          <br />
          {toDoRender}
          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton
              onClick={() => {
                // setTodoList([...todoList, "Test Todo" + todoList.length]);
                dispatch(postTodoList({
                  todo: new Todo(TodoType.SINGLE, "Demo Add", "Demo Description"),
                }));
              }}
            >
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
        </>
      </IonContent>
    </IonPage>
  );
};
