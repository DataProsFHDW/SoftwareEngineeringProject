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
import { useState } from "react";
import { useParams } from "react-router";
import { ToDoComponent } from "../components/ToDoComponent";
import "./Page.css";

export const ToDoPage: React.FC = () => {
  const [todoList, setTodoList] = useState(["Test Todod"]);

  let toDoRender = todoList.map((step, move) => {
    return(
      <ToDoComponent/>
    )
  });

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
          <IonText>Your trustworthy ToDo App wedw</IonText>
          <br />
          <br />
          {toDoRender}
          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton
              onClick={() => {
                console.log("Daniel stinkt");
                todoList.push("Hallo");
                setTodoList(todoList);
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
