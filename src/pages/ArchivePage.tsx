import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonMenuButton,
  IonPage,
  IonReorderGroup,
  IonTitle,
  IonToolbar,
  ItemReorderEventDetail,
  useIonModal,
  useIonViewDidEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { add, refreshOutline } from "ionicons/icons";
import { ToDoComponent } from "../components/ToDoComponent";
import "./ToDoPage.css";
import { ITodoGroup } from "../models/ITodo";
import { useTodoStorage } from "../storage/StateManagementWrapper";
import { TodoEditModal } from "../components/TodoEditModal";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { useEffect, useState } from "react";
import { TodoAddModal } from "../components/TodoAddModal";


/**
 * TodoPage Component to display the TodoList saved in storage that holds checked items
 * @returns React.FC
 */
export const ArchivePage: React.FC = () => {
  const todoStorage = useTodoStorage();

  const [selectedTodo, setSelectedTodo] = useState<ITodoGroup>();

  const [presentEdit, dismissEdit] = useIonModal(TodoEditModal, {
    todoItem: selectedTodo,
    onDismiss: (data: ITodoGroup, role: string) => dismissEdit(data, role),
  });

  const [presentAdd, dismissAdd] = useIonModal(TodoAddModal, {
    onDismiss: (data: ITodoGroup, role: string) => dismissAdd(data, role),
  });

  useIonViewDidEnter(() => {
    todoStorage.refreshTodos();
  });

  useIonViewWillLeave(()=> {
    todoStorage.refreshTodos();
  })
/*
  useEffect(() => {
    todoStorage.refreshTodos();
  }, []); // [] => do on initial render of todoPageComponent

  useEffect(() => {
    // console.log("TodoList Changed", todoStorage.getTodoList())
  }, [todoStorage.storage]);
*/
  /*const [todoList, setTodoList] = useState<string[]>([]);*/
  useEffect(() => {
    console.log("Effect on current LineItem" + JSON.stringify(selectedTodo));
    if (!!selectedTodo) {
      todoStorage.updateTodo(selectedTodo);
    }
  }, [selectedTodo]);

  const handleEditClick = (todo: ITodoGroup) => {
    setSelectedTodo(todo);
    presentEdit({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          console.log("Confirmed Input: " + JSON.stringify(ev.detail.data));
          setSelectedTodo(ev.detail.data as ITodoGroup);
          console.log(selectedTodo);
        }
      },
    });
  };

  const handleAddClick = () => {
    presentAdd({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "add") {
          todoStorage.addTodo(ev.detail.data);
        }
      },
    });
  };

  function handleCheckboxClick(todo: ITodoGroup) {
    console.log("Checkbox Clicked")
    todoStorage.updateTodo({
      todoType: todo.todoType,
      todoTitle: todo.todoTitle,
      todoDescription: todo.todoDescription,
      id: todo.id,
      isOpen: !todo.isOpen,
    } as ITodoGroup)
  }

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
    if (!todo.isOpen) {
      return (
        <ToDoComponent
          key={"Todo-" + index}
          todo={todo}
          onEditClick={() => handleEditClick(todo)}
          onDeleteClick={() => deleteTodo(index)}
          onCheckboxClick={() => handleCheckboxClick(todo)}
        />
      );
    }
  }).filter(Boolean);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-text-center">Your Archived To Dos</IonTitle>
          <IonButton
            onClick={() => {
              todoStorage.refreshTodos();
            }}
          >
            Refresh
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <IonList>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            {toDoRender}
          </IonReorderGroup>
        </IonList>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={() => handleAddClick()}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonFabButton
            onClick={() => {
              todoStorage.refreshTodos();
            }}
          >
            <IonIcon icon={refreshOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};
