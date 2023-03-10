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
import { TodoInterface } from "../models/TodoInterface";
import "./ToDoComponent.css";

interface ToDoComponentProps extends TodoInterface {
  onEditClick: any;
  onDeleteClick: any;
}

export const ToDoComponent: React.FC<ToDoComponentProps> = ({
  todoType,
  todoTitle,
  todoDescription,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <IonItem>
      <IonCard >
        <div className="card-content">
          <IonCardHeader>
            <IonCardTitle>{todoTitle}</IonCardTitle>
            <IonCardSubtitle>{todoType.toString()}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>{todoDescription}</IonCardContent>
        </div>
        <IonButton fill="clear" onClick={onDeleteClick}>Delete</IonButton>
        <IonButton fill="clear" onClick={onEditClick}>Edit</IonButton>
      </IonCard>
      <IonReorder slot="end"></IonReorder>
    </IonItem>
  );
};
