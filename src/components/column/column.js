import React from "react";
import "./column.scss";

const column = props => {
  return (
    <section className="column">
      <header>
        <h2>{props.header}</h2>
      </header>
      {props.children}
    </section>
  );
};

export default column;
