import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'

import AddTaskForm from "./components/AddTaskForm";
import Lists from "./components/Lists";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";




const plusIcon = <FontAwesomeIcon icon={faPlus} />
const closeIcon = <FontAwesomeIcon icon={faXmark} />;

function App() {
  const [tasks, setTasks] = useState({})
  const [buttonPressed, setButtonPressed] = useState (false)
  const[isOpen, setIsOpen] = useState(false)
  const entry = useRef(null)
  const body = useRef(null);
  const statusRef = useRef(null)



  useEffect(()=>{
    const fetchTask = async()=>{
    try {
      const { data } = await axios.get('http://localhost:3001/tasks/table');//promising to fetch using axios
        setTasks(data)
    } catch (error) {
     alert(error);
    }
  };
  fetchTask()
  },[buttonPressed])




  const handleClick = async (statusChange, id) => {
    try {
      const { status } = await axios.put(`http://localhost:3001/tasks/${id}`, {
      status: statusChange,
    });
    if (status === 200){
      setButtonPressed(!buttonPressed)
    }else{
      alert("Something went wrong!");
    }
    } catch (error) {
      alert(error);
    }
  };




  const handleSubmit = async (evt) => {
    evt.preventDefault();
  
    try {
      const { status } = await axios.post('http://localhost:3001/tasks', {
        entry: entry.current.value,
        body: body.current.value,
        status: statusRef.current.value.toUpperCase,
      });
      if (status === 200){//using axios when button clicked(fetchin data again)
        setButtonPressed(!buttonPressed)
         entry.current.value = "";
         body.current.value = "";
      }else{
        alert("Something went wrong!"); 
      }
      // entry.current.value = ""
    } catch (err) {
      alert(err);
    }
  };
  

  return (
    <div className="App">

      <Lists tasks = {tasks} handleClick = {handleClick}/>
      
      <div className="addButton">
        <button onClick={()=>setIsOpen(true)}>
         {plusIcon} Add New Task
        </button>
      </div>

      <AddTaskForm open = {isOpen} entry={entry} body={body} statusRef={statusRef} handleSubmit={handleSubmit} onClose={()=>setIsOpen(false)} plusIcon={plusIcon} closeIcon={closeIcon} />
      
    </div>
  );
}

export default App;
