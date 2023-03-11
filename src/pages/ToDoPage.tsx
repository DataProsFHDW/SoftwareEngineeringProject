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
  IonSelect,
  IonSelectOption,
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTodoTitle, updateNewTodoTitle] = useState<
    string | undefined | null
  >(null);
  const [newTodoDesc, updateNewTodoDesc] = useState<string | undefined | null>(
    null
  );
  const [newTodoType, updateNewTodoType] = useState<
    TodoType | undefined | null
  >(null);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)

  const [todoItems, updateTodoItems] = useState<Todo[]>([
    new Todo(TodoType.SINGLE, "ToDo Item 1 Hans", "Description of ToDo Item 1"),
    new Todo(TodoType.SINGLE, "ToDo Item 2", "Description of ToDo Item 2"),
    new Todo(TodoType.GROUP, "ToDo Item 3", "Description of ToDo Item 3"),
  ]);
  //Old Try manuelles PopUp: const [selectedToDo, setSelectedToDo] = useState<Todo | undefined>(undefined);
  //Zu Old Try TodoDetails: const [showModal, setShowModal] = useState(false);

  const handleEditClick = (index: number) => {
    const todoItemClone = todoItems[index];
    setSelectedTodo(todoItemClone)
    updateNewTodoType(selectedTodo?.todoType)
    updateNewTodoTitle(selectedTodo?.todoTitle)
    updateNewTodoDesc(selectedTodo?.todoDescription);
    setModalIsOpen(true)
  };

  function deleteTodo(index: number) {
    console.log("Delete pressed");
    const todoItemsClone = todoItems.slice(0, todoItems.length);

    todoItemsClone.splice(index, 1);
    updateTodoItems(todoItemsClone);
  }

  function submitTodo() {
    const listOfTodosClone = todoItems.slice(0, todoItems.length);
    const newTodoItem = new Todo(newTodoType!, newTodoTitle!, newTodoDesc!);

    listOfTodosClone.push(newTodoItem);
    updateTodoItems(listOfTodosClone);
    updateNewTodoTitle(null);
    updateNewTodoType(null);
    updateNewTodoDesc(null)
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

  let toDoRender = todoItems.map((todo, index) => {
    return (
      <ToDoComponent
        /*key={"ToDo-" + index}*/
        todo={todo}
        onEditClick={() => handleEditClick(index)}
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
          <IonFabButton onClick={() => setModalIsOpen(true)}>
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
                <IonButton
                  strong={true}
                  color="primary"
                  onClick={() => submitTodo()}
                >
                  Add Todo
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Enter Todo Title</IonLabel>
              {/** updateNewTodo(e.detail.value)*/}
              <IonInput
                type="text"
                placeholder="e.g. Shopping"
                onIonChange={(e) => updateNewTodoTitle(e.detail.value)}
                value={newTodoTitle}
              />
              <IonLabel position="stacked">Enter Todo Description</IonLabel>
              {/** updateNewTodo(e.detail.value)*/}
              <IonInput
                type="text"
                placeholder="e.g. at the mall..."
                onIonChange={(e) => updateNewTodoDesc(e.detail.value)}
                value={newTodoDesc}
              />
              <IonSelect placeholder="Select TodoType" interface="popover" onIonChange={(e) => updateNewTodoType(e.detail.value)}>
                <IonSelectOption value={TodoType.SINGLE}>
                  Simple
                </IonSelectOption>
                <IonSelectOption value={TodoType.TIMEBOUND}>
                  Timebound
                </IonSelectOption>
                <IonSelectOption value={TodoType.GROUP}>Group</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
