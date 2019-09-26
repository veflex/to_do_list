import React, { useState, useEffect } from "react";
import "./home.scss";

export default () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isInputShowing, setisInputShowing] = useState(false);
  const addTask = newTask => {
    setTasks(prevTasks => {
      return [...prevTasks, task];
    });
  };
  const showAddInput = () => {
    setisInputShowing(true);
  };

  useEffect(() => {
    const arr = ["yo", "ui", "ménan"];
    setTasks(prevTasks => {
      return [...prevTasks, ...arr];
    });
  }, []);
  return (
    <>
      <section className="columns tasks">
        <header>
          <h2>Todos</h2>
        </header>
        <div className="body">
          {isInputShowing ? (
            <div className="add">
              <input
                type="text"
                onChange={e => {
                  setTask(e.target.value);
                }}
              />
              <button onClick={addTask}>Add Task</button>
            </div>
          ) : (
            <div className="add" onClick={showAddInput}>
              <i className="fas fa-plus-circle"></i>
              <span>Add a task</span>
            </div>
          )}
          {tasks ? (
            tasks.map((elem, i) => {
              return <h1 key={i}>{elem}</h1>;
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
        <div className="body"></div>
      </section>
      <section className="columns done">
        <header>
          <h2>Done</h2>
        </header>
        <div className="body"></div>
      </section>
    </>
  );
};
