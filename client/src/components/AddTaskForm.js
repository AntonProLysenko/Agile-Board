import React from 'react'


export default function AddTaskForm({open, entry, body, statusRef, handleSubmit, onClose, plusIcon, closeIcon, listStatus}) {
    if(!open) return null
  console.log(listStatus)
  return (
    <div className="overlay">
      <div className="formContainer">
        <button className="close" onClick={onClose}>
          {closeIcon}
        </button>
        <form className="form" onSubmit={handleSubmit}>
          <input type="text" ref={entry} placeholder="Enter title" />

          <textarea
            type="text"
            ref={body}
            placeholder="Enter detailed information or hints here"
          />

          <label>
            Status:
            <select ref={statusRef}>
              <option defaultValue={listStatus}>
                {listStatus}
              </option>
              <option value="to-do">To-Do</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          <button type="submit" className="button">
            {plusIcon} &nbsp; Add
          </button>
        </form>
      </div>
    </div>
  );
}
