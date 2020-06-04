import React from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteLog, currentAdded } from "../../store/logs";
import { selectCurrentTech } from "../../store/techs.js";

const LogItem = ({ log }) => {
  const dispatch = useDispatch();
  const currentTech = useSelector(selectCurrentTech);

  const onDelete = () => {
    const x = dispatch(deleteLog(log._id));
  };
  const addCurrent = () => dispatch(currentAdded(log));
  return (
    <li className="collection-item">
      <div>
        {currentTech ? (
          <a
            onClick={addCurrent}
            href="#edit-log-modal"
            className={`modal-trigger ${
              log.attention ? "red-text" : "blue-text"
            }`}
          >
            {log.message}
          </a>
        ) : (
          log.message
        )}
        <br />
        <span className="grey-text">
          <span className="black-text">ID #{log._id}</span> last updated by{" "}
          <span className="black-text">{log.tech.name}</span> on{" "}
          <Moment format="MMMM Do YYYY, h:mm:ss a">{log.date}</Moment>
        </span>
        {currentTech && (
          <a href="#!" className="secondary-content">
            <i className="material-icons grey-text" onClick={onDelete}>
              delete
            </i>
          </a>
        )}
      </div>
    </li>
  );
};

export default LogItem;
