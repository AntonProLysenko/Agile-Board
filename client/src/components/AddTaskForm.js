import React from "react";
import moment from "moment";




export default function AddTaskForm({open, entry, body, handleSubmit, handleUpdate, onClose, setIsOpen, plusIcon, task}) {

    if(!open) return null


     if(task._id){  
{console.log(task.body)}
          let lastUpdate = moment(task.updatedAt).fromNow();
          let arrBody
    if(task.body){
       arrBody = task.body.split(".");
    }
        return (
          <div className="editOverlay" onClick={onClose}>
            <div className="modalContainer editModal">
              <div className="showHeader">
                <button className="close editClose" onClick={onClose}>
                  {" "}
                  x{" "}
                </button>
                <form
                  className="form showHeader"
                  onSubmit={(evt) => {
                    handleUpdate(evt, task._id);
                  }}
                >
                  <input
                    className="listTitle"
                    type="text"
                    ref={entry}
                    placeholder="Enter title"
                    defaultValue={task.entry}
                  />
                  <div className="secondaryInfo">
                    <p className="taskStatus">
                      In{" "}
                      {task.status.charAt(0).toUpperCase() +
                        task.status.slice(1).toLowerCase()}{" "}
                      list
                    </p>

                    <p className="date">Updated: {lastUpdate} </p>
                  </div>
                </form>
              </div>
              <div className="showInfo">
                <form
                  className="form showInfo"
                  onSubmit={(evt) => {
                    handleUpdate(evt, task._id);
                  }}
                >
                  <h3>Instructions:</h3>

                  <textarea className="emptyInstructions" type="text" ref={body} placeholder="Enter detailed information or hints here" defaultValue = {task.body}/>

                  <div className="moveBtn">
                    <button type="submit" className="button">
                      Update
                    </button>
                    <button
                      className="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
              <div className="pseudo"></div>
            </div>
          </div>
        );

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
