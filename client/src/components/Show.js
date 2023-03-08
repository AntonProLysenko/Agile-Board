import{useState, useEffect} from "react"
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Layout from "../screens/layout/Layout";

function Show({ buttonPressed, setButtonPressed, setIsOpen, task, setTask, BASIC_URL }) {
  const idpar = useParams();
  const navigation = useNavigate();
  

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



  return (
    <>
      <Layout />
      <div className="showOverlay">
        <div className="modalContainer">
          <Link className="close" to="/">
            <button className="close">x</button>
          </Link>
          <h1 className="listTitle">{task.entry}</h1>

          <p className="date">
            Last Update: {new Date(task.updatedAt).toLocaleString()}
          </p>

          <p>{task.body}</p>

          {task.status === "ARCHIVE" ? (
            <button
              onClick={() => {
                handleArchivation("ARCHIVE", task.status, task._id);
                navigation(`/`);
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
              <button onClick={()=>setIsOpen(true)}>Edit</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Show;
