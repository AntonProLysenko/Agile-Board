import{ useEffect} from "react"
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import Layout from "../screens/layout/Layout";

function Show({ buttonPressed, setButtonPressed, setIsOpen,task,setTask, editOpen, onClose, BASIC_URL }) {
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

 
  let hidebles =  document.querySelectorAll(".showHideble");
  hidebles.forEach((hideble) => {
    if (editOpen) {
      hideble.classList.add("pseudo");
    } else {
      if (hideble.classList.contains("pseudo")) {
        hideble.classList.remove("pseudo");
      }
    }
  });
    




  function loaded(){
    let arrBody
    if(task.body){
       arrBody = task.body.split(".");
    }

    let lastUpdate = moment(task.updatedAt).fromNow();


      
    return (
      <>
        <Layout />
        <div className="overlay" onClick={onClose}>
          <div className="modalContainer">
            <div className="showHeader">
              <button className="close" onClick={onClose}>
                x
              </button>

              <h1 className="listTitle showHideble">{task.entry}</h1>

              <div className="secondaryInfo showHideble">
                <p className="taskStatus">
                  In{" "}
                  {task.status.charAt(0).toUpperCase() +
                    task.status.slice(1).toLowerCase()}{" "}
                  list{" "}
                </p>

                <p className="date">Updated: {lastUpdate} </p>
              </div>
            </div>

            <div className="showInfo showHideble">
              <h3>Instructions:</h3>

              {task.body ? (
                <div className="instructions">
                    {arrBody.map((li, idx) => {
                      if (arrBody[arrBody.length - 1] !== "") {
                        return <p key={idx}> {li} </p>;
                      } else {
                        arrBody.pop();
                        return <p key={idx}> {li} </p>;
                      }
                    })}
                </div>
              ) : (
                <div className="emptyInstructions "></div>
              )}

              {task.status === "ARCHIVE" ? (
                
                  <button
                  className="singleBtn"
                    onClick={() => {
                      navigation(`/`);
                      handleArchivation("ARCHIVE", task.status, task._id);
                    }}
                  >
                    Delete Forever
                  </button>
                
              ) : (
                <div className="moveBtn showBtn">
                  <button onClick={() => setIsOpen(true)}>Edit</button>
                  <button
                    onClick={() => {
                      handleArchivation("ARCHIVE", task.status, task._id);
                      navigation(`/`);
                    }}
                  >
                    Archivate{" "}
                  </button>
                </div>
              )}
            </div>
            <div className="pseudo"></div>
          </div>
        </div>
      </>
    );
  }



  return (task.status? 
      loaded()
   : 
    <>Loading...</>
  );
}

export default Show;
