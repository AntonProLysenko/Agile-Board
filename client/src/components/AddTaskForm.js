import React from 'react'


export default function AddTaskForm({open, entry, body, statusRef, handleSubmit, onClose, plusIcon, closeIcon, listStatus}) {
    if(!open) return null

  return (
    <div className="overlay">
      <div className="moduleContainer">
        <button className="close" onClick={onClose}>
          x
        </button>
        <form className="form" onSubmit={handleSubmit}>
          <input type="text" ref={entry} placeholder="Enter title" />

          <textarea type="text" ref={body} placeholder="Enter detailed information or hints here"/>

          <button type="submit" className="button">
            {plusIcon}
          </button>

        </form>
      </div>
    </div>
  );
}
