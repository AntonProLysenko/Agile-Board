import{useState, useEffect} from "react"
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Show() {
  const idpar = useParams();
  const navigation = useNavigate();
  const [task, setTask] = useState({});
  // const [buttonPressed, setButtonPressed] = useState(false);
  useEffect(() => {

    async function getTask(id) {
      try {
        const {data} = await axios.get(`http://localhost:3001/tasks/${id}`);
        setTask(data);        
      } catch (error) {
        console.log(error)
      }
    }
    getTask(idpar.id);
  }, []);
console.log(task)

const handleArchivation = async (statusChange,currentStatus, id) => {
  try {

    console.log(task.prevStatus);
    

    const { status, prevStatus } = await axios.put(`http://localhost:3001/tasks/${id}`, {
      status: statusChange,
      prevStatus: currentStatus,

    });
    // if (status === 200 && prevStatus ===200) {
    //   // setButtonPressed(!buttonPressed);
    // } else {
    //   alert("Something went wrong!");
    // }
  } catch (error) {
    alert("Something went wrong!" + error);
  }
};
  return (
    <div>
      <h1>{task.entry}</h1>
      <p>{task.body}</p>
      <p>Last update: {task.updatedAt}</p>
      <button onClick={() => {handleArchivation("ARCHIVE", task.status, task._id); navigation(`/`);}}>
        Delete
      </button>
    </div>
  ); 
}

export default Show;
