import React from "react";
import moment from "moment";




export default function AddTaskForm({open, entry, body, handleSubmit, handleUpdate, onClose, plusIcon, task}) {

    if(!open) return null


     if(task._id){  
          let lastUpdate = moment(task.updatedAt).fromNow();
        return(
          <div className="editOverlay" onClick={onClose}>
            <div className="modalContainer">
              <div className="showHeader">
              <button className="close editClose" onClick={onClose}>
                 x
              </button>
                  <form className="form" onSubmit={(evt)=>{handleUpdate(evt, task._id)}}>
                    <input className="listTitle" type="text" ref={entry} placeholder="Enter title"  defaultValue = {task.entry}/>
                  </form>
                  <div className="secondaryInfo">
                    <p className="taskStatus">
                      In {task.status.charAt(0).toUpperCase() + task.status.slice(1).toLowerCase()}{" "}list
                    </p>

                    <p className="date">Updated: {lastUpdate} </p>
                  </div>
               </div>
               <div className="showInfo">
                  <h3>Instructions:</h3>
                  <form className="form" onSubmit={(evt)=>{handleUpdate(evt, task._id)}}>
                    <textarea className="emptyInstructions" type="text" ref={body}      placeholder="Enter detailed information or hints here" defaultValue = {task.body}/>
                  <button  type="submit" className="button">
                    Update
                  </button>
              </form>
              </div>
              <div className="pseudo"></div>
            </div>
          </div>
        )

     } else{

      return (
        <div className="overlay" onClick={onClose}>
          <div className="modalContainer">
            <button className="close" onClick={onClose}>
              x
            </button>
            <form className="form" onSubmit={handleSubmit}>
              <input type="text" ref={entry} placeholder="Enter title" />

              <textarea
                type="text"
                ref={body}
                placeholder="Enter detailed information or hints here"
              />

              <button type="submit" className="button">
                {plusIcon}
              </button>
            </form>
          </div>
        </div>
      );
    }
}
