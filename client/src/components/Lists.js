
import React from "react";
import { Link } from "react-router-dom";




export default function Lists({ tasks, handleClick, setIsOpen }) {



  return (
    <div className="container">
      <div className="section">
        <div className="list">
          <div className="listTitle">
            <h2>To-Do</h2>

              <button className="titleBtn" id="to-do" onClick={() => setIsOpen(true)}>
              +
              </button>

          </div>

          {tasks["TO-DO"]
            ? tasks["TO-DO"].map((task, id) => {
                return (
                  <div className="task" key={id}>
                    <Link to={`/${task._id}`}>{task.entry}</Link>

                    <div className="moveBtn">
                      <button
                        onClick={() => {
                          handleClick("COMPLETED", task._id);
                        }}
                      >
                        Completed
                      </button>
                      
                      <button
                        onClick={() => {
                          handleClick("PENDING", task._id);
                        }}
                      >
                        Pending
                      </button>

                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>

      <div className="section">
        <div className="list">
          <div className="listTitle">
            <h2>Pending</h2>
            <button className="titleBtn" id="pending" onClick={() => setIsOpen(true)}>
             +
            </button>
          </div>

          {tasks["PENDING"]
            ? tasks["PENDING"].map((task, id) => {
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
        </div>
      </div>

      <div className="section">
        <div className="list">
          <div className="listTitle">
            <h2>Completed</h2>
            <button className="titleBtn" id="completed" onClick={() => setIsOpen(true)}>
             +
            </button>
          </div>

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
        </div>
      </div>
    </div>
  );
}
