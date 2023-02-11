import React from 'react'


export default function AddTaskForm({open, entry, body, handleSubmit, onClose, plusIcon, task}) {
    if(!open) return null


     if(task._id){
     
     console.log(task.entry);
      
        return(
          <div className="overlay">
        <div className="modalContainer">
          <button className="close" onClick={onClose}>
            x
          </button>
          <form className="form" onSubmit={handleSubmit}>
            <input type="text" ref={entry} placeholder="Enter title"  defaultValue = {task.entry}/>

            <textarea type="text" ref={body}      placeholder="Enter detailed information or hints here" defaultValue = {task.body}/>

            <button type="submit" className="button">
              Update
            </button>
          </form>
        </div>
      </div>
        )
     } else{
      return (
          <div className="overlay">
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
