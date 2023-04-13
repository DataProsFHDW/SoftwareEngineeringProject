import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import { useTodoStorage } from "../storage/StateManagementWrapper";
import React, { useEffect, useState } from "react";
//Fullcalendar and Realted Plugins
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed
import { formatDate } from "@fullcalendar/core";
import { createEventId } from "../utils/calendar/calendarEventUtils";
import { TodoEditModal } from "../components/TodoEditModal";
import { ITodoGroup } from "../models/ITodo";
import { TodoType } from "../models/TodoType";

interface eventType {
  id: string;
  title: string;
  start: Date;
  extendedProps: object;
}

const events: eventType[] = [
  {
    id: "1",
    title: "Meeting",
    start: new Date(),
    extendedProps: {
      todoData: {
        todoType: TodoType.SIMPLE,
        todoTitle: "Title",
        todoDescription: "",
        todoDate: new Date(),
      },
    },
  },
];

export const CalendarPage: React.FC = () => {
  const todoStorage = useTodoStorage();
  const todoList = todoStorage.getTodoList();

  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true);
  const [currentEvents, setCurrentEvents] = useState<eventType[]>(events);
  const [selectedTodo, setSelectedTodo] = useState<ITodoGroup>();

  const [presentEdit, dismissEdit] = useIonModal(TodoEditModal, {
    todoItem: selectedTodo,
    onDismiss: (data: ITodoGroup, role: string) => dismissEdit(data, role),
  });
  useEffect(() => {
    todoStorage.refreshTodos();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Calendar View</IonTitle>
          <IonButton
            onClick={() => {
              //this.todoStorage.refreshTodos();
            }}
          >
            Refresh
          </IonButton>
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
          initialEvents={events} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed

          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
      </IonContent>
    </IonPage>
  );

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

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

  function handleEvents(events: any) {
    setCurrentEvents(events);
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
