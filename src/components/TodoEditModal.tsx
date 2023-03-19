import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonInput,
  IonPage,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
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
  const inputDescRef = useRef<HTMLIonInputElement>(null);
  const selectTypeRef = useRef<HTMLIonSelectElement>(null);
  function exportTodoWrapper(): ITodo {
    return {
      todoType: selectTypeRef.current?.value,
      todoTitle: inputTitleRef.current?.value ?? "Title",
      todoDescription: inputDescRef.current?.value?.toString() ?? "",
      id: todoItem.id,
    };
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => onDismiss(null, "cancel")}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Welcome</IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong={true}
              color="primary"
              onClick={() => onDismiss(exportTodoWrapper(), "confirm")}
            >
              Submit
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Enter Todo Title</IonLabel>
          {/** updateNewTodo(e.detail.value)*/}
          <IonInput
            type="text"
            placeholder="e.g. Shopping"
            value={todoItem.todoTitle}
            ref={inputTitleRef}
          />
          <IonLabel position="stacked">Enter Todo Description</IonLabel>
          {/** updateNewTodo(e.detail.value)*/}
          <IonInput
            type="text"
            placeholder="e.g. at the mall..."
            value={todoItem.todoDescription}
            ref={inputDescRef}
          />
          <IonSelect
            placeholder="Select TodoType"
            interface="popover"
            ref={selectTypeRef}
            value={todoItem.todoType}
          >
            <IonSelectOption value={TodoType.SIMPLE}>Simple</IonSelectOption>
            <IonSelectOption value={TodoType.GROUP}>Group</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};
