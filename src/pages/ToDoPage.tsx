import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonReorder,
  IonReorderGroup,
  IonText,
  IonTitle,
  IonToolbar,
  ItemReorderEventDetail,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { stringify } from "querystring";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ToDoComponent } from "../components/ToDoComponent";
import { fetchTodoList } from "../dataStores/todo/FetchTodos";
import { postTodoList } from "../dataStores/todo/PostTodos";
import { useTodoDispatch, useTodoSelector } from "../dataStores/todo/TodoSlice";
import { Todo } from "../models/Todo";
import { TodoType } from "../models/TodoType";
import "./ToDoPage.css";

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
  //const [selectedToDo, setSelectedToDo] = useTodoSelector((state) => state.todoReducer.todoList)
  let toDoRender = todoReducer.todoList.map((todo, index) => {
    return (
      <ToDoComponent
        key={"ToDo-" + index}
        todoTitle={todo.todoTitle}
        todoType={todo.todoType}
        todoDescription={todo.todoDescription}
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
                // setTodoList([...todoList, "Test Todo" + todoList.length]);
                dispatch(
                  postTodoList({
                    todo: new Todo(
                      TodoType.SINGLE,
                      "Demo Add",
                      "Demo Description"
                    ),
                  })
                );
              }}
            >
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
          {/*<div className="popup-container">

          </div>
            */}
        </div>
      </IonContent>
    </IonPage>
  );
};
