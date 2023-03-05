import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import Menu from '../components/Menu';
import './Page.css';

export const LandingPage: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-text-center">Checkbox Landing Page</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <IonText>Welcome to project Checkbox.</IonText>

        <br/>
        <br/>

        <IonButton expand='block' onClick={() => {
            console.log("Test");
        }}>Test</IonButton>
      </IonContent>
    </IonPage>
  );
};
