import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
  useIonToast,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, useHistory } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/Page";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { LandingPage } from "./pages/LandingPage";
import { ToDoPage } from "./pages/ToDoPage";
import { useEffect, useState } from "react";
import { LoginPage } from "./pages/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { Logout } from "./pages/Logout";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fetchUsername, UsernamePage } from "./pages/UsernamePage";
import { useTodoStorage } from "./storage/StateManagementWrapper";
import { Network } from "@capacitor/network";
import { auth } from "./utils/firebase/Database-function";

setupIonicReact();

const App: React.FC = () => {

  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState<string | null | undefined>(undefined);
  const todoStorage = useTodoStorage();
  const [present] = useIonToast();

  useEffect(() => {
    // init
    const init = async () => {
      setUsername(await todoStorage.getUsername())
    }
    init();
  });

  useEffect(() => {
    console.log("Auth State Changed", /* user */);

    const fetchUserProfile = async () => {
      if (auth.currentUser != null) {
        /* Logged in */
        try {
          await Network.getStatus().then(async (value) => {
            if (value.connected && value.connectionType != undefined) {
              await todoStorage.setUsername(await fetchUsername(todoStorage));
            }
          });
        } catch (ex) {
        }
        setUsername(await todoStorage.getUsername())
      }
    }
    fetchUserProfile();
  }, [user]);

  const history = useHistory();

  var routerJsx;

  var isDemoUser = true;

  if (user != null || (isDemoUser && (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'))) {
    if (auth.currentUser == null) {
      Network.getStatus().then((value) => {
        if (value.connected && value.connectionType != undefined) {
          try {
            /* Null check in debug mode */
            var email = "demoFirebaseMail@gmail.com";
            var password = "demoPassword";
            // var credential = createUserWithEmailAndPassword(auth, email, password).catch((error) => { /* console.log("Debug user already exists") */ });
            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
              /* Signed in */
              var user = userCredential.user;
              console.log("Debug user logged in")
            }).catch((error) => { });
          } catch (ex) {
            present({ message: "Please try again.", duration: 1500 });
          }
        }
      });
    }

    if (username == undefined) {
      routerJsx = (<></>);
    } else if (username == null) {
      /* No username */
      routerJsx = (
        <>
          <IonRouterOutlet id="main">
            {/* Default Landing Page */}
            <Redirect exact from="/" to="/username" />
            <Redirect exact from="/Dashboard" to="/username" />
            <Route path="/username">
              <UsernamePage />
            </Route>
            <Redirect to="/username" />
          </IonRouterOutlet>
        </>)
    } else {
      /* Logged in perfectly */
      routerJsx = (
        <>
          <Menu />
          <IonRouterOutlet id="main">
            {/* Default Landing Page */}
            <Redirect from="/username" to="/" />
            <Redirect exact from="/" to="/dashboard" />
            <Redirect from="/login" to="/dashboard" />
            <Route path="/dashboard">
              <LandingPage />
            </Route>
            <Route path="/todo" exact={false}>
              <ToDoPage />
            </Route>
            <Route path="/logout" exact={false}>
              <Logout />
            </Route>
          </IonRouterOutlet>
        </>)
    }
  } else {
    /* Not logged in */
    routerJsx = (
      <>
        <IonRouterOutlet id="main">
          {/* Default Landing Page */}
          <Redirect exact from="/" to="/login" />
          <Route path="/login">
            <LoginPage />
          </Route>
        </IonRouterOutlet>
      </>)
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          {routerJsx}
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
