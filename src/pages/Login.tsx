import { EmailAuthProvider, FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from "@firebase/auth";
import * as firebaseui from "firebaseui";
import React, { useEffect } from "react";
import { auth } from "..";

require("firebase/auth");


// FirebaseUI config.
const uiConfig = {
    signInSuccessUrl: '#create-account', // the root of the URL is auto-appended
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        GoogleAuthProvider.PROVIDER_ID,
        FacebookAuthProvider.PROVIDER_ID,
        TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

export class LoginComponent extends React.Component {

    componentDidMount() {
      // Initialize the FirebaseUI Widget using Firebase.
      const firebase_ui_widget = new firebaseui.auth.AuthUI(auth);
    
      // The start method will wait until the DOM is loaded.
      firebase_ui_widget.start('#firebaseui-auth-container', uiConfig);
    }
  
    render() {
      console.log('Render lifecycle')
      return <React.Fragment>
      <div id="firebaseui-auth-container" style={{ marginTop: '5vh' }}></div>
  </React.Fragment>;
    }
  }

export const LoginComponent2 = () => {


    useEffect(() => {
    
    }, [])

    return (
        <React.Fragment>
            <div id="firebaseui-auth-container" style={{ marginTop: '5vh' }}></div>
        </React.Fragment>);
}
