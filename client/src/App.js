import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import {Routes, Route, useNavigate} from "react-router-dom";

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
  const [emptyData, setEmptyData] = useState(true)//for loading in Lists.js
  const [task, setTask] = useState({}); // for single task in Show
  const [buttonPressed, setButtonPressed] = useState (false)//used for refetching data on status change
  const [isOpen, setIsOpen] = useState(false)// create/edit form
  const [showOpen, setShowOpen] = useState(false)//show
  const [showTrashBin, setShowTrashBin] = useState(false)
  const [listStatus, setListStatus]= useState()

  const entry = useRef(null)
  const body = useRef(null);
  const statusRef = useRef(null)

  const navigation = useNavigate();


  useEffect(() => {
    const fetchTask = async () => {
      try {
        let { data } = await axios.get(`${BASIC_URL}/tasks/table`); //promising to fetch using axios
        setTasks(data);
        setEmptyData(false)
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

    if (user) { 
      console.log("fetching");
      fetchTask(); 
      usersService.checkToken(); 
    }
    
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

  function handleClose(evt){
    // evt.preventDefault()
    evt.stopPropagation()
    let formOverlay = document.querySelector(".overlay")
    let closeBtn = document.querySelector(".close")
    let editOverlay = document.querySelector(".editOverlay");
    let editCloseBtn = document.querySelector(".editClose");//sinnce edit and show a kind of same elements on close closes show also
    // let editCancelBtn = document.querySelector(".")//separately written on close in internal evt
    let showOverlay = document.querySelector(".showOverlay")
    let trashOverlay = document.querySelector(".trashOverlay")
    let trashClose = document.querySelector(".trashClose")

    console.log(evt)

    if (evt.target == formOverlay || evt.target == showOverlay||evt.target==closeBtn || evt.target == editCloseBtn || evt.target == editOverlay){
      setIsOpen(false);
      setShowOpen(false)
      navigation("/");
      setIsOpen(false);
      // setButtonPressed(!buttonPressed)
    // }if () {
      // navigation(-1);
      // setIsOpen(false);
      // setShowOpen(false);
      console.log(evt.target);
    }else if(evt.target == trashOverlay|| evt.target ==trashClose ){
         setShowTrashBin(false);
    }
}
 




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
      usersService.checkToken();
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

            </div>

         </header>
          <Routes>
            <Route path ="/" element = {<Layout/>}/>{/*Added "/" to layout to prevent warning, cannot add it to Lists, since it dissapears on Show page */}
            {/* <Route path="/" element={ <Layout userName={user.name} setUser={setUser} logOut={logOut} logOutIcon={logOutIcon}/> }/> */}

            <Route path=":id" element={ <Show task={task} setTask={setTask} buttonPressed={buttonPressed} setButtonPressed={setButtonPressed} setIsOpen={setIsOpen} open={showOpen} onClose={handleClose} editOpen={isOpen} BASIC_URL={BASIC_URL}/>}/>
          </Routes>
          <Lists tasks={tasks} handleClick={handleClick} setShowOpen={setShowOpen} plusIcon={plusIcon} checkListIcon={checkListIcon} setIsOpen={setIsOpen} setTask={setTask} emptyData={emptyData}/>
           

          

          {/* <div className="addButton">
          <button onClick={()=>setIsOpen(true)}>
          {plusIcon} Add New Task
          </button>
          </div> */}

          <AddTaskForm open={isOpen} entry={entry} body={body} statusRef={statusRef} handleSubmit={handleSubmit} handleUpdate={handleUpdate} onClose={handleClose} 
            plusIcon={plusIcon}
            closeIcon={closeIcon}
            setIsOpen={setIsOpen}
            task={task}
          />

          <TrashBin
            tasks={tasks}
            user={user}
            open={showTrashBin}
            handleClick={handleClick}
            closeIcon={closeIcon}
            onClose={handleClose}
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
