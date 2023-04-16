import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonModal,
  useIonViewDidEnter,
  useIonViewWillLeave
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useTodoStorage } from "../storage/StateManagementWrapper";
// @ts-ignore 
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { TodoEditModal } from "../components/TodoEditModal";
import { ITodoGroup } from "../models/ITodo";
import { createEventId } from "../utils/calendar/calendarEventUtils";
import { refreshOutline } from "ionicons/icons";

/**
 * CalendarPage Component to display the TodoList saved in storage that holds checked items
 */
interface eventType {
  id: string;
  title: string;
  start: Date;
  extendedProps: any;
}

/**
 * CalendarPage Component to display the TodoList saved in storage that holds checked items
 * @constructor 
 * @returns {JSX.Element}
 */
export const CalendarPage: React.FC = () => {
  const todoStorage = useTodoStorage();

  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true);
  const [currentEvents, setCurrentEvents] = useState<eventType[] | undefined>();
  const [selectedTodo, setSelectedTodo] = useState<ITodoGroup>();

  const [presentEdit, dismissEdit] = useIonModal(TodoEditModal, {
    todoItem: selectedTodo,
    onDismiss: (data: ITodoGroup, role: string) => dismissEdit(data, role),
  });

  useIonViewDidEnter(() => {
    todoStorage.refreshTodos();
  });
/*
  useIonViewWillLeave(()=> {
    todoStorage.refreshTodos();
  })
*/
  useEffect(() => {
    let timedTodoList = todoStorage.getTodoList().map((todo, index) => {
      console.log("Date Value; " + todo.todoDate);
      if (todo.todoDate) {
        return {
          id: todo.id,
          title: todo.todoTitle.toString(),
          start: todo.todoDate,
          extendedProps: { todoData: todo },
        };
      }
    });
    console.log(timedTodoList.filter(Boolean));
    setCurrentEvents(timedTodoList.filter(Boolean) as eventType[]);
  }, [todoStorage.storage]);

  const handleEditClick = (todo: ITodoGroup) => {
    setSelectedTodo(todo);
    presentEdit({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          console.log("Confirmed Input: " + JSON.stringify(ev.detail.data));
          setSelectedTodo(ev.detail.data as ITodoGroup);
          console.log(selectedTodo);
        }
      },
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Calendar View</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          //initialEvents={events} // alternatively, use the `events` setting to fetch from a feed
          events={currentEvents}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
        />
      </IonContent>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonFabButton
            onClick={() => {
              todoStorage.refreshTodos();
            }}
          >
            <IonIcon icon={refreshOutline}></IonIcon>
          </IonFabButton>
      </IonFab>
    </IonPage>
    
  );

  function handleDateSelect(selectInfo: any) {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  function handleEventClick(clickInfo: any) {
    clickInfo.event.remove();
  }
};

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
