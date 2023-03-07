import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonReorderGroup,
  IonTitle,
  IonToolbar,
  ItemReorderEventDetail,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect } from "react";
import { ToDoComponent } from "../components/ToDoComponent";
import { fetchTodoList } from "../dataStores/todo/FetchTodos";
import { postTodoList } from "../dataStores/todo/PostTodos";
import { useTodoDispatch, useTodoSelector } from "../dataStores/todo/TodoSlice";
import { Todo } from "../models/Todo";
import { TodoType } from "../models/TodoType";
import "./ToDoPage.css";
import React, { useState } from "react";

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
  const [selectedToDo, setSelectedToDo] = useState<Todo>();

  const handleToDoCardClick = (toDo: Todo) => {
    //setSelectedToDo(toDo);
    console.log(toDo);
    console.log("Hiho")
  };

  let toDoRender = todoReducer.todoList.map((todo, index) => {
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
            {/* The reorder gesture is disabled by default, enable it to drag and drop items */}
            <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
              {toDoRender}
            </IonReorderGroup>
          </IonList>
          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton
              onClick={() => {
                //setToDoList([...toDoList, "Test Todo" + toDoList.length]);

              }}
            >
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
          {selectedToDo && <div className="popup-container"></div>}
        </div>
      </IonContent>
    </IonPage>
  );
};
