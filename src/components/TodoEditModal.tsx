import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonInput, IonPage } from "@ionic/react";
import React, { useRef } from "react";
import { ITodo } from "../models/ITodo";
import { TodoType } from "../models/TodoType";

type Props = {
  todoItem: ITodo;
  onDismiss: () => void;
};

export const TodoEditModal: React.FC<Props> = ({
  todoItem,
  onDismiss,
}: {
  todoItem: ITodo;
  onDismiss: (data?: ITodo | null | undefined, role?: string) => void;
}) => {
  const inputTitleRef = useRef<HTMLIonInputElement>(null);

  function exportItemWrapper(): ITodo {
    return {
      id: todoItem.id, // TODO change id to Firebase doc id
      todoType: todoItem.todoType,
      todoTitle: inputTitleRef.current?.value ?? "Title",
      todoDescription: "Edited",
    }
  }
  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton color="medium" onClick={() => onDismiss(null, "cancel")}>
            Cancel
          </IonButton>
        </IonButtons>
        <IonTitle>Welcome</IonTitle>
        <IonButtons slot="end">
          <IonButton
            onClick={() => onDismiss(exportItemWrapper(), "confirm")}
          >
            Confirm
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonContent className="ion-padding">
        <IonInput ref={inputTitleRef} value={todoItem?.todoTitle}></IonInput>
        <IonButton onClick={() => onDismiss()}>close</IonButton>
      </IonContent>
    </IonPage>
  );
};
