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
} from "@ionic/react";
import { useRef } from "react";
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
  const inputTitleRef = useRef<HTMLIonInputElement>(null);
  const inputDescRef = useRef<HTMLIonInputElement>(null);
  const selectTypeRef = useRef<HTMLIonSelectElement>(null);

  function exportTodoWrapper(): ITodo {
    // No empty String as Title
    if (
      inputTitleRef.current?.value === "" ||
      inputTitleRef.current?.value === null
    ) {
      inputTitleRef.current.value = "Title";
    }
    return {
      todoType: selectTypeRef.current?.value ?? TodoType.SIMPLE,
      todoTitle: inputTitleRef.current?.value?.toString() ?? "Title",
      todoDescription: inputDescRef.current?.value?.toString() ?? "",
      id: uuidv4(),
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
        </IonItem>
      </IonContent>
    </IonPage>
  );
};
