import React from "react";
import ToDo from "./components/ToDo";

import * as styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.container}>
      <h1>ToDo List</h1>

      <ToDo />
    </div>
  );
};

export default App;
