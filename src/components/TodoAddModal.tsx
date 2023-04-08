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
  IonList,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { ITodo } from "../models/ITodo";
import { TodoType } from "../models/TodoType";
import { uuidv4 } from "@firebase/util";
import { format, parseISO } from "date-fns";
import styled from "styled-components";
/*
const IonModalBox = styled(IonModal)`
  --height: "45%";
  &::part(content) {
    position: absolute;
    bottom: 0;
  }
`;
*/
type Props = {
  onDismiss: () => void;
};

export const TodoAddModal: React.FC<Props> = ({
  onDismiss,
}: {
  onDismiss: (data?: ITodo | null | undefined, role?: string) => void;
}) => {
  const [dueDate, setDueDate] = useState<
    string | string[] | null | undefined
  >();
  const inputTitleRef = useRef<HTMLIonInputElement>(null);
  const inputDescRef = useRef<HTMLIonInputElement>(null);
  const selectTypeRef = useRef<HTMLIonSelectElement>(null);
  const datetime = useRef<HTMLIonInputElement | null>(null);
  const datetimeCal = useRef<HTMLIonDatetimeElement>(null);
  let datetimeReturn: Date| null| undefined = null;

  useEffect(() => {
    console.log("Effect on current due date" + JSON.stringify(dueDate));
    if (!!dueDate) {
      datetimeReturn = new Date(dueDate.toString());
      console.log("If is true: " + datetimeReturn);
    }
  }, [dueDate]);

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
      todoTitle: inputTitleRef.current?.value?.toString()!,
      todoDescription: inputDescRef.current?.value?.toString() ?? "",
      id: uuidv4(),
      todoDate: datetimeReturn,
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
        <IonList>
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
            <IonInput
              ref={datetime}
              id="datetimeValue"
              clearInput={true} 
              value={
                dueDate
                  ? "Due on: " + (new Date(dueDate.toString())).toLocaleString("de-DE")
                  : null
              }
              placeholder="Choose Due Date"
              type="text"
            ></IonInput>
            <IonModal trigger="datetimeValue">
              <IonDatetime
                id="datetime"
                locale="de-DE"
                multiple={false}
                onIonChange={(e) => setDueDate(e.detail.value)}
                showDefaultButtons={true}
                size={"cover"}
              >
                <span slot="title">Select Due date for your Todo</span>
              </IonDatetime>
            </IonModal>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
