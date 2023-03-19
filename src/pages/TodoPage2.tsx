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
  

  const sourceData = [
    { name: "Tristan", age: 22 },
    { name: "Tim", age: 24 },
  ];

  export interface TItem {
    name: string,
    age:  number| string| null| undefined;
  }

  export const TodoPage2: React.FC = () => {
    const [currentLineItem, setCurrentLineItem] = useState<TItem>();
  // Geklaut von Doku: https://ionicframework.com/docs/api/modal
  // https://forum.ionicframework.com/t/useionmodal-how-to-pass-the-data-to-the-modal/223044

  const [message, setMessage] = useState(
    "This modal example uses the modalController to present and dismiss modals."
  );

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          setMessage(ev.detail.data ?? "Empty Title");
        }
      },
    });
  }

  // Ende Klau
  function handleDismiss(data: TItem, role: string) {
    dismiss(data, role);
  }
  /*
    const [present, dismiss] = useIonModal(ModalExample, {
      initialData: message,
      onDismiss: (data: string, role: string) => handleDismiss(data, role)
      //onDismiss: (data: string, role: string) => dismiss(data, role),
    });
    */

  const [present, dismiss] = useIonModal(LineItemModal, {
    lineItem: currentLineItem,
    onDismiss:  (data: TItem, role: string) => handleDismiss(data, role),
  });

  const onEdithandler = (item: TItem, index: number) => {
    setCurrentLineItem(item);
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          //setMessage(ev.detail.data??"Empty Title");
          console.log("Confirmed Input: " + JSON.stringify(ev.detail.data));
          setCurrentLineItem(ev.detail.data as TItem)
          console.log(currentLineItem);
        }
      },
    });
  };

useEffect(() => {
  console.log("Effect" +JSON.stringify(currentLineItem));

  }, [currentLineItem])


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Test useModal Hook</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonButton expand="block" onClick={() => openModal()}>
          Open
        </IonButton>
        <p>{message}</p>
        {sourceData.map((item, index) => (
          <IonRow key={item.name}>
            <IonCol>name: {item.name}</IonCol>
            <IonCol>Description: {item.age}</IonCol>
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
    lineItem: TItem;
    onDismiss: () => void;
  };
 export const LineItemModal: React.FC<Props> = ({
    lineItem,
    onDismiss,
  }: {
    lineItem: TItem;
    onDismiss: (data?: TItem | null | undefined, role?: string) => void;
  }) => {
    const inputRef = useRef<HTMLIonInputElement>(null);
    function exportItemWrapper(): TItem {
      return {name: lineItem.name, age: inputRef.current?.value}
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
              onClick={() => onDismiss(exportItemWrapper(), "confirm")}
            >
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonContent className="ion-padding">
          <IonInput ref={inputRef} value={lineItem?.age}></IonInput>
          <IonButton onClick={() => onDismiss()}>close</IonButton>
        </IonContent>
      </IonPage>
    );
  };
  