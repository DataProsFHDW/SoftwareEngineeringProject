import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonModal,
  IonPage,
  IonReorderGroup,
  IonText,
  IonTitle,
  IonToolbar,
  ItemReorderEventDetail,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect, useRef } from "react";
import { ToDoComponent } from "../components/ToDoComponent";
import { fetchTodoList } from "../dataStores/todo/FetchTodos";
import { postTodoList } from "../dataStores/todo/PostTodos";
import { useTodoDispatch, useTodoSelector } from "../dataStores/todo/TodoSlice";
import { Todo } from "../models/Todo";
import { TodoType } from "../models/TodoType";
import "./ToDoPage.css";
import React, { useState } from "react";
import TodoDetails from "../components/TodoDetails";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";

// Zu Erledigen: [] Ausgliederung Modal zu ToDo-Details (siehe Link Arbeitsrechner)

export const ToDoPage: React.FC = () => {
  const todoReducer = useTodoSelector((state) => state.todoReducer);
  var dispatch = useTodoDispatch();

  useEffect(() => {
    dispatch(
      fetchTodoList({
        accessToken: "demo",
        idToken: "for_you_to_see_<3",
      })
    );
  }, []); // [] => do on initial render of todoPageComponent

  /*const [todoList, setTodoList] = useState<string[]>([]);*/
  const [toDoList, setToDoList] = useState([
    new Todo(TodoType.SINGLE, "ToDo Item 1", "Description of ToDo Item 1"),
    new Todo(TodoType.SINGLE, "ToDo Item 2", "Description of ToDo Item 2"),
    new Todo(TodoType.GROUP, "ToDo Item 3", "Description of ToDo Item 3"),
  ]);
  //Old Try manuelles PopUp: const [selectedToDo, setSelectedToDo] = useState<Todo | undefined>(undefined);
  //Zu Old Try TodoDetails: const [showModal, setShowModal] = useState(false);

  const handleToDoCardClick = (toDo: Todo) => {
    //setSelectedToDo(toDo);
    console.log(toDo);
    console.log("Heyho");
    //setShowModal(true);
  };

  let toDoRender = toDoList.map((todo, index) => {
    return (
      <ToDoComponent
        key={"ToDo-" + index}
        todoTitle={todo.todoTitle}
        todoType={todo.todoType}
        todoDescription={todo.todoDescription}
        onTodoCardClick={() => handleToDoCardClick(todo)}
      />
    );
  });

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log("Dragged from index", event.detail.from, "to", event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }

  // Following lines are "Geklaut von Docu" => Hübschen
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    "This modal example uses triggers to automatically open a modal when the button is clicked."
  );

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-text-center">Your To Dos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <div className="content-container">
          <IonList>
            <IonListHeader>
              <IonHeader>ToDos</IonHeader>
            </IonListHeader>

            {/*Beginn Test Modal */}
            <IonButton id="open-modal" expand="block">
              Open
            </IonButton>
            <p>{message}</p>

            {/* End Test Modal */}
            {/* The reorder gesture is disabled by default, enable it to drag and drop items */}
            <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
              {toDoRender}
            </IonReorderGroup>
          </IonList>
          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton
              onClick={() => {
                setToDoList([
                  ...toDoList,
                  new Todo(
                    TodoType.SINGLE,
                    `ToDo Item ${toDoList.length + 1}`,
                    `Description of Todo Item ${toDoList.length + 1}`
                  ),
                ]);
              }}
            >
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
        </div>
        {/* OLD Try: mit ToDo Details:
          <IonModal isOpen={showModal}>
          <TodoDetails></TodoDetails>
          <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
        </IonModal>
        */}
        {/* Here is a hard coded version, of PopUp Feature => Unfähig Hooks und verschiedene Komponenten zu nutzen*/}
        <IonModal
          ref={modal}
          trigger="open-modal"
          onWillDismiss={(ev) => onWillDismiss(ev)}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>
                  Cancel
                </IonButton>
              </IonButtons>
              <IonTitle>Welcome</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Enter your name</IonLabel>
              <IonInput ref={input} type="text" placeholder="Your name" />
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
