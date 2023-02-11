import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import {Routes, Route, useNavigate} from "react-router-dom";

import Layout from "./screens/layout/Layout";
import Show from "./screens/Show";
import AddTaskForm from "./components/AddTaskForm";
import Lists from "./components/Lists";
import TrashBin from './components/TrashBin';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";




const plusIcon = <FontAwesomeIcon icon={faPlus} />
const closeIcon = <FontAwesomeIcon icon={faXmark} />;
const TrashBinIcon = <FontAwesomeIcon icon={faTrashCan} />;

function App() {
  const [tasks, setTasks] = useState({})//for lists of tasks
  const [task, setTask] = useState({}); // for single task in Show
  const [buttonPressed, setButtonPressed] = useState (false)//used for refetching data on status change
  const [isOpen, setIsOpen] = useState(false)//show create/edit form
  const [showTrashBin, setShowTrashBin] = useState(false)
  const [listStatus, setListStatus]= useState()

  const entry = useRef(null)
  const body = useRef(null);
  const statusRef = useRef(null)


  useEffect(()=>{
    const fetchTask = async()=>{
    try {
      const { data } = await axios.get("http://localhost:3001/tasks/table"); //promising to fetch using axios
      setTasks(data);


       const titleBtn = document.querySelectorAll(".titleBtn");
       Object.keys(titleBtn).forEach(function (i) {
         titleBtn[i].addEventListener("click", (evt) => {
           setListStatus(evt.target.id);
         });
       });
    } catch (error) {
     alert("Something went wrong!"+error);
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
      alert("Something went wrong!"+ error);
    }
  };




  const handleSubmit = async (evt) => {
    evt.preventDefault();
  
    try {
      
      const { status } = await axios.post("http://localhost:3001/tasks", {
        entry: entry.current.value,
        body: body.current.value,
        status: listStatus.toUpperCase(),
        prevStatus: "",
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
      alert("Something went wrong!"+err);
    }
  };

    const handleUpdate = async (id) => {
  
      try {
         const { status } = await axios.put(`http://localhost:3001/tasks/${id}`, {
           entry: entry.current.value,
           body: body.current.value,
           status: task.status,
           prevStatus: task.prevStatus,
    });

      } catch (error) {
        alert(error)
      }
    };
  

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route
          path=":id"
          element={
            <Show
              task={task}
              setTask = {setTask}
              buttonPressed={buttonPressed}
              setButtonPressed={setButtonPressed}
              setIsOpen={setIsOpen}
            />
          }
        />
      </Routes>

      <Lists
        tasks={tasks}
        handleClick={handleClick}
        plusIcon={plusIcon}
        setIsOpen={setIsOpen}
        setTask = {setTask}
      />

      {/* <div className="addButton">
        <button onClick={()=>setIsOpen(true)}>
         {plusIcon} Add New Task
        </button>
      </div> */}

      <AddTaskForm
        open={isOpen}
        entry={entry}
        body={body}
        statusRef={statusRef}
        handleSubmit={handleSubmit}
        handleUpdate = {handleUpdate}
        onClose={() => {setIsOpen(false);}}
        plusIcon={plusIcon}
        closeIcon={closeIcon}
        task = {task}
      />

      <TrashBin
        tasks={tasks}
        open={showTrashBin}
        handleClick={handleClick}
        closeIcon={closeIcon}
        onClose={() => setShowTrashBin(false)}
      />

      <i className="trashBin" onClick={() => setShowTrashBin(true)}> {TrashBinIcon} </i>
    </div>
  );
}

export default App;
