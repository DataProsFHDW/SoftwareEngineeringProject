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
  onTodoCardClick: Function;
  onDeleteClick: Function;
}

export const ToDoComponent: React.FC<ToDoComponentProps> = ({
  todoType,
  todoTitle,
  todoDescription,
  onTodoCardClick,
  onDeleteClick,
}) => {
  return (
    <IonItem>
      
      <IonCard onClick={onTodoCardClick()}>
        <div className="card-content">
          <IonCardHeader>
            <IonCardTitle>{todoTitle}</IonCardTitle>
            <IonCardSubtitle>{todoType.toString()}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>{todoDescription}</IonCardContent>
        </div>
      </IonCard>
      <IonReorder slot="end"></IonReorder>
    </IonItem>
  );
};
