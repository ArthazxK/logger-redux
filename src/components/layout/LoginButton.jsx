import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentTech } from "../../store/techs";

const LoginButton = () => {
  const currentTech = useSelector(selectCurrentTech);

  return (
    !currentTech && (
      <div className="fixed-action-btn">
        <a
          href="#login-tech-modal"
          className="btn-floating btn-large blue dark-2 modal-trigger tooltipped"
          data-position="left"
          data-tooltip="login"
        >
          <i className="large material-icons">login</i>
        </a>
        <ul>
          <li>
            <a
              href="#register-tech-modal"
              className="btn-floating red modal-trigger tooltipped"
              data-position="left"
              data-tooltip="Register"
            >
              <i className="material-icons">person_add</i>
            </a>
          </li>
        </ul>
      </div>
    )
  );
};

export default LoginButton;
