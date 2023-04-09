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
} from "@ionic/react";
import { ITodo } from "../models/ITodo";
import "./ToDoComponent.css";
import { Timestamp } from "firebase/firestore";

interface ToDoComponentProps {
  onEditClick: any;
  onDeleteClick: any;
  todo: ITodo,
}

export const ToDoComponent: React.FC<ToDoComponentProps> = ({
  todo,
  onEditClick,
  onDeleteClick,
}) => {

  let todoDateJsx = "";

  if (todo.todoDate != null && typeof todo.todoDate == "object") {
    todoDateJsx = todo.todoDate!.toLocaleDateString("de-DE")
      + " | " + todo.todoDate!.toLocaleTimeString("de-DE");
  }

  return (
    <IonItem>
      <IonCard >
        <div className="card-content">
          <IonCardHeader>
            <IonCardTitle>{todo.todoTitle}</IonCardTitle>
            <IonCardSubtitle>{todo.todoType?.toString()}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            {todoDateJsx}
            {/*todo.todoDate? todo.todoDate.toString(): "nothing here"*/}

          </IonCardContent>
        </div>
        <IonButton fill="clear" onClick={onDeleteClick}>Delete</IonButton>
        <IonButton fill="clear" onClick={onEditClick}>Edit</IonButton>
      </IonCard>
      <IonReorder slot="end"></IonReorder>
    </IonItem>
  );
};
