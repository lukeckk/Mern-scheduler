import './App.css';
import {Calendar} from './components/calendar.jsx';
import { Header } from './components/header.jsx';
import { AddTaskModal } from './components/addTask.jsx';

function App() {

  return (
    <div className="App">
      <Header />
      <AddTaskModal />
      <Calendar />
    </div>
  ); 
}

export default App;
