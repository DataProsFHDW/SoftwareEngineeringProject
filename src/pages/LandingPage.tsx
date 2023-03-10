import { EmailAuthProvider } from '@firebase/auth';
import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { auth } from '..';
import ExploreContainer from '../components/ExploreContainer';
import Menu from '../components/Menu';
import { ToDoComponent } from '../components/ToDoComponent';
import { Todo } from '../models/Todo';
import { TodoType } from '../models/TodoType';
import useGlobalStorage from '../storage/StateManagement';
import { useTodoStorage } from '../storage/StateManagementWrapper';
import './Page.css';

export const LandingPage: React.FC = () => {
  const useStorage = useGlobalStorage();
  const [state, setState] = useStorage("todostorage");

  const todoStorage = useTodoStorage();

  useEffect(() => {
    console.log("State changed", state);
    console.log("Get Todo", todoStorage.getTodoList())
  }, [state]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <div className="Counter">
            <button type="button" onClick={() => {
              todoStorage.setTodoList([new Todo(TodoType.GROUP, "Hallo", "Hallo")]).then((todo) => {
                console.log("Set Todo", todo);
              });
            }}>
              +1 to global
            </button>
          </div>
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
      </IonContent>
    </IonPage>
  );
};
