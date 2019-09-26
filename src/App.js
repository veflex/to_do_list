import React from "react";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <section className="columns tasks">
        <header>
          <h2>Todos</h2>
        </header>
        <body></body>
      </section>
      <section className="columns progress">
        <header>
          <h2>In progress</h2>
        </header>
        <body></body>
      </section>
      <section className="columns done">
        <header>
          <h2>Done</h2>
        </header>
        <body></body>
      </section>
    </div>
  );
}

export default App;
