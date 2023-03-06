import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonReorder,
  IonItem,
} from "@ionic/react";
import { Todo } from "../models/Todo";
import { TodoInterface } from "../models/TodoInterface";
import { TodoType } from "../models/TodoType";
import "./ToDoComponent.css"


interface ToDoComponentProps extends TodoInterface{
  onTodoCardClick: any;
}


export const ToDoComponent: React.FC<ToDoComponentProps> = ({
  todoType,
  todoTitle,
  todoDescription,
  onTodoCardClick
}) => {
  return (
    <IonItem>
      <IonCard onClick={onTodoCardClick}>
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
