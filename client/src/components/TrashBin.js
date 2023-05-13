import React from 'react'
import { Link } from 'react-router-dom';

export default function TrashBin({ tasks, user, handleClick, open, closeIcon, onClose }) {
  if (!open) return null;

  return (
    <div className="trashOverlay" onClick={onClose}>
      <div className="trashModalContainer">
        <button className="trashClose close " onClick={onClose}>
          x
        </button>
        <div className="section">
          {/* <div className="list"> */}
          <div className="listTitle">
            <h2>Archive</h2>
          </div>

          {tasks["ARCHIVE"]
            ? tasks["ARCHIVE"].map((task, id) => {
                if (task.user === user.email) {
                  return (
                    <div className="task" key={id}>
                      <Link to={`/${task._id}`}>{task.entry}</Link>
                      
                        <button
                        className='singleBtn'
                          onClick={() => {
                            handleClick(task.prevStatus, task._id);
                          }}
                        >
                          Restore
                        </button>
                        {/* <button
                        onClick={() => {
                            handleClick("TO-DO", task._id);
                        }}
                        >
                        To-Do
                        </button> */}
                      
                    </div>
                  );
                }
              })
            : "No archived tasks"}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
