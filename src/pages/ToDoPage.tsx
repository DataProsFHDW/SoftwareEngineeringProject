import {
  IonButton,
  IonButtons,
  IonCol,
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
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  ItemReorderEventDetail,
  useIonModal,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { ToDoComponent } from "../components/ToDoComponent";
import { TodoType } from "../models/TodoType";
import "./ToDoPage.css";
import { ITodo } from "../models/ITodo";
import { useTodoStorage } from "../storage/StateManagementWrapper";
import { TodoEditModal } from "../components/TodoEditModal";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { uuidv4 } from "@firebase/util";
import { useEffect, useRef, useState } from "react";
// Zu Erledigen: [] Ausgliederung Modal zu ToDo-Details (siehe Link Arbeitsrechner)

export const ToDoPage: React.FC = () => {
  const todoStorage = useTodoStorage();
 
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


  const [selectedTodo, setSelectedTodo] = useState<ITodo>()

  const [present, dismiss] = useIonModal(TodoEditModal, {
    todoItem: selectedTodo,
    onDismiss:  (data: ITodo, role: string) => dismiss(data, role),
  });

  
  useEffect(() => {
    console.log("TodoList Changed", todoStorage.getTodoList())
  }, [todoStorage]); // [] => do on initial render of todoPageComponent

  /*const [todoList, setTodoList] = useState<string[]>([]);*/
  useEffect(() => {
    console.log("Effect on current LineItem" +JSON.stringify(selectedTodo));
    if (!!selectedTodo) {
      todoStorage.updateTodo(selectedTodo) 
    }
    }, [selectedTodo])
  

  const handleEditClick = (todo: ITodo) => {
    setSelectedTodo(todo);
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          //setMessage(ev.detail.data??"Empty Title");
          console.log("Confirmed Input: " + JSON.stringify(ev.detail.data));
          setSelectedTodo(ev.detail.data as ITodo)
          console.log(selectedTodo);
        }
      },
    });
  };

  function deleteTodo(index: number) {
    console.log("Delete pressed");
    let todo = todoStorage.getTodoList()[index];
    todoStorage.removeTodo(todo);
  }

  function submitTodo() {
    todoStorage.addTodo(
      {
        id: uuidv4(),
        todoType: newTodoType ?? TodoType.SIMPLE,
        todoTitle: newTodoTitle ?? "Title",
        todoDescription: newTodoDesc ?? ""
      }
    )
    updateNewTodoTitle(null);
    updateNewTodoType(null);
    updateNewTodoDesc(null)
    setModalIsOpen(false);
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
                <IonSelectOption value={TodoType.SIMPLE}>
                  Simple
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
