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
import { TodoType } from "../models/TodoType";

/*
interface ToDoComponentProps {
  id: string;
  title: string;
  type: TodoType
  description: ToDoDescr
}
*/

export const ToDoComponent: React.FC<Todo> = ({todoType, todoTitle, todoDescription }) => {
  return (
    <IonItem>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{todoTitle}</IonCardTitle>
          <IonCardSubtitle>{todoType.toString()}</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          {todoDescription}
        </IonCardContent>
      </IonCard>
      <IonReorder slot="end"></IonReorder>
    </IonItem>
  );
};
