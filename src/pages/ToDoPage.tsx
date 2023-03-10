import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
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
  IonRow,
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
import { TodoInterface } from "../models/TodoInterface";
import { Unsubscribe } from "firebase/auth";

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
  const [toDoList, setToDoList] = useState<Todo[]>([
    new Todo(TodoType.SINGLE, "ToDo Item 1", "Description of ToDo Item 1"),
    new Todo(TodoType.SINGLE, "ToDo Item 2", "Description of ToDo Item 2"),
    new Todo(TodoType.GROUP, "ToDo Item 3", "Description of ToDo Item 3"),
  ]);
  //Old Try manuelles PopUp: const [selectedToDo, setSelectedToDo] = useState<Todo | undefined>(undefined);
  //Zu Old Try TodoDetails: const [showModal, setShowModal] = useState(false);

  const handleToDoCardClick = () => {
    //setSelectedToDo(toDo);
    //console.log(selectedToDo);
    console.log("Heyho");
    setModalIsOpen(true);
  };

  function deleteTodo(index: number) {
    console.log("Delete pressed");
    const todoItemsClone = todoItems.slice(0, todoItems.length);

    todoItemsClone.splice(index, 1);
    updateTodoItems(todoItemsClone);
  }

  function submitTodo() {
    const listOfTodosClone = todoItems.slice(0, todoItems.length);
    const newTodoItem = new Todo(TodoType.SINGLE, newTodo!, "Platzhalter text");

    listOfTodosClone.push(newTodoItem);
    updateTodoItems(listOfTodosClone);
    updateNewTodo("");
    setModalIsOpen(false);
  }

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log("Dragged from index", event.detail.from, "to", event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }
  //Gehört noch zu Try von Docu mit dem Text aktualisieren, aber nutzbar
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTodo, updateNewTodo] = useState<string | undefined| null>(null);
  const [todoItems, updateTodoItems] = useState<Todo[]>([
    new Todo(TodoType.SINGLE, "ToDo Item 1 Hans", "Description of ToDo Item 1"),
    new Todo(TodoType.SINGLE, "ToDo Item 2", "Description of ToDo Item 2"),
    new Todo(TodoType.GROUP, "ToDo Item 3", "Description of ToDo Item 3"),
  ]);

  let toDoRender = todoItems.map((todo, index) => {
    return (
      <ToDoComponent
        key={"ToDo-" + index}
        todoTitle={todo.todoTitle}
        todoType={todo.todoType}
        todoDescription={todo.todoDescription}
        onTodoCardClick={() => handleToDoCardClick()}
        onDeleteClick={() => deleteTodo(index)}
      />
    );
  });

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
        {/**String Todo Placeholder for Testing */}
        <IonList>
          <IonListHeader>
            <IonHeader>ToDos</IonHeader>
          </IonListHeader>
          {/* The reorder gesture is disabled by default, enable it to drag and drop items */}
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            {toDoRender}
          </IonReorderGroup>
        </IonList>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton
            onClick={() => setModalIsOpen(true)}
          >
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>

        {/* OLD Try: mit ToDo Details:
          <IonModal isOpen={showModal}>
            <TodoDetails></TodoDetails>
            <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
          </IonModal>
        */}
        {/* Here is a hard coded version, of PopUp Feature => Unfähig Hooks und verschiedene Komponenten zu nutzen*/}
        <IonModal isOpen={modalIsOpen}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setModalIsOpen(false)}>
                  Cancel
                </IonButton>
              </IonButtons>
              <IonTitle>Welcome</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} color="primary" onClick={() => submitTodo()}>
                  Add Todo
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Enter Todo Title</IonLabel>
              {/** updateNewTodo(e.detail.value)*/}
              <IonInput type="text" placeholder="Your Todo" onIonChange={(e) =>  updateNewTodo(e.detail.value)} value={newTodo} />
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
