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
import { useState } from "react";
import { useParams } from "react-router";
import { ToDoComponent } from "../components/ToDoComponent";
import "./Page.css";

export const ToDoPage: React.FC = () => {
  const [todoList, setTodoList] = useState<string[]>([]);

  let toDoRender = todoList.map((todo, index) => {
    return(
      <ToDoComponent
        key={"ToDo-" + index}
        id={"ToDo-" + index}
        title={todo}
      />
    )
  });
  let count = [1,2,3,4,5]

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
                setTodoList([ ...todoList, "Test Todo" + todoList.length]);
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
