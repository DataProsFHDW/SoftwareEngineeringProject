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
  } from "@ionic/react";
  import { useTodoStorage } from "../storage/StateManagementWrapper";
  import React from "react";
  //Fullcalendar and Realted Plugins
  import FullCalendar from "@fullcalendar/react";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import timeGridPlugin from '@fullcalendar/timegrid'
  import interactionPlugin from '@fullcalendar/interaction'// needed
  import { formatDate } from "@fullcalendar/core";
  import { INITIAL_EVENTS, createEventId } from "../utils/calendar/calendarEventUtils";
  
  export class WorkingCalendarTemplatePage extends React.Component {
    //todoStorage = useTodoStorage();
  
    state = {
      weekendsVisible: true,
      currentEvents: []
    }
  
    render() {
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
            <IonText>Hier könnte ihr Kalender stehen.</IonText>
            <div className="demo-app">
              <div className="demo-app-main">
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
                  weekends={this.state.weekendsVisible}
                  initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                  select={this.handleDateSelect}
                  eventContent={renderEventContent} // custom render function
                  eventClick={this.handleEventClick}
                  eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                  /* you can update a remote database when these fire:
              eventAdd={function(){}}
              eventChange={function(){}}
              eventRemove={function(){}}
              */
                />
              </div>
            </div>
          </IonContent>
        </IonPage>
      );
    }
    handleWeekendsToggle = () => {
      this.setState({
        weekendsVisible: !this.state.weekendsVisible
      })
    }
  
    handleDateSelect = (selectInfo: any) => {
      let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar
  
      calendarApi.unselect() // clear date selection
  
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    }
  
    handleEventClick = (clickInfo: any) => {
      clickInfo.event.remove()
    }
  
    handleEvents = (events: any) => {
      this.setState({
        currentEvents: events
      })
    }
  }
  
  function renderEventContent(eventInfo: any) {
      return (
        <>
          <b>{eventInfo.timeText}</b>
          <i>{eventInfo.event.title}</i>
        </>
      )
    }
    
    function renderSidebarEvent(event: any) {
      return (
        <li key={event.id}>
          <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
          <i>{event.title}</i>
        </li>
      )
    }
    
  