import React from "react";
import "./task.scss";

const task = props => {
  const { task, button1, button2 } = props;
  console.log(task, button1, button2);
  return (
    <div className="task">
      <div className="p-container">
        <p>{task.task}</p>
      </div>
      <div className="buttons">
        <button onClick={button1.action}>{button1.name}</button>
        <button onClick={button2.action}>{button2.name}</button>
      </div>
    </div>
  );
};

export default task;
