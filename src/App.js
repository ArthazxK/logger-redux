import React, { useEffect, Fragment, useState } from "react";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";

import { getCurrentTech, currentTechAdded } from "./store/techs";

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

import configureStore from "./store/configureStore";
import LoginTechModal from "./components/techs/LoginTechModal";
import TechRegisterModal from "./components/techs/TechRegisterModal";

const App = () => {
  const store = configureStore();

  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
    const currentTech = getCurrentTech();
    store.dispatch(currentTechAdded(currentTech));
  }, []);

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
          <LoginTechModal />
          <TechRegisterModal />
          <TechListModal />
          <Logs />
        </div>
      </Fragment>
    </Provider>
  );
};

export default App;
