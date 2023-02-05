import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AddTaskForm from './components/AddTaskForm';




function App() {
  const [tasks, setTasks] = useState({})
  const [buttonPressed, setButtonPressed] = useState (false)
  const entry = useRef(null)
  const body = useRef(null);
  const statusRef = useRef(null)



  useEffect(()=>{
    const fetchTask = async()=>{

  
    try {
      const { data } = await axios.get('http://localhost:3001/tasks/table');//promising to fetch using axios
        setTasks(data)
    } catch (error) {
      console.log(error);
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
      console.log("Something went wrong!");
    }
    } catch (error) {
      
      console.log(error);
      
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
        console.log("Something went wrong!"); 
      }
      // entry.current.value = ""
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="App">
      <div className="container">
        <div id="to-do" className="section">
          <div className="list">
            <h2>To-Do</h2>
            {tasks["TO-DO"]
              ? tasks["TO-DO"].map((task) => {
                  return (
                    <div className="task">
                      <Link to={`/${task._id}`}>{task.entry}</Link>
                      <div>
                        <button
                          onClick={() => {
                            handleClick("PENDING", task._id);
                          }}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => {
                            handleClick("COMPLETED", task._id);
                          }}
                        >
                          Completed
                        </button>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div id="pending" className="section">
          <div className="list">
            <h2>Pending</h2>
            {tasks["PENDING"]
              ? tasks["PENDING"].map((task) => {
                  return (
                    <div className="task">
                      <Link to={`/${task._id}`}>{task.entry}</Link>
                      <div>
                        <button
                          onClick={() => {
                            handleClick("TO-DO", task._id);
                          }}
                        >
                          To-Do
                        </button>

                        <button
                          onClick={() => {
                            handleClick("COMPLETED", task._id);
                          }}
                        >
                          Completed
                        </button>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div id="completed" className="section">
          <div className="list">
            <h2>Completed</h2>
            {tasks["COMPLETED"]
              ? tasks["COMPLETED"].map((task) => {
                  return (
                    <div className="task">
                      <Link to={`/${task._id}`}>{task.entry}</Link>
                      <div>
                        <button
                          onClick={() => {
                            handleClick("PENDING", task._id);
                          }}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => {
                            handleClick("TO-DO", task._id);
                          }}
                        >
                          To-Do
                        </button>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
      <div className="addButton">
        <button>
          <FontAwesomeIcon icon={faPlus} /> Add New Task
        </button>
      </div>

      <AddTaskForm entry={entry} body={body} statusRef={statusRef} handleSubmit={handleSubmit}/>
      
    </div>
  );
}

export default App;
