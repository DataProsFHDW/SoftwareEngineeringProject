import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonInput,
  IonPage,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonList,
  IonModal,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { ITodoGroup } from "../models/ITodo";
import { TodoType } from "../models/TodoType";
import { getUsersFromFirestore, auth } from "../utils/firebase/Database-function";
import { User2 } from "../models/User";
import { id } from "date-fns/locale";

type Props = {
  todoItem: ITodoGroup;
  onDismiss: () => void;
};

export const TodoEditModal: React.FC<Props> = ({
  todoItem,
  onDismiss,
}: {
  todoItem: ITodoGroup;
  onDismiss: (data?: ITodoGroup | null | undefined, role?: string) => void;
}) => {
  const [dueDate, setDueDate] = useState<string | string[] | null | undefined>(
    todoItem.todoDate ? todoItem.todoDate.toString() : null
  );

  const inputTitleRef = useRef<HTMLIonInputElement>(null);
  const inputDescRef = useRef<HTMLIonInputElement>(null);
  const selectTypeRef = useRef<HTMLIonSelectElement>(null);
  const datetime = useRef<HTMLIonInputElement | null>(null);
  let datetimeReturn: Date | null | undefined = null;

  useEffect(() => {
    console.log("Effect on current due date" + JSON.stringify(dueDate));
    if (dueDate) {
      datetimeReturn = new Date(dueDate?.toString()!);
      console.log("If is true: " + datetimeReturn);
    } else {
      datetimeReturn = null;
    }
  }, [dueDate]);

  const [listUser, setListUser] = useState<User2[]>([]);
  const [selectedUsers, setselectedUsers] = useState<string[]>([]);

  useEffect(() => {
    setDueDate(todoItem.todoDate?.toString() ?? null);
    datetimeReturn = new Date(dueDate?.toString()!);
    setselectedUsers(todoItem.users ?? []);

    async function getUsers() {
      var users = await getUsersFromFirestore();
      if (users != null) {
        users = users.filter((user) => user.id != auth.currentUser?.uid);
        setListUser(users);
      }
    //  console.log("Fetched users", users)
    }
    getUsers();
  }, []);

  useEffect(() => {
    // console.log("Reload?")
  }, [listUser])


  function handleInputChange(changeEvent: any): void {
    if (!changeEvent.detail.value) {
      setDueDate(null);
    }
  }

  function exportTodoWrapper(): ITodoGroup {
    if (
      inputTitleRef.current?.value === "" ||
      inputTitleRef.current?.value === null
    ) {
      inputTitleRef.current.value = "Title";
    } 
    return {
      todoType: selectTypeRef.current?.value,
      todoTitle: inputTitleRef.current?.value ?? "Title",
      todoDescription: inputDescRef.current?.value?.toString() ?? "",
      id: todoItem.id,
      todoDate: datetimeReturn,
      users: [...selectedUsers.filter((u) => u != auth.currentUser!.uid!), auth.currentUser?.uid!],
      isDeleted: false,
      isSynced: false,
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
              onClick={() => {
                onDismiss(exportTodoWrapper(), "confirm");
                console.log("Selected Users", selectedUsers)
              }}
            >
              Submit
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Enter Todo Title</IonLabel>
            <IonInput
              type="text"
              placeholder="e.g. Shopping"
              value={todoItem.todoTitle}
              ref={inputTitleRef}
            />
            <IonLabel position="stacked">Enter Todo Description</IonLabel>
            <IonInput
              type="text"
              placeholder="e.g. at the mall..."
              value={todoItem.todoDescription}
              ref={inputDescRef}
            />
            <IonSelect
              placeholder="Select TodoType"
              interface="popover"
              ref={selectTypeRef}
              value={todoItem.todoType}
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
                  ? "Due on: " +
                  new Date(dueDate.toString()).toLocaleString("de-DE")
                  : null
              }
              onIonChange={(e) => handleInputChange(e)}
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
                firstDayOfWeek={1}
                size={"cover"}
              >
                <span slot="title">Select Due date for your Todo</span>
              </IonDatetime>
            </IonModal>
          </IonItem>
          <IonItem>
            <IonSelect
              aria-label="Collaborators"
              placeholder="Select people to collaborate with"
              aria-labelledby="select-label"
              interface="popover"
              onIonChange={(e) => setselectedUsers(e.detail.value)}
              value={selectedUsers}
              multiple={true}>
              {
                listUser.map((user) =>
                (
                  <IonSelectOption 
                  key={"SelectOption"+user.id}
                  value={user.id} 
                  
                  >
                    {user.name}
                  </IonSelectOption>)
                )
              }
            </IonSelect>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
