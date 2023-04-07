import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonPopover,
} from "@ionic/react";
import { useRef, useState } from "react";
import { ITodo } from "../models/ITodo";
import { TodoType } from "../models/TodoType";
import { uuidv4 } from "@firebase/util";

type Props = {
  onDismiss: () => void;
};

export const TodoAddModal: React.FC<Props> = ({
  onDismiss,
}: {
  onDismiss: (data?: ITodo | null | undefined, role?: string) => void;
}) => {
  const [dueDate, setDueDate] = useState<string| string[] | null | undefined>("")
  const inputTitleRef = useRef<HTMLIonInputElement>(null);
  const inputDescRef = useRef<HTMLIonInputElement>(null);
  const selectTypeRef = useRef<HTMLIonSelectElement>(null);
  const datetime = useRef<HTMLIonInputElement| null>(null);

  function exportTodoWrapper(): ITodo {
    // No empty String as Title
    if (
      inputTitleRef.current?.value === "" ||
      inputTitleRef.current?.value === null
    ) {
      inputTitleRef.current.value = "Title";
    }
    console.log(dueDate);
    return {
      todoType: selectTypeRef.current?.value ?? TodoType.SIMPLE,
      todoTitle: inputTitleRef.current?.value?.toString()!,
      todoDescription: inputDescRef.current?.value?.toString() ?? "",
      id: uuidv4(),
      todoDate: new Date()
    };
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => onDismiss(null, "cancel")}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Welcome</IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong={true}
              color="primary"
              onClick={() => onDismiss(exportTodoWrapper(), "add")}
            >
              Add Todo
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Enter Todo Title</IonLabel>
          {/** updateNewTodo(e.detail.value)*/}
          <IonInput
            type="text"
            placeholder="e.g. Shopping"
            required={true}
            ref={inputTitleRef}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Enter Todo Description</IonLabel>
          {/** updateNewTodo(e.detail.value)*/}
          <IonInput
            type="text"
            placeholder="e.g. at the mall..."
            ref={inputDescRef}
          />
        </IonItem>
        <IonItem>
          <IonSelect
            placeholder="Select TodoType"
            interface="popover"
            ref={selectTypeRef}
          >
            <IonSelectOption value={TodoType.SIMPLE}>Simple</IonSelectOption>
            <IonSelectOption value={TodoType.GROUP}>Group</IonSelectOption>
          </IonSelect>
        </IonItem>
          
        <IonItem>
          <IonInput ref={datetime} id="datetimeValue" value={dueDate?.toString()}></IonInput>
          <IonPopover trigger="datetimeValue">
          <IonDatetime id="datetime" locale="de-DE" multiple={false} onIonChange={(e) => setDueDate(e.detail.value) }>
            <span slot="title">Due date for your Todo</span>
          </IonDatetime>
          </IonPopover>
        </IonItem>
         
         {/**
        <IonItem>
          <IonLabel>Start Time</IonLabel>
          <IonItem slot="end" id="datetimeValue">{datetime.current?.value}</IonItem>
          <IonPopover trigger="datetimeValue">
            <IonDatetime
              id="datetime"
              presentation="date-time"
              value="1994-12-15T13:47:20.789"
              ref={datetime}
            ></IonDatetime>
          </IonPopover>
        </IonItem>
        */}
        <IonItem>{inputTitleRef.current?.value?.toString()}</IonItem>
      </IonContent>
    </IonPage>
  );
};
