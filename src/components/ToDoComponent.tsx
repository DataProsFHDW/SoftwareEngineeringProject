import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonReorder,
  IonItem,
  IonButton,
  IonButtons,
  IonCheckbox,
} from "@ionic/react";
import { ITodo } from "../models/ITodo";
import "./ToDoComponent.css";

interface ToDoComponentProps {
  onEditClick: any;
  onDeleteClick: any;
  onCheckboxClick: any
  todo: ITodo;
}

export const ToDoComponent: React.FC<ToDoComponentProps> = ({
  todo,
  onEditClick,
  onDeleteClick,
  onCheckboxClick
}) => {
  return (
    <IonItem>
      <IonCheckbox slot="start" onIonChange={onCheckboxClick}></IonCheckbox>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{todo.todoTitle}</IonCardTitle>
          <IonCardSubtitle>{todo.todoDescription}</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>{todo.todoDescription}</IonCardContent>
        <IonButton fill="clear" onClick={onDeleteClick}>
          Delete
        </IonButton>
        <IonButton fill="clear" onClick={onEditClick}>
          Edit
        </IonButton>
      </IonCard>
      <IonReorder slot="end"></IonReorder>
    </IonItem>
  );
};
