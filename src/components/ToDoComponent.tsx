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
  return (
    <IonItem>
      <IonCard >
        <div className="card-content">
          <IonCardHeader>
            <IonCardTitle>{todo.todoTitle}</IonCardTitle>
            <IonCardSubtitle>{todo.todoType?.toString()}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            {todo.todoDate?todo.todoDate.toString(): "nothing here"}
 
          </IonCardContent>
        </div>
        <IonButton fill="clear" onClick={onDeleteClick}>Delete</IonButton>
        <IonButton fill="clear" onClick={onEditClick}>Edit</IonButton>
        <IonButton fill="clear" onClick={() => console.log(todo.todoDate)}>Value Check</IonButton>
      </IonCard>
      <IonReorder slot="end"></IonReorder>
    </IonItem>
  );
};
