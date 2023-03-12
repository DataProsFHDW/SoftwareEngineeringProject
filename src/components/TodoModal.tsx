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
import React from "react";
import { Todo } from "../models/Todo";
import { TodoInterface } from "../models/TodoInterface";
import { TodoType } from "../models/TodoType";

const TodoModal: React.FC<Todo| null> = ({
  todo: Todo| null,
}

) => {
  return (
    <IonModal isOpen={todo?true:false}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setModalIsOpen(false)}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Welcome</IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong={true}
              color="primary"
              onClick={() => submitTodo()}
            >
              Add Todo
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
            onIonChange={(e) => updateNewTodoTitle(e.detail.value)}
            value={newTodoTitle}
          />
          <IonLabel position="stacked">Enter Todo Description</IonLabel>
          {/** updateNewTodo(e.detail.value)*/}
          <IonInput
            type="text"
            placeholder="e.g. at the mall..."
            onIonChange={(e) => updateNewTodoDesc(e.detail.value)}
            value={newTodoDesc}
          />
          <IonSelect
            placeholder="Select TodoType"
            interface="popover"
            onIonChange={(e) => updateNewTodoType(e.detail.value)}
          >
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
export default TodoModal;
