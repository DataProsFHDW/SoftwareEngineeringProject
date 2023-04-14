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
import React, { useEffect, useState } from "react";
import { ITodoGroup } from "../models/ITodo";
import { TodoType } from "../models/TodoType";
import {
  getUsersFromFirestore,
  auth,
} from "../utils/firebase/Database-function";
import { User2 } from "../models/User";

/**
 * TodoEditModal Component to edit a Todo
 */
type Props = {
  todoItem: ITodoGroup;
  onDismiss: () => void;
};

/**
 * TodoEditModal Component to edit a Todo of the TodoList saved in storage
 * @param todoItem Todo to edit
 * @param onDismiss Callback function to dismiss the Modal
 * @returns React.FC
 */
export const TodoEditModal: React.FC<Props> = ({
  todoItem,
  onDismiss,
}: {
  todoItem: ITodoGroup;
  onDismiss: (data?: ITodoGroup | null | undefined, role?: string) => void;
}) => {
  const [todoTitle, setTodoTitle] = useState<number | string>(
    todoItem.todoTitle
  );
  const [todoDesc, setTodoDesc] = useState<string | number | null | undefined>(
    todoItem.todoDescription
  );
  const [todoType, setTodoType] = useState<TodoType>(todoItem.todoType);
  const [dueDate, setDueDate] = useState<string | string[] | null | undefined>(
    todoItem.todoDate ? todoItem.todoDate.toString() : null
  );
  const [listUser, setListUser] = useState<User2[]>([]);
  const [selectedUsers, setselectedUsers] = useState<string[]>(
    todoItem.users ?? []
  );

  useEffect(() => {

    async function getUsers() {
      var users = await getUsersFromFirestore();
      if (users != null) {
        users = users.filter((user) => user.id != auth.currentUser?.uid);
        setListUser(users);
      }
    }
    getUsers();
  }, []);

  useEffect(() => {
    // console.log("Reload?")
  }, [listUser]);

  function handleDateInputChange(changeEvent: any): void {
    if (!changeEvent.detail.value) {
      setDueDate(null);
    }
  }

  function exportTodoWrapper(): ITodoGroup {
    let titleReturn: string = todoTitle.toString();
    let datetimeReturn: Date | null = null;
    if (titleReturn === "" || titleReturn === null) {
      titleReturn = "Title";
    }
    if (dueDate) {
      datetimeReturn = new Date(dueDate?.toString()!);
      console.log("If is true: " + datetimeReturn);
    } else {
      datetimeReturn = null;
    }
    return {
      todoType: todoType ?? TodoType.SIMPLE,
      todoTitle: titleReturn,
      todoDescription: todoDesc?.toString() ?? "",
      id: todoItem.id,
      todoDate: datetimeReturn,
      users: [
        ...selectedUsers.filter((u) => u != auth.currentUser!.uid!),
        auth.currentUser?.uid!,
      ],
      isDeleted: false,
      isSynced: false,
      isOpen: true,
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
                console.log("Selected Users", selectedUsers);
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
              value={todoTitle}
              onIonChange={(e) => setTodoTitle(e.detail.value ?? "")}
            />
            <IonLabel position="stacked">Enter Todo Description</IonLabel>
            <IonInput
              type="text"
              placeholder="e.g. at the mall..."
              value={todoDesc}
              onIonChange={(e) => setTodoDesc(e.detail.value ?? "")}
            />
            <IonSelect
              placeholder="Select TodoType"
              interface="popover"
              value={todoType}
              onIonChange={(e) => setTodoType(e.detail.value)}
            >
              <IonSelectOption value={TodoType.SIMPLE}>Simple</IonSelectOption>
              <IonSelectOption value={TodoType.GROUP}>Group</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonInput
              id="datetimeValue"
              clearInput={true}
              value={
                dueDate
                  ? "Due on: " +
                  new Date(dueDate.toString()).toLocaleString("de-DE")
                  : null
              }
              onIonChange={(e) => handleDateInputChange(e)}
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
              multiple={true}
            >
              {listUser.map((user) => (
                <IonSelectOption key={"SelectOption" + user.id} value={user.id}>
                  {user.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
