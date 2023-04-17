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

/**
 * ToDoComponentProps is an interface that defines the props that can be passed to the ToDoComponent.
 */
interface ToDoComponentProps {
  onEditClick: any;
  onDeleteClick: any;
  onCheckboxClick: any
  todo: ITodo;
}
/**
 * ToDoComponent is a functional component that renders a single ToDo item with a checkbox, title, description, date, and buttons for editing and deleting the ToDo. It receives the following props:
 * @param {ITodo} todo - the ToDo item to be rendered.
 * @param {any} onEditClick - a callback function to be called when the edit button is clicked.
 * @param {any} onDeleteClick - a callback function to be called when the delete button is clicked.
 * @param {any} onCheckboxClick - a callback function to be called when the checkbox is clicked.
 * @returns {JSX.Element} - a JSX element representing the ToDo component.
*/
export const TodoComponent: React.FC<ToDoComponentProps> = ({
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
