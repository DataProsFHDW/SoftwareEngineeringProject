import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
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
          onTodoCardClick={() => console.log("Trololol")}
          onDeleteClick={() => console.log("Trololol")}
        />
      </IonContent>
    </IonPage>
  );
};
