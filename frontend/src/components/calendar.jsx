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
import { createCurrentTimePlugin } from '@schedule-x/current-time'
import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react';

import React from 'react'

export const Calendar = () => {
  const [tasks, setTasks] = useState([]);
  const eventsService = createEventsServicePlugin();

   // Fetch tasks from the API
   useEffect(() => {
    console.log('Fetching tasks from API...');
    fetch('http://localhost:5000/tasks')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
  
        // Convert `start` and `end` to Date objects
        const formattedData = data.map((task) => ({
          ...task,
          start: new Date(task.start),
          end: new Date(task.end),
        }));
  
        console.log('Formatted tasks:', formattedData);
        setTasks(formattedData);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);
 
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: tasks,
    plugins : [
      eventsService,
      createEventModalPlugin(),
      createDragAndDropPlugin(),
      createCurrentTimePlugin(),
    ],
    callbacks: {
      onEventUpdate: (updatedEvent) => {
        // Update the event using eventsServicePlugin.update
        eventsService.update(updatedEvent);

        console.log('Event updated:', updatedEvent);
      },
    },
  })
 
  
  return <ScheduleXCalendar calendarApp={calendar} />;
}
