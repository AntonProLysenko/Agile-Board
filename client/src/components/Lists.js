import React from "react";

import { Link } from "react-router-dom";

export default function Lists({ tasks, handleClick }) {
  return (
    <div className="container">
      <div id="to-do" className="section">
        <div className="list">
          <h2>To-Do</h2>
          {tasks["TO-DO"]
            ? tasks["TO-DO"].map((task) => {
                return (
                  <div className="task">
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
        </div>
      </div>
      <div id="pending" className="section">
        <div className="list">
          <h2>Pending</h2>
          {tasks["PENDING"]
            ? tasks["PENDING"].map((task) => {
                return (
                  <div className="task">
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
      <div id="completed" className="section">
        <div className="list">
          <h2>Completed</h2>
          {tasks["COMPLETED"]
            ? tasks["COMPLETED"].map((task) => {
                return (
                  <div className="task">
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
