import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
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
import { Provider } from "react-redux";
import { combinedStoreTodo } from "./dataStores/Stores";
import { useTodoDispatch, useTodoSelector } from "./dataStores/todo/TodoSlice";
import { useEffect } from "react";
import { fetchTodoList } from "./dataStores/todo/FetchTodos";
import { postTodoList } from "./dataStores/todo/PostTodos";
import { Todo } from "./models/Todo";
import { TodoType } from "./models/TodoType";
import { componentOnReady } from "@ionic/core";
import { LoginPage } from "./pages/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from ".";
import { Logout } from "./pages/Logout";

setupIonicReact();

const App: React.FC = () => {

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    console.log("Auth State Changed", user);
  }, [user]);

  const history = useHistory();

  var routerJsx;

  if (user != null) {
    console.log("Update");
    routerJsx = (
      <>
        <Menu />
        <IonRouterOutlet id="main">
          {/* Default Landing Page */}
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
