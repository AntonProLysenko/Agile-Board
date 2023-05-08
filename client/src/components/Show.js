import{useState, useEffect} from "react"
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Layout from "../screens/layout/Layout";

function Show({ buttonPressed, setButtonPressed, setIsOpen,task,setTask, open, onClose, BASIC_URL }) {
  const idpar = useParams();
  const navigation = useNavigate();

  // let[currentBody, setCurrentBody] = useState([])



  useEffect(() => {
    async function getTask(id) {
      try {
        const { data } = await axios.get(`${BASIC_URL}/tasks/${id}`);
        setTask(data);
      } catch (error) {
        console.log(error);
      }
    }
    getTask(idpar.id);
  }, [buttonPressed]);


  const handleArchivation = async (statusChange, currentStatus, id) => {
    try {
      if (currentStatus !== "ARCHIVE") {
        const { status } = await axios.put(`${BASIC_URL}/tasks/${id}`, {
          status: statusChange,
          prevStatus: currentStatus,
        });
        if (status === 200) {
          setButtonPressed(!buttonPressed);
        } else {
          alert("Something went wrong!");
        }
      } else {
        await axios.delete(`${BASIC_URL}/tasks/${id}`);
        setButtonPressed(!buttonPressed);
      }
    } catch (error) {
      alert("Something went wrong!" + error);
    }
  };



  function loaded(){
    let arrBody
    if(task.body){
       arrBody = task.body.split(".");
    }

      console.log(arrBody);
      
    return  <>
      {/* {task && task.body.split(".")} */}

      {/* {task.body  &&
      task.body.split(".")&&
      
      console.log(typeof(task.body))
      }  */}

      <Layout />
      <div className="overlay" onClick={onClose}>
        <div className="modalContainer">
          <button className="close" onClick={onClose}>
            x
          </button>

          <h1 className="listTitle">{task.entry}</h1>

          <p className="date">
            Last Update: {new Date(task.updatedAt).toLocaleString()}
          </p>

          <ol>
          {
          task.body?(arrBody.map((li,idx)=>{
             return( <li>
                {li}
              </li>)
          })):<></>}
          </ol>
        


      
    

          {task.status === "ARCHIVE" ? (
            <button
              onClick={() => {
                navigation(`/`);
                handleArchivation("ARCHIVE", task.status, task._id);
              }}
            >
              Delete Forever
            </button>
          ) : (
            <div>
              <button
                onClick={() => {
                  handleArchivation("ARCHIVE", task.status, task._id);
                  navigation(`/`);
                }}
              >
                Archivate
              </button>
              <button onClick={() => setIsOpen(true)}>Edit</button>
            </div>
          )}
        </div>
      </div>
    </>
  }



  return (task? 
      loaded()
   : 
    <>Loading...</>
  );
}

export default Show;
