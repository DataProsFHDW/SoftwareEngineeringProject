import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonHeader,
    IonInput,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    useIonModal,
  } from "@ionic/react";
  import "./ToDoPage.css";
  import { useTodoStorage } from "../storage/StateManagementWrapper";
  import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
  import { useEffect, useRef, useState } from "react";
import { ITodo } from "../models/ITodo";
import { TodoEditModal } from "../components/TodoEditModal";
  // Zu Erledigen: [] Ausgliederung Modal zu ToDo-Details (siehe Link Arbeitsrechner)
  
/*
  const sourceData = [
    { name: "Tristan", age: 22 },
    { name: "Tim", age: 24 },
  ];
*/

/*
  export interface TItem {
    name: string,
    age:  number| string| null| undefined;
  }
*/
export const TodoPage2: React.FC = () => {
    const [currentLineItem, setCurrentLineItem] = useState<ITodo>();
    const sourceData = useTodoStorage();
  // Geklaut von Doku: https://ionicframework.com/docs/api/modal
  // https://forum.ionicframework.com/t/useionmodal-how-to-pass-the-data-to-the-modal/223044

  const [message, setMessage] = useState(
    "This modal example uses the modalController to present and dismiss modals."
  );

  // Ende Klau
  function handleDismiss(data: ITodo, role: string) {
    dismiss(data, role);
  }
  /*
    const [present, dismiss] = useIonModal(ModalExample, {
      initialData: message,
      onDismiss: (data: string, role: string) => handleDismiss(data, role)
      //onDismiss: (data: string, role: string) => dismiss(data, role),
    });
    */
/*
  const [present, dismiss] = useIonModal(LineItemModal, {
    lineItem: currentLineItem,
    onDismiss:  (data: ITodo, role: string) => handleDismiss(data, role),
  });
*/
const [present, dismiss] = useIonModal(TodoEditModal, {
    todoItem: currentLineItem,
    onDismiss:  (data: ITodo, role: string) => handleDismiss(data, role),
  });

  const onEdithandler = (item: ITodo, index: number) => {
    setCurrentLineItem(item)
    console.log("First log:" + currentLineItem)
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          //setMessage(ev.detail.data??"Empty Title");
          console.log("Confirmed Input: " + JSON.stringify(ev.detail.data));
          setCurrentLineItem(ev.detail.data as ITodo)
          console.log(currentLineItem);
        }
      },
    });
  };

useEffect(() => {
  console.log("Effect on current LineItem" +JSON.stringify(currentLineItem));
  if (!!currentLineItem) {
    sourceData.updateTodo(currentLineItem) 
  }
  }, [currentLineItem])


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Test useModal Hook</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {sourceData.getTodoList().map((item, index) => (
          <IonRow key={"Item-"+item.id}>
            <IonCol>Title: {item.todoTitle}</IonCol>
            <IonCol>Description: {item.todoDescription}</IonCol>
            <IonCol>
              <IonButton onClick={() => onEdithandler(item, index)}>
                Click Me
              </IonButton>
            </IonCol>
          </IonRow>
        ))}
      </IonContent>
    </IonPage>
  );
  }

  type Props = {
    lineItem: ITodo;
    onDismiss: () => void;
  };
 export const LineItemModal: React.FC<Props> = ({
    lineItem,
    onDismiss,
  }: {
    lineItem: ITodo;
    onDismiss: (data?: ITodo | null | undefined, role?: string) => void;
  }) => {
    const inputRef = useRef<HTMLIonInputElement>(null);
    function exportTodoWrapper(): ITodo {
      return {
        todoType: lineItem.todoType, 
        todoTitle: inputRef.current?.value ?? "Title",
        todoDescription: lineItem.todoDescription,
        id: lineItem.id
    }
    }
    return (
      <IonPage>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => onDismiss(null, "cancel")}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Welcome</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => onDismiss(exportTodoWrapper(), "confirm")}
            >
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonContent className="ion-padding">
          <IonInput ref={inputRef} value={lineItem?.todoTitle}></IonInput>
          <IonButton onClick={() => onDismiss()}>close</IonButton>
        </IonContent>
      </IonPage>
    );
  };
  