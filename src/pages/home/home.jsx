import React, { useState, useEffect } from "react";
import "./home.scss";

export default () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [isInputShowing, setisInputShowing] = useState(false);
  const addTask = () => {
    setTasks(prevTasks => {
      return [...prevTasks, { task, status: "todo" }];
    });
    setTask("");
  };
  const showAddInput = () => {
    return setisInputShowing(true);
  };

  const putTaskInProgress = task => {
    task.status = "progress";
    setCurrentTask(task);
    return;
  };
  const putTaskInDone = task => {
    console.log("done", task);
    task.status = "done";
    setCurrentTask("");
    return;
  };

  useEffect(() => {
    console.log("useeffet");
  }, [tasks]);

  return (
    <>
      <section className="columns tasks">
        <header>
          <h2>Todos</h2>
        </header>
        <div className="body">
          {isInputShowing ? (
            <div className="add add-second-step">
              <input
                type="text"
                placeholder="Title of the task"
                value={task}
                onChange={e => {
                  setTask(e.target.value);
                }}
              />
              <button onClick={addTask}>Add Task</button>
            </div>
          ) : (
            <div className="add add-first-step" onClick={showAddInput}>
              <i className="fas fa-plus-circle"></i>
              <span>Add a task</span>
            </div>
          )}
          {tasks ? (
            tasks.map((elem, i) => {
              if (elem.status !== "todo") return "";

              return (
                <div key={"todo" + i} className="task">
                  <div className="p-container">
                    <p>{elem.task}</p>
                  </div>
                  <div className="buttons">
                    <button
                      onClick={() => {
                        putTaskInProgress(elem);
                      }}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => {
                        putTaskInDone(elem);
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </section>
      <section className="columns progress">
        <header>
          <h2>In progress</h2>
        </header>
        <div className="body">
          {tasks ? (
            tasks.map((elem, i) => {
              if (elem.status === "progress") {
                return (
                  <div key={"progress" + i} className="task">
                    <div className="p-container">
                      <p>{elem.task}</p>
                    </div>
                    <div className="buttons">
                      <button
                        onClick={() => {
                          putTaskInDone(elem);
                        }}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                );
              }
              return "";
            })
          ) : (
            <></>
          )}
        </div>
      </section>
      <section className="columns done">
        <header>
          <h2>Done</h2>
        </header>
        <div className="body">
          {tasks ? (
            tasks.map((elem, i) => {
              if (elem.status === "done") {
                return (
                  <div key={"done" + i} className="task">
                    <div className="p-container">
                      <p>{elem.task}</p>
                    </div>
                  </div>
                );
              }
              return "";
            })
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};
