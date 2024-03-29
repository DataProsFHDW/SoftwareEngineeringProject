import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { createUserWithEmailAndPassword, EmailAuthProvider, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, PhoneAuthProvider, signInWithEmailAndPassword, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import * as firebaseui from 'firebaseui'
import React, { useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../utils/firebase/Database-function";

/**
 * LoginPage Component to login with Google or E-Mail
 * @returns React.FC
 */
export const LoginPage = () => {
  const [isEmailHidden, setEmailHidden] = useState(true)

  var history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={async () => {
          try {
            const res = await signInWithPopup(auth, new GoogleAuthProvider());
          } catch (err) {
            console.error(err);
          }
        }}>Google Login</IonButton>
        <IonButton expand="block" onClick={async () => {
          setEmailHidden(false);
          var ui = new firebaseui.auth.AuthUI(auth);
          ui.start('#firebaseui-auth-mail', {
            signInSuccessUrl: 'localhost:3000/',
            signInFlow: 'popup',
            signInOptions: [
              EmailAuthProvider.PROVIDER_ID,
            ], // Terms of service url/callback.
            tosUrl: '<your-tos-url>',
            // Privacy policy url/callback. 
            privacyPolicyUrl: function () {
              window.location.assign('<your-privacy-policy-url>');
            }
          });
        }}>E-Mail Login</IonButton>
        <br />
        <br />
        <IonCard hidden={isEmailHidden}>
          <IonCardContent>
            <div id="firebaseui-auth-mail"></div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>);
}
