import React from 'react'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddTaskForm({entry, body, statusRef, handleSubmit}) {





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
          <FontAwesomeIcon icon={faPlus} /> &nbsp; Add
        </button>
      </form>
    </div>
  );
}
