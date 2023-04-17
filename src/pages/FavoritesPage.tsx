import {
    IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonMenuButton,
  IonPage,
  IonReorder,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { heartOutline } from "ionicons/icons";
import { useState } from "react";

export const FavoritesPage: React.FC = () => {

    const [favState, setFavState] = useState<Boolean>(false)

function handleFavClick() {
    console.log("Fav Click")
    setFavState(!favState)
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-text-center">Your Favorites</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonItem>
      <IonCheckbox slot="start" checked={false}></IonCheckbox>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{"Dein Favoriten Todo"}</IonCardTitle>
          <IonCardSubtitle>{"Die Beschreibung"}</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          {"17.04.2023 | 12:00:00"}

        </IonCardContent>
        <IonButton fill="clear">Delete</IonButton>
        <IonButton fill="clear">Edit</IonButton>
        <IonButton fill={favState ? "solid" : "clear"} onClick={() => handleFavClick()}><IonIcon ios={heartOutline} md={heartOutline}/></IonButton>
      </IonCard>
      <IonReorder slot="end"></IonReorder>
    </IonItem>
    <IonImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Under_construction_icon-yellow.svg/2484px-Under_construction_icon-yellow.svg.png"></IonImg>
      </IonContent>
    </IonPage>
  );
};
