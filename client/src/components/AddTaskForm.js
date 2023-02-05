import React from 'react'


export default function AddTaskForm({entry, body, statusRef, handleSubmit, plusIcon}) {
  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Entry: <input type="text" ref={entry} />
        </label>
        <label>
          Body: <textarea type="text" ref={body} />
        </label>
        <label>
          Status:
          <select ref={statusRef}>
            <option value="to-do">To-Do</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <button type="submit" className="submit">
          {plusIcon} &nbsp; Add
        </button>
      </form>
    </div>
  );
}
