import React, { useEffect, Fragment } from "react";
import { Provider } from "react-redux";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";

import SeachBar from "./components/layout/SeachBar";
import Logs from "./components/logs/Logs";
import AddBtn from "./components/layout/AddBtn";
import AddLogModal from "./components/logs/AddLogModal";
import EditLogModal from "./components/logs/EditLogModal";
import AddTechModal from "./components/techs/AddTechModal";
import TechListModal from "./components/techs/TechListModal";
import LoginButton from "./components/layout/LoginButton";
import TechLoginModal from "./components/techs/TechLoginModal";

import configureStore from "./store/configureStore";

const App = () => {
  const store = configureStore();

  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });
  return (
    <Provider store={store}>
      <Fragment>
        <SeachBar />
        <div className="container">
          <AddBtn />
          <LoginButton />
          <AddLogModal />
          <EditLogModal />
          <AddTechModal />
          <TechLoginModal />
          <TechListModal />
          <Logs />
        </div>
      </Fragment>
    </Provider>
  );
};

export default App;
