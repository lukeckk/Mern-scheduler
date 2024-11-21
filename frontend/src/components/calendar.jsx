import '../App.css';
import {useCalendarApp, ScheduleXCalendar} from "@schedule-x/react"
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import '@schedule-x/theme-default/dist/index.css'
import { useEffect } from 'react';
import { tasks, updateTask } from '../db';

import React from 'react'

export const Calendar = () => {
  const eventsService = createEventsServicePlugin();
 
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: tasks,
    plugins : [
      eventsService,
      createEventModalPlugin(),
      createDragAndDropPlugin(),
    ],
    callbacks: {
      onEventUpdate: (updatedEvent) => {
        // Update the event using eventsServicePlugin.update
        eventsService.update(updatedEvent);

        console.log('Event updated:', updatedEvent);
      },
    },
  })
 
  useEffect(() => {
    // get all events
    calendar.eventsService.getAll()
  }, [])
  
  return <ScheduleXCalendar calendarApp={calendar} />;
}
