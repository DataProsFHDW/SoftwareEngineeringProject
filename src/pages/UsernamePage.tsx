import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useHistory } from 'react-router';
import FirestoreCollectionFields from '../models/FirestoreCollectionFields';
import FirestoreCollections from '../models/FirestoreCollections';
import { auth, firestore } from '../utils/firebase/Database-function';
import './Page.css';
import { useTodoStorage } from '../storage/StateManagementWrapper';

/**
 * UsernamePage Component to display the TodoList saved in storage that holds checked items
 * @returns React.FC
 * @param todoStorage any
 */
export async function fetchUsername(todoStorage: any): Promise<string | null | undefined> {
    const refDocUser = doc(firestore, FirestoreCollections.USERS, auth.currentUser?.uid!);
    var docUser = await getDoc(refDocUser);
    if (!docUser.exists() || docUser.data()!.username == null) {
        console.log("Username Not set")
    } else if (docUser.data()!.usernames) {
        todoStorage.setUsername(docUser.data()!.username);
    }
    return docUser.data()!.username;
}

export const UsernamePage: React.FC = () => {
    const [usernameInput, setUsernameInput] = useState<string | null | undefined>("second")
    const [present] = useIonToast();

    const todoStorage = useTodoStorage();

    const history = useHistory();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle className="ion-text-center">Registration Page</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding" fullscreen>
                <IonText>Welcome to project Checkbox.</IonText>

                <IonItem counter={true}>
                    <IonLabel>Username</IonLabel>
                    <IonInput placeholder="Enter your Username"
                        minlength={3}
                        min={3}
                        maxlength={20}
                        max={20}
                        onIonChange={(value) => setUsernameInput(value.detail.value)}>
                    </IonInput>
                </IonItem>

                <IonButton fill="solid" onClick={async () => {
                    console.log("Username", usernameInput);
                    if (usernameInput == null || usernameInput == undefined || usernameInput!.length < 3 || usernameInput!.length > 20) {
                        present({
                            message: 'Username must be between 3 and 20 characters long',
                            duration: 1500,
                            position: "bottom"
                        });
                        return;
                    }

                    const refDocUser = doc(firestore, FirestoreCollections.USERS, auth.currentUser?.uid! ?? "asdfasdfasdfasdfasdf");
                    await setDoc(refDocUser,
                        { username: usernameInput }
                    ).then(() => {
                        present({
                            message: 'Username saved successfully',
                            duration: 1500,
                            position: "bottom"
                        });
                        // history.goBack();
                        todoStorage.setUsername(usernameInput);
                        history.push("/todo"); 
                        window.location.reload();

                    }).catch((error) => {
                        console.log("error", error);
                        present({
                            message: 'Please try again soon',
                            color: "danger",
                            duration: 1500,
                            position: "bottom"
                        });
                    });
                }}>
                    Save Username
                </IonButton>
            </IonContent>
        </IonPage>
    );
};
