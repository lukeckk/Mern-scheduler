import '../App.css';
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createCurrentTimePlugin } from '@schedule-x/current-time';
import '@schedule-x/theme-default/dist/index.css';
import { useEffect, useState } from 'react';
import React from 'react';
import { AddTaskModal } from './addTask'; // Import the modal component

export const Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const eventsService = createEventsServicePlugin();

 
  const handleAddTask = async (taskData) => {
    try {
      console.log('About to send request with data:', taskData);
  
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
  
      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);
  
      if (!response.ok) {
        throw new Error(`Server error: ${responseText}`);
      }
  
      const result = JSON.parse(responseText);
      console.log('Parsed response:', result);
  
      fetchTasks();
    } catch (error) {
      console.error('Full error details:', error);
      alert(`Failed to add task: ${error.message}`);
    }
  };

  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the API
  const fetchTasks = () => {
    fetch('http://localhost:5000/tasks')
      .then((response) => response.json())
      .then((data) => {
        console.log('fetched data:', data);
        setTasks(data);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: tasks,
    plugins: [
      eventsService,
      createEventModalPlugin(),
      createDragAndDropPlugin(),
      createCurrentTimePlugin(),
    ],
    callbacks: {
      onEventUpdate: (updatedEvent) => {
        eventsService.update(updatedEvent);
        console.log('Event updated:', updatedEvent);
      },
    },
  });

  return (
    <div className="relative">
      <div className="mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
      <ScheduleXCalendar calendarApp={calendar} />
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
      />
    </div>
  );
};