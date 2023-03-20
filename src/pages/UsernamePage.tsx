import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import { auth, firestore } from '..';
import FirestoreCollections from '../models/FirestoreCollections';
import FirestoreCollectionFields from '../models/FirestoreCollectionFields';
import './Page.css';
import { useHistory } from 'react-router';

export async function fetchUsername(): Promise<string | null | undefined> {
    const refDocUser = doc(firestore, FirestoreCollections.USERS, auth.currentUser?.uid!);
    var docUser = await getDoc(refDocUser);
    if (!docUser.exists() || docUser.data()!.username == null) {
         console.log("Username Not set")
    }
    return docUser.data()!.username;
}

export const UsernamePage: React.FC = () => {
    const [usernameInput, setUsernameInput] = useState<string | null | undefined>("second")
    const [present] = useIonToast();

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

                    const refDocUser = doc(firestore, FirestoreCollections.USERS, auth.currentUser?.uid!);
                    var username = FirestoreCollectionFields.USERNAME;
                    await setDoc(refDocUser,
                        { username: usernameInput }
                    ).then(() => {
                        present({
                            message: 'Username saved successfully',
                            duration: 1500,
                            position: "bottom"
                        });
                        history.goBack();

                    }).catch((error) => {
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
