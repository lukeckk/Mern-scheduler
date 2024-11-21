import './App.css';
import { ScheduleXCalendar} from "@schedule-x/react"
import {Calendar} from './components/calendar.jsx';
import { Header } from './components/header.jsx';

function App() {

  return (
    <div className="App">
      <Header />
      <Calendar />
    </div>
  ); 
}

export default App;
