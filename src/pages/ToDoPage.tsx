import {
  IonButton,
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
  useIonModal,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { ToDoComponent } from "../components/ToDoComponent";
import "./ToDoPage.css";
import { ITodo, ITodoGroup } from "../models/ITodo";
import { useTodoStorage } from "../storage/StateManagementWrapper";
import { TodoEditModal } from "../components/TodoEditModal";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { useEffect, useState } from "react";
import { TodoAddModal } from "../components/TodoAddModal";
// Zu Erledigen: [] Ausgliederung Modal zu ToDo-Details (siehe Link Arbeitsrechner)

export const ToDoPage: React.FC = () => {
  const todoStorage = useTodoStorage();

  const [selectedTodo, setSelectedTodo] = useState<ITodoGroup>()

  const [presentEdit, dismissEdit] = useIonModal(TodoEditModal, {
    todoItem: selectedTodo,
    onDismiss: (data: ITodoGroup, role: string) => dismissEdit(data, role),
  });

  const [presentAdd, dismissAdd] = useIonModal(TodoAddModal, {
    onDismiss: (data: ITodoGroup, role: string) => dismissAdd(data, role),
  });

  useEffect(() => {
    todoStorage.refreshTodos();
  }, []); // [] => do on initial render of todoPageComponent

  useEffect(() => {
    // console.log("TodoList Changed", todoStorage.getTodoList())
  }, [todoStorage.storage]); // [] => do on initial render of todoPageComponent

  /*const [todoList, setTodoList] = useState<string[]>([]);*/
  useEffect(() => {
    console.log("Effect on current LineItem" + JSON.stringify(selectedTodo));
    if (!!selectedTodo) {
      todoStorage.updateTodo(selectedTodo)
    }
  }, [selectedTodo])

  const handleEditClick = (todo: ITodoGroup) => {
    setSelectedTodo(todo)
    presentEdit({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          console.log("Confirmed Input: " + JSON.stringify(ev.detail.data));
          setSelectedTodo(ev.detail.data as ITodoGroup)
          console.log(selectedTodo);
        }
      },
    });
  };

  const handleAddClick = () => {
    presentAdd({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "add") {
          todoStorage.addTodo(ev.detail.data)
        }
      },
    });
  };

  function deleteTodo(index: number) {
    console.log("Delete pressed");
    let todo = todoStorage.getTodoList()[index];
    todoStorage.removeTodo(todo);
  }

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    console.log("Dragged from index", event.detail.from, "to", event.detail.to);
    event.detail.complete();
  }

  let toDoRender = todoStorage.getTodoList().map((todo, index) => {
    return (
      <ToDoComponent
        key={"ToDo-" + index}
        todo={todo}
        onEditClick={() => handleEditClick(todo)}
        onDeleteClick={() => deleteTodo(index)}
        onCheckboxClick={() => console.log("Checkbox Clicked")}
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
          <IonButton onClick={() => {
            todoStorage.refreshTodos();
          }}>Refresh</IonButton>
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
          <IonFabButton onClick={() => handleAddClick()}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};
