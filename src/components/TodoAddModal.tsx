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
import { ITodo, ITodoGroup } from "../models/ITodo";
import { TodoType } from "../models/TodoType";
import { uuidv4 } from "@firebase/util";
import { User2 } from "../models/User";
import {
  getUsersFromFirestore,
  auth,
} from "../utils/firebase/Database-function";
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
  onDismiss: (data?: ITodoGroup | null | undefined, role?: string) => void;
}) => {
  const [todoTitle, setTodoTitle] = useState<number | string>();
  const [todoDesc, setTodoDesc] = useState<
    string | number | null | undefined
  >();
  const [todoType, setTodoType] = useState<TodoType>();
  const [dueDate, setDueDate] = useState<
    string | string[] | null | undefined
  >();
  const [listUser, setListUser] = useState<User2[]>([]);
  const [selectedUsers, setselectedUsers] = useState<string[]>([]);

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
    // No empty String as Title
    let titleReturn = todoTitle?.toString();
    let datetimeReturn: Date | null = null;

    if (
      titleReturn === "" ||
      titleReturn === null ||
      titleReturn === undefined
    ) {
      titleReturn = "Title";
    }
    if (dueDate) {
      datetimeReturn = new Date(dueDate?.toString()!);
      console.log("DueDate is true: " + datetimeReturn);
    }
    // Format
    return {
      id: uuidv4(),
      todoTitle: titleReturn,
      todoDescription: todoDesc?.toString() ?? "",
      todoType: todoType ?? TodoType.SIMPLE,
      todoDate: datetimeReturn,
      users: [
        ...selectedUsers.filter((u) => u != auth.currentUser!.uid!),
        auth.currentUser?.uid!,
      ],
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
              onIonChange={(e) => setTodoTitle(e.detail.value?.toString())}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Enter Todo Description</IonLabel>
            {/** updateNewTodo(e.detail.value)*/}
            <IonInput
              type="text"
              placeholder="e.g. at the mall..."
              onIonChange={(e) => setTodoDesc(e.detail.value?.toString())}
            />
          </IonItem>
          <IonItem>
            <IonSelect
              placeholder="Select TodoType"
              interface="popover"
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
