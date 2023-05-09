import React from "react";
import { useNavigate } from "react-router-dom";



export default function AddTaskForm({open, entry, body, handleSubmit, handleUpdate, onClose, plusIcon, task}) {
  const navigation = useNavigate()
    if(!open) return null


     if(task._id){  
        return(
          <div className="editOverlay" onClick={onClose}>
            <div className="modalContainer">
              <button className="close editClose" onClick={onClose}>
                 x
              </button>
              <form className="form" onSubmit={(evt)=>{handleUpdate(evt, task._id)}}>
                <input type="text" ref={entry} placeholder="Enter title"  defaultValue = {task.entry}/>
                <textarea type="text" ref={body}      placeholder="Enter detailed information or hints here" defaultValue = {task.body}/>
                <button  type="submit" className="button">
                  Update
                </button>
              </form>
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
