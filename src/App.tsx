import {
  IonApp,
  IonContent,
  IonHeader,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
  isPlatform,
  setupIonicReact,
  useIonToast
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import { Network } from "@capacitor/network";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ArchivePage } from "./pages/ArchivePage";
import { CalendarPage } from "./pages/CalendarPage";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/Login";
import { Logout } from "./pages/Logout";
import StatsPage from "./pages/StatsPage";
import { ToDoPage } from "./pages/ToDoPage";
import { fetchUsername, UsernamePage } from "./pages/UsernamePage";
import { useTodoStorage } from "./storage/StateManagementWrapper";
import "./theme/variables.css";
import { auth } from "./utils/firebase/Database-function";
import NotificationUtils from "./utils/NotificationUtils";

setupIonicReact();

/**
 * Main App
 */
const App: React.FC = () => {

  const [user] = useAuthState(auth);
  const [username, setUsername] = useState<string | null | undefined>(undefined);
  const todoStorage = useTodoStorage();
  const [present] = useIonToast();

  // init
  useEffect(() => {
    const init = async () => {
      setUsername(await todoStorage.getUsername())
    }
    init();
    try {
      NotificationUtils.scheduleAllTodos(todoStorage.getTodoList());
    } catch (ex) {

    }
  });

  // auth state changed
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

  /* If we are in debug (developmentMode)
     and isDemoUser is true,
     we will log in as a demo user */
  var isDemoUser = true;
  if (user != null || (isDemoUser && (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' || isPlatform("android")))) {
    if (auth.currentUser == null) {
      Network.getStatus().then((value) => {
        if (value.connected && value.connectionType != undefined) {
          try {
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

    var routerJsx;
    if (username === undefined) {
      /* Data fetch from firestore is still loading */
      console.log("Route", "username undefined")
      routerJsx = (<></>); 
    } else if (username === null) {
      console.log("Route", "username null")
      /* No username set in firestore */
      routerJsx = (
        <>
          <IonRouterOutlet id="main">
            <Redirect exact from="*" to="/username" />
            <Redirect exact path="/" to="/username" />
            {/* Default Landing Page */}
            <Route exact path="/username">
              <UsernamePage />
            </Route>
            <Redirect exact from="/" to="/username" />
            <Redirect exact to="/username" />
          </IonRouterOutlet>
        </>)

    } else {
      console.log("Route", "logged in")
      /* Logged in perfectly */
      routerJsx = (
        <>
          <Menu />
          <IonRouterOutlet id="main">
            {/* Default Landing Page */}
            <Redirect exact from="/username" to="/" />
            <Redirect exact from="/" to="/todo" />
            <Redirect exact from="/login" to="/todo" />
            <Route path="/todo" exact={true}>
              <ToDoPage />
            </Route>
            <Route path="/archive" exact={true}>
              <ArchivePage />
            </Route>
            <Route path="/Stats" exact={false}>
              <StatsPage/>
            </Route>
            <Route path="/logout" exact={true}>
              <Logout />
            </Route>
            <Route path="/calendar" exact={true}>
              <CalendarPage />
            </Route>
          </IonRouterOutlet>
        </>)
    }
  } else {
    console.log("Route", "Not logged in")
    /* Not logged in */
    routerJsx = (
      <>
        <IonRouterOutlet id="main">
          {/* Default Landing Page */}
          <Redirect exact from="*" to="/login" />
          <Redirect exact path="/" to="/login" />
          <Route exact path="/login">
            <LoginPage />
          </Route>
        </IonRouterOutlet>
      </>)
  }

  return (
    <IonApp >
      <IonReactRouter>
        <IonSplitPane contentId="main">
          {routerJsx}
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
