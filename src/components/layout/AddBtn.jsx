import React from "react";
import { useDispatch } from "react-redux";
import { getCurrentTech, techLoggedOut } from "../../store/techs";

const AddBtn = () => {
  const dispatch = useDispatch();

  const currentTech = getCurrentTech();

  const handleLogOut = () => {
    dispatch(techLoggedOut());
    window.location = "/";
  };

  return (
    <div className="fixed-action-btn">
      <a
        href="#add-log-modal"
        className="btn-floating btn-large blue dark-2 modal-trigger tooltipped"
        data-position="left"
        data-tooltip="Add Log"
      >
        <i className="large material-icons">add</i>
      </a>
      <ul>
        <li>
          <a
            href="#tech-list-modal"
            className="btn-floating green modal-trigger tooltipped"
            data-position="left"
            data-tooltip="Tech List"
          >
            <i className="material-icons">person</i>
          </a>
        </li>

        {currentTech && currentTech.isAdmin && (
          <li>
            <a
              href="#add-tech-modal"
              className="btn-floating orange modal-trigger tooltipped"
              data-position="left"
              data-tooltip="Add Tech"
            >
              <i className="material-icons">person_add</i>
            </a>
          </li>
        )}

        <li>
          <a
            href="#!"
            className="btn-floating red tooltipped"
            data-position="left"
            data-tooltip="Log Out"
            onClick={handleLogOut}
          >
            <i className="material-icons">exit_to_app</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AddBtn;
