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
import { Timestamp } from "firebase/firestore";

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

  let todoDateJsx = "";

  if (todo.todoDate != null && typeof todo.todoDate == "object") {
    todoDateJsx = todo.todoDate!.toLocaleDateString("de-DE")
      + " | " + todo.todoDate!.toLocaleTimeString("de-DE");
  }

  return (
    <IonItem>
      <IonCheckbox slot="start" onIonChange={onCheckboxClick} checked={!todo.isOpen}></IonCheckbox>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{todo.todoTitle}</IonCardTitle>
          <IonCardSubtitle>{todo.todoDescription}</IonCardSubtitle>
        </IonCardHeader>

          <IonCardContent>
            {todoDateJsx}
            {/*todo.todoDate? todo.todoDate.toString(): "nothing here"*/}

          </IonCardContent>
        <IonButton fill="clear" onClick={onDeleteClick}>Delete</IonButton>
        <IonButton fill="clear" onClick={onEditClick}>Edit</IonButton>
      </IonCard>
      <IonReorder slot="end"></IonReorder>
    </IonItem>
  );
};
