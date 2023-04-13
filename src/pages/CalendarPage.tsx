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
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";

interface eventType {
  id: string;
  title: string;
  start: Date;
  extendedProps: any;
}

const events2: eventType[] = [
  {
      "id": "0niKODw68kCFcPfJ96xW",
      "title": "Wild",
      "start": new Date("2023-04-12T18:14:00.000Z"),
      "extendedProps": {
          "todoData": {
              "id": "0niKODw68kCFcPfJ96xW",
              "todoType": "Single ToDo",
              "todoTitle": "Wild",
              "todoDescription": "LOL collab",
              "todoDate": "2023-04-12T18:14:00.000Z",
              "users": [
                  "cEtY5elpUJNOGC5TTHlkgjKkcrj1",
                  "fZaZeIfJnZbkOfeaLNmfJkCPRcE2",
                  "n1uK8YwZiNf8sM0ckjsea79puPw2"
              ],
              "isDeleted": false,
              "isSynced": true
          }
      }
  },
  {
      "id": "WLlcFWGPD2KuEnTEwoRb",
      "title": "Grüsli de La",
      "start": new Date("2023-04-15T20:25:00.000Z"),
      "extendedProps": {
          "todoData": {
              "id": "WLlcFWGPD2KuEnTEwoRb",
              "todoType": "Single ToDo",
              "todoTitle": "Grüsli de La",
              "todoDescription": "Simoms",
              "todoDate": "2023-04-15T20:25:00.000Z",
              "users": [
                  "cEtY5elpUJNOGC5TTHlkgjKkcrj1",
                  "n1uK8YwZiNf8sM0ckjsea79puPw2"
              ],
              "isDeleted": false,
              "isSynced": true
          }
      }
  },
  {
      "id": "g5cXYI0COJSnG7PHoTQP",
      "title": "Hallo",
      "start": new Date("2023-04-22T18:51:00.000Z"),
      "extendedProps": {
          "todoData": {
              "id": "g5cXYI0COJSnG7PHoTQP",
              "todoType": "Single ToDo",
              "todoTitle": "Hallo",
              "todoDescription": "Erde",
              "todoDate": "2023-04-22T18:51:00.000Z",
              "users": [
                  "fZaZeIfJnZbkOfeaLNmfJkCPRcE2",
                  "n1uK8YwZiNf8sM0ckjsea79puPw2"
              ],
              "isDeleted": false,
              "isSynced": true
          }
      }
  },
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
]
/*
[
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
*/
export const CalendarPage: React.FC = () => {
  const todoStorage = useTodoStorage();

  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true);
  const [currentEvents, setCurrentEvents] = useState<eventType[] | undefined>();
  const [selectedTodo, setSelectedTodo] = useState<ITodoGroup>();
  let currentEvents2: any[]| undefined = undefined

  const [presentEdit, dismissEdit] = useIonModal(TodoEditModal, {
    todoItem: selectedTodo,
    onDismiss: (data: ITodoGroup, role: string) => dismissEdit(data, role),
  });

  useEffect(() => {
    todoStorage.refreshTodos();
    
  }, []);

  useEffect(() => {
    let timedTodoList = todoStorage.getTodoList().map((todo, index) => {
      console.log("Date Value; " + todo.todoDate);
      if (todo.todoDate) {
        return {
          "id": todo.id,
          "title": todo.todoTitle.toString(),
          "start": todo.todoDate,
          "extendedProps": { "todoData": todo },
        };
      }
    });
    console.log(timedTodoList.filter( Boolean ));
    setCurrentEvents(timedTodoList.filter( Boolean ) as eventType[]);
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
          //initialEvents={events} // alternatively, use the `events` setting to fetch from a feed
          events={currentEvents}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          // eventsSet={handleEvents} // called after events are initialized/added/changed/removed

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
