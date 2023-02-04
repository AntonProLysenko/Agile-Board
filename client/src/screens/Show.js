import{useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import axios from "axios";

function Show() {
  const idpar = useParams();

  console.log(idpar.id);
  
  const [task, setTask] = useState({});
  useEffect(() => {

    async function getTask(id) {
      try {
        const {data} = await axios.get(`http://localhost:3001/tasks/${id}`);

        console.log(data);
        
        setTask(data);

      } catch (error) {
        console.log(error)
      }
    }

    getTask(idpar.id);
  }, []);

  return(

    <div>
      <h1>{task.entry}</h1>
      <p>{task.body}</p>
    </div>
  ) 
}

export default Show;
