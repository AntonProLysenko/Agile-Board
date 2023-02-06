import{useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import axios from "axios";

function Show() {
  const idpar = useParams();
  const [task, setTask] = useState({});
  useEffect(() => {

    async function getTask(id) {
      try {
        const {data} = await axios.get(`http://localhost:3001/tasks/${id}`);

        console.log(data);
        
        setTask(data);

        console.log();
        

      } catch (error) {
        console.log(error)
      }
    }

    getTask(idpar.id);
  }, []);
console.log(task)
  return(

    <div>
      <h1>{task.entry}</h1>
      <p>{task.body}</p>
      <p>Last update: {task.updatedAt}</p>
    </div>
  ) 
}

export default Show;
