import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption } from "@ionic/react";
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
      return {
        todoType: selectTypeRef.current?.value ?? TodoType.SIMPLE,
        todoTitle: inputTitleRef.current?.value ?? "Title",
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
            <IonLabel position="stacked">Enter Todo Title</IonLabel>
            {/** updateNewTodo(e.detail.value)*/}
            <IonInput
              type="text"
              placeholder="e.g. Shopping"
              ref={inputTitleRef}
            />
            <IonLabel position="stacked">Enter Todo Description</IonLabel>
            {/** updateNewTodo(e.detail.value)*/}
            <IonInput
              type="text"
              placeholder="e.g. at the mall..."
              ref={inputDescRef}
            />
            <IonSelect
              placeholder="Select TodoType"
              interface="popover"
              ref={selectTypeRef}
            >
              <IonSelectOption value={TodoType.SIMPLE}>Simple</IonSelectOption>
              <IonSelectOption value={TodoType.GROUP}>Group</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonContent>
      </IonPage>
    );
  };