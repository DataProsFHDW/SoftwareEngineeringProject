import { EmailAuthProvider } from '@firebase/auth';
import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { auth } from '..';
import ExploreContainer from '../components/ExploreContainer';
import Menu from '../components/Menu';
import { ToDoComponent } from '../components/ToDoComponent';
import { TodoType } from '../models/TodoType';
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

        <br />
        <br />

        <ToDoComponent
          key={"ToDo-" + 1}
          todoTitle={"Hello Title"}
          todoType={TodoType.GROUP}
          todoDescription={"Hallo"}
          onTodoCardClick={""}
        />

        <IonButton expand='block' onClick={() => {
        }}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};
