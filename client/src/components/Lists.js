
import React from "react";
import { Link } from "react-router-dom";




export default function Lists({ emptyData, tasks, handleClick, setIsOpen, setTask, checkListIcon }) {
    return (
      
<>
      {!emptyData?
      
   
    <div className="container">
      <div className="section">
          <div className="listTitle">
             
              <div className="pseudo"></div>{//Pseudo element for aligning items to the very left and even center
              }
            <h2>To-Do</h2>

              <button className="titleBtn" id="to-do" onClick={() =>  {setTask({}); setIsOpen(true)}}>
              +
              </button>
             

          </div>
        <div className="list">

          {tasks["TO-DO"]
            ? tasks["TO-DO"].map((task, id) => {
              // if (task.user === user.email){
                return (
                  <div className="task" key={id}>
                     <Link to={`/${task._id}`}>
                      {task.body.length > 0 && <span>{checkListIcon} </span>} {task.entry[0].toUpperCase() + task.entry.slice(1).toLowerCase()}
                   </Link> 
                    <div className="moveBtn">
                      <button
                        onClick={() => {
                          handleClick("COMPLETED", task._id);
                        }}
                      >
                        Completed
                      </button>
                      
                      <button
                        onClick={() => {
                          handleClick("PENDING", task._id);
                        }}
                      >
                        Pending
                      </button>

                    </div>
                  </div>
                );
              // }
            })
            : "No Tasks"}
        </div>
      </div>

      <div className="section">
          <div className="listTitle">
            <div className="pseudo"></div>{//Pseudo element for aligning items to the very left and even center
              }
            <h2>Pending</h2>
            <button className="titleBtn" id="pending"  onClick={() =>  {setTask({}); setIsOpen(true)}}>
             +
            </button>
          </div>
        <div className="list">

          {tasks["PENDING"]
            ? tasks["PENDING"].map((task, id) => {
              // if (task.user === user.email){
                return (
                  <div className="task" key={id}>
                     <Link to={`/${task._id}`}>
                      {task.body.length > 0 && <span>{checkListIcon} </span>} {task.entry[0].toUpperCase() + task.entry.slice(1).toLowerCase()}
                    </Link>
                    <div className="moveBtn">
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
              // }
              })
            : "No Tasks"}
        </div>
      </div>

      <div className="section">
          <div className="listTitle">
            <div className="pseudo"></div>{//Pseudo element for aligning items to the very left and even center
              }
            <h2>Completed</h2>
            <button className="titleBtn" id="completed" onClick={() =>  {setTask({}); setIsOpen(true)}}>
             +
            </button>
          </div>
        <div className="list">

          {tasks["COMPLETED"]
            ? tasks["COMPLETED"].map((task, id) => {
                return (
                  <div className="task" key={id}>
                    <Link to={`/${task._id}`}>
                      {task.body.length > 0 && <span>{checkListIcon} </span>} {task.entry[0].toUpperCase() + task.entry.slice(1).toLowerCase()}
                    </Link>

                    <div className="moveBtn">
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
              // }
              })
            : "No Tasks"}
        </div>
      </div>
    </div>
        : 
     <div className="container">
      <div className="section">
          <div className="listTitle">
             
              <div className="pseudo"></div>{//Pseudo element for aligning items to the very left and even center
              }
            <h2>To-Do</h2>

            <button className="pseudo titleBtn" id="pending"  onClick={() =>  {setTask({}); setIsOpen(true)}}>
              +
            </button>
             

          </div>
        <div className="list">
         Loading...
        </div>
      </div>

      <div className="section">
          <div className="listTitle">
            <div className="pseudo"></div>{//Pseudo element for aligning items to the very left and even center
              }
            <h2>Pending</h2>
            <button className="pseudo titleBtn" id="pending"  onClick={() =>  {setTask({}); setIsOpen(true)}}>
              +
            </button>
          </div>
        <div className="list">

         Loading...
        </div>
      </div>

      <div className="section">
          <div className="listTitle">
            <div className="pseudo"></div>{//Pseudo element for aligning items to the very left and even center
              }
            <h2>Completed</h2>
            <button className="pseudo titleBtn" id="pending"  onClick={() =>  {setTask({}); setIsOpen(true)}}>
              +
            </button>
          </div>
        <div className="list">
             Loading...
        </div>
      </div>
    </div>
}
    </>
    )
    
            
  
  
}



