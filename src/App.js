import React, { useEffect } from "react";
import DataUseEffect from "./Data/DataUseEffect";
import { TableReducer } from "./TableReducer/TableReducer";
import ReduxTask from "./reduxTask/ReduxTask";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const data = useSelector((state) => state.todo);
  return (
    <div className="wrapper">
      <TableReducer />
      {/* <ReduxTask /> */}
    </div>
  );
}

export default App;
