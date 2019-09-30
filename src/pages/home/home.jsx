import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "./home.scss";

import Column from "./../../components/column/column";
import Task from "./../../components/task/task";

export default () => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [dones, setDones] = useState([]);
  const [inputTask, setInputTask] = useState("");
  const [isInputShowing, setisInputShowing] = useState(false);

  const addNewTask = () => {
    addTask({ task: inputTask, status: "todo" }, setTodos);
    setInputTask("");
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
      <Column header="Todo">
        <div className="body">
          {isInputShowing ? (
            <div className="add add-second-step">
              <input
                type="text"
                placeholder="Title of the task"
                value={inputTask}
                onChange={e => {
                  setInputTask(e.target.value);
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
          <div className="list-container">
            <Scrollbars autoHeight={true} autoHeightMax={`calc(80vh - 67.5px)`}>
              {todos ? (
                todos.map((task, i) => {
                  return (
                    <Task
                      key={"todo" + i}
                      task={task}
                      button1={{
                        name: "In progress",
                        action: () => {
                          changeTaskStatus(task, "inProgress");
                        }
                      }}
                      button2={{
                        name: "Done",
                        action: () => {
                          changeTaskStatus(task, "done");
                        }
                      }}
                    ></Task>
                  );
                })
              ) : (
                <></>
              )}
            </Scrollbars>
          </div>
        </div>
      </Column>
      <Column header="In Progress">
        <div className="body">
          {inProgress ? (
            inProgress.map((task, i) => {
              return (
                <Task
                  task={task}
                  button1={{
                    name: "Todo",
                    action: () => {
                      changeTaskStatus(task, "todo");
                    }
                  }}
                  button2={{
                    name: "Done",
                    action: () => {
                      changeTaskStatus(task, "done");
                    }
                  }}
                ></Task>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </Column>
      <Column header="Done">
        <div className="body">
          {dones ? (
            dones.map((task, i) => {
              return (
                <Task
                  task={task}
                  button1={{
                    name: "Todo",
                    action: () => {
                      changeTaskStatus(task, "todo");
                    }
                  }}
                  button2={{
                    name: "In progress",
                    action: () => {
                      changeTaskStatus(task, "inProgress");
                    }
                  }}
                ></Task>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </Column>
    </>
  );
};
