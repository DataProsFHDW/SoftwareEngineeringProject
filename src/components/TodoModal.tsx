import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonSelectOption,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Todo } from "../models/Todo";
import { TodoInterface } from "../models/TodoInterface";
import { TodoType } from "../models/TodoType";
import { useTodoStorage } from "../storage/StateManagementWrapper";

interface ToDoComponentProps {
  isOpen: boolean,
}

export const TodoModal: React.FC<ToDoComponentProps> = ({
  isOpen
}) => {
  const todoStorage = useTodoStorage();

  const [title, setTitle] = useState<string | undefined | null>(todoStorage.getSelectedTodo()?.todoTitle);
  const [description, setDescription] = useState<string | undefined | null>(todoStorage.getSelectedTodo()?.todoDescription);
  const [todoType, setTodoType] = useState<TodoType | undefined | null>(todoStorage.getSelectedTodo()?.todoType)

  return (
    <IonModal isOpen={isOpen ? true : false}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => {
              console.log("Todo Object", todoStorage.getSelectedTodo())
              todoStorage.setSelectedTodo(null);
            }}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Welcome</IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong={true}
              color="primary"
              onClick={() => {
                /* Submit */
                /*todoStorage.updateTodo(new Todo(
                  todoType,
                  title,
                  description,
                  todo?.id,
                ));*/
              }}
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
            onIonChange={(e) => setTitle(e.detail.value)}
            value={title}
          />
          <IonLabel position="stacked">Enter Todo Description</IonLabel>
          {/** updateNewTodo(e.detail.value)*/}
          <IonInput
            type="text"
            placeholder="e.g. at the mall..."
            onIonChange={(e) => setDescription(e.detail.value)}
            value={description}
          />
          <IonSelect
            placeholder="Select TodoType"
            interface="popover"
            onIonChange={(e) => setTodoType(e.detail.value)}          >
            <IonSelectOption value={TodoType.SINGLE}>Simple</IonSelectOption>
            <IonSelectOption value={TodoType.TIMEBOUND}>
              Timebound
            </IonSelectOption>
            <IonSelectOption value={TodoType.GROUP}>Group</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonContent>
    </IonModal>
  );
};
