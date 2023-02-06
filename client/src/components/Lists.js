
import React from "react";
import { Link } from "react-router-dom";



export default function Lists({ tasks, handleClick, plusIcon, setIsOpen }) {
  // if (tasks) {
  //   const lists = document.querySelectorAll(".list");
  //   Object.keys(lists).forEach(function (i) {
  //     lists[i].addEventListener("click", (evt) => {
  //       // evt.preventDefault()
  //       console.log(evt.props);
  //     });
  //   });
  // }

  return (
    <div className="container">
      <div className="section">
        <div className="list">
          <h2>To-Do</h2>

          {tasks["TO-DO"]
            ? tasks["TO-DO"].map((task, id) => {
                return (
                  <div className="task" key={id}>
                    <Link to={`/${task._id}`}>{task.entry}</Link>

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
                          handleClick("COMPLETED", task._id);
                        }}
                      >
                        Completed
                      </button>
                    </div>
                  </div>
                );
              })
            : ""}
          <div className="addButton">
            <button id="to-do" onClick={() => setIsOpen(true)}>
              {plusIcon} Add New Task
            </button>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="list">
          <h2>Pending</h2>
          {tasks["PENDING"]
            ? tasks["PENDING"].map((task, id) => {
                // console.log(task.status)
                return (
                  <div className="task" key={id}>
                    <Link to={`/${task._id}`}>{task.entry}</Link>
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
              })
            : ""}
          <div className="addButton">
            <button id="pending" onClick={() => setIsOpen(true)}>
              {plusIcon} Add New Task
            </button>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="list">
          <h2>Completed</h2>
          {tasks["COMPLETED"]
            ? tasks["COMPLETED"].map((task, id) => {
                return (
                  <div className="task" key={id}>
                    <Link to={`/${task._id}`}>{task.entry}</Link>
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
              })
            : ""}
          <div className="addButton">
            <button id="completed" onClick={() => setIsOpen(true)}>
              {plusIcon} Add New Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
