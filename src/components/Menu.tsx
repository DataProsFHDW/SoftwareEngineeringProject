import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, logOutOutline, logOutSharp, statsChartOutline, statsChartSharp, calendarNumberOutline } from 'ionicons/icons';
import './Menu.css';
import { auth } from '../utils/firebase/Database-function';

/**
 * The AppPage interface defines the shape of an object that represents an app page.
 *
 * @interface AppPage
 */
interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'To-Dos',
    url: '/ToDo',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Favorites',
    url: '/favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Calendar',
    url: '/Calendar',
    iosIcon: calendarNumberOutline,
    mdIcon: calendarNumberOutline
  },
  {
    title: 'Statistics',
    url: '/stats',
    iosIcon: statsChartOutline,
    mdIcon: statsChartSharp
  },
  {
    title: 'Archived',
    url: '/archive',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Logout',
    url: '/logout',
    iosIcon: logOutOutline,
    mdIcon: logOutSharp
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

/**
 * The Menu component is a functional React component that renders an overlay menu with links to app pages and labels.
 *
 * @returns {JSX.Element} - A React element that renders an overlay menu with links to app pages and labels.
 */
const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        {/* Render a list of links to app pages */}
        <IonList id="inbox-list">
          <IonListHeader>Checkbox-Menu</IonListHeader>
          <IonNote>Hi {auth.currentUser?.displayName} </IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
