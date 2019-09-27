import React, { useState } from "react";
import "./home.scss";

export default () => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [dones, setDones] = useState([]);
  const [task, setTask] = useState("");
  const [isInputShowing, setisInputShowing] = useState(false);
  const addNewTask = () => {
    console.log(task);
    addTask({ task, status: "todo" }, setTodos);
    setTask("");
  };
  const showAddInput = () => {
    return setisInputShowing(true);
  };

  const changeTaskStatus = (task, newStatus) => {
    removeTaskFromCurrentState(task);
    addTaskToNewState(task, newStatus);
  };

  const removeTaskFromCurrentState = task => {
    const status = task.status;
    if (status === "todo") removeTask(task, todos, setTodos);
    else if (status === "inProgress")
      removeTask(task, inProgress, setInProgress);
    else if (status === "done") removeTask(task, dones, setDones);
    else return "mauvais status";
  };

  const removeTask = (task, arr, setState) => {
    const index = arr.indexOf(task);
    const newArr = [...arr];
    newArr.splice(index, 1);
    setState(() => {
      return [...newArr];
    });
  };

  const addTaskToNewState = (task, newStatus) => {
    task.status = newStatus;
    if (newStatus === "todo") addTask(task, setTodos);
    else if (newStatus === "inProgress") addTask(task, setInProgress);
    else if (newStatus === "done") addTask(task, setDones);
    else return "mauvais newStatus";
  };

  const addTask = (task, setState) => {
    setState(prevTasks => {
      return [...prevTasks, task];
    });
  };

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
              <button onClick={addNewTask}>Add Task</button>
            </div>
          ) : (
            <div className="add add-first-step" onClick={showAddInput}>
              <i className="fas fa-plus-circle"></i>
              <span>Add a task</span>
            </div>
          )}
          {todos ? (
            todos.map((task, i) => {
              return (
                <div key={"todo" + i} className="task">
                  <div className="p-container">
                    <p>{task.task}</p>
                  </div>
                  <div className="buttons">
                    <button
                      onClick={() => {
                        changeTaskStatus(task, "inProgress");
                      }}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => {
                        changeTaskStatus(task, "done");
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
          {inProgress ? (
            inProgress.map((task, i) => {
              return (
                <div key={"progress" + i} className="task">
                  <div className="p-container">
                    <p>{task.task}</p>
                  </div>
                  <div className="buttons">
                    <button
                      onClick={() => {
                        changeTaskStatus(task, "done");
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
      <section className="columns done">
        <header>
          <h2>Done</h2>
        </header>
        <div className="body">
          {dones ? (
            dones.map((task, i) => {
              return (
                <div key={"done" + i} className="task">
                  <div className="p-container">
                    <p>{task.task}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};
