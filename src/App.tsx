import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
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

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            {/* Default Landing Page */}
            <Redirect exact from="/" to="/dashboard" />
            <Route path="/dashboard">
              <LandingPage />
            </Route>
            <Route path="/todo" exact={false}>
              <ToDoPage />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
