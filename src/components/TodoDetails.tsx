import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons } from "@ionic/react";
import React from "react";

//const Menu: React.FC = () => {
const TodoDetails: React.FC = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>To Do Details</IonTitle>
          <IonButtons slot="start">
                <IonButton onClick={() => console.log("Cancel Click!")}>Cancel</IonButton>
              </IonButtons>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => console.log("Confirm Click!") /*() => confirm(*/}>
                  Confirm
                </IonButton>
              </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>This is the modal content.</p>
      </IonContent>
    </>
  );
};
export default TodoDetails;
