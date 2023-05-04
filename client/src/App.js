import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import {Routes, Route} from "react-router-dom";

import { getUser, logOut } from './utilities/user-service';
import * as usersService from "./utilities/user-service";
// import * as userService from './utilities/user-service'

import Layout from "./screens/layout/Layout";
import AuthPage from './screens/AuthPage';

import Show from "./components/Show";
import AddTaskForm from "./components/AddTaskForm";
import Lists from "./components/Lists";
import TrashBin from './components/TrashBin';
// import logo from '../assets/logo.png'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
// import { faPersonFromPortal } from "@fortawesome/free-solid-svg-icons";





const BASIC_URL = process.env.REACT_APP_BASIC_URL;

const plusIcon = <FontAwesomeIcon icon={faPlus} />
const closeIcon = <FontAwesomeIcon icon={faXmark} />;
const TrashBinIcon = <FontAwesomeIcon icon={faTrashCan} />;
const logOutIcon = <FontAwesomeIcon icon={faRightFromBracket} />;
const checkListIcon = <FontAwesomeIcon icon={faListCheck} />;

function App() {
  const [user, setUser] = useState(getUser());
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [tasks, setTasks] = useState({})//for lists of tasks
  const [task, setTask] = useState({}); // for single task in Show
  const [buttonPressed, setButtonPressed] = useState (false)//used for refetching data on status change
  const [isOpen, setIsOpen] = useState(false)//show create/edit form
  const [showTrashBin, setShowTrashBin] = useState(false)
  const [listStatus, setListStatus]= useState()

  const entry = useRef(null)
  const body = useRef(null);
  const statusRef = useRef(null)


  useEffect(() => {
    const fetchTask = async () => {
      try {
        let { data } = await axios.get(`http://localhost:3001/tasks/table`); //promising to fetch using axios
        // data = Object.entries(data);
   
        // console.log("credentials"+ credentials);

        // console.log("data " +data);
        


//         let token = localStorage.getItem("token");
//          const userInfo = JSON.parse(atob( token.split(".")[1]));
//                 console.log("user " + {userInfo});
//                 console.log("App.js User is " + userInfo.user.name);

// console.log("function");

//                 console.log(getUser());
                
        // data = data.filter((task) => task.user === user.email);
        // foundTasks =  foundTasks.filter((task) => task.user === currentUser.email); //filtering data by the current user in backend
        // data = data.filter((tasks) => tasks.user === userInfo.user.email);
        // console.log("data " + JSON.stringify(data));
        setTasks(data);
        const titleBtn = document.querySelectorAll(".titleBtn");
        Object.keys(titleBtn).forEach(function (i) {
          titleBtn[i].addEventListener("click", (evt) => {
            setListStatus(evt.target.id);
          });
        });
      } catch (error) {
        alert("Something went wrong!" + error);
      }
    };
    fetchTask();
  },[buttonPressed]);




  const handleClick = async (statusChange, id) => {
    try {
      const { status } = await axios.put(`${BASIC_URL}/tasks/${id}`, {
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

async function handleLogin(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();

    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      // setButtonPressed(!buttonPressed);
      const user = await usersService.logIn(credentials);
      setUser(user);
      setButtonPressed(!buttonPressed);
      setCredentials({email:"", password:""})//clearing form
    } catch {
      setError("Log In Failed - Try Again");
    }
  }

    function handleChange(evt) {
      setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
      setError("");
    }


  const handleSubmit = async (evt) => {
    evt.preventDefault();
  
    try {
      const { status } = await axios.post(`${BASIC_URL}/tasks`, {
        entry: entry.current.value,
        body: body.current.value,
        status: listStatus.toUpperCase(),
        prevStatus: "",
        user: user.email,
      });
      
      if (status === 200){//using axios when button clicked(fetchin data again)
        setButtonPressed(!buttonPressed)
         entry.current.value = "";
         body.current.value = "";
      }else{
        alert("Something went wrong!"); 
      }
     
    } catch (err) {
      alert("Something went wrong!"+err);
    }
  };

    const handleUpdate = async (evt, id) => {
      evt.preventDefault()
      try {
         const { status } = await axios.put(`${BASIC_URL}/tasks/${id}`, {
           entry: entry.current.value,
           body: body.current.value,
           status: task.status,
           prevStatus: task.prevStatus,
           username: task.usename
    });     
        if (status === 200) {
         
          setButtonPressed(!buttonPressed);
          setIsOpen(false);
          entry.current.value = "";
          body.current.value = "";
        
        } else {
          alert("Something went wrong!");
        }

      } catch (error) {
        alert(error)
      }
    };


  
  
  return (
    <div className="App">
      {user ? (
        <>
         <header>
          <img src={require('./assets/logo.png')} alt='logo'/>
            <div className="title">
              <p>Welcome, {user.name[0].toUpperCase()+user.name.slice(1).toLowerCase()}!</p>
            </div>
            <div className='logOut'>
              <span  onClick={() => {setUser(null); logOut();}}>Sign Out {logOutIcon}</span>
              {/* <button onClick={handleCheckToken}>Check token exparation</button> */}
            </div>

         </header>
          <Routes>
            <Route path ="/" element = {<Layout/>}/>{/*Added "/" to layout to prevent warning, cannot add it to Lists, since it dissapears on Show page */}
            {/* <Route path="/" element={ <Layout userName={user.name} setUser={setUser} logOut={logOut} logOutIcon={logOutIcon}/> }/> */}
            <Route path=":id" element={ <Show task={task} setTask={setTask} buttonPressed={buttonPressed} setButtonPressed={setButtonPressed} setIsOpen={setIsOpen} BASIC_URL={BASIC_URL}/>}/>
          </Routes>
          <Lists tasks={tasks} handleClick={handleClick} plusIcon={plusIcon} checkListIcon={checkListIcon} setIsOpen={setIsOpen} setTask={setTask} user={user}/>
           

          

          {/* <div className="addButton">
          <button onClick={()=>setIsOpen(true)}>
          {plusIcon} Add New Task
          </button>
          </div> */}

          <AddTaskForm open={isOpen} entry={entry} body={body} statusRef={statusRef} handleSubmit={handleSubmit} handleUpdate={handleUpdate}onClose={() => { setIsOpen(false);}}
            plusIcon={plusIcon}
            closeIcon={closeIcon}
            task={task}
          />

          <TrashBin
            tasks={tasks}
            user={user}
            open={showTrashBin}
            handleClick={handleClick}
            closeIcon={closeIcon}
            onClose={() => setShowTrashBin(false)}
          />

          <i className="trashBin" onClick={() => setShowTrashBin(true)}> {TrashBinIcon} </i>
        </>
      ) : (
        <>
          <h1>Please Log-in</h1>
          <Routes>
            <Route
              path="/"
              element={
                <AuthPage
                  setUser={setUser}
                  setButtonPressed={setButtonPressed}
                  buttonPressed={buttonPressed}
                  handleLogin={handleLogin}
                  credentials={credentials}
                  handleChange={handleChange}
                  error={error}
                />
              }
            />
          </Routes>
        </>
      )}
    </div>
  );


}

export default App;
