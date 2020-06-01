import React, { useState, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrent, editLog } from "../../store/logs";
import TechOption from "../techs/TechOption";

const EditLogModal = () => {
  const current = useSelector(selectCurrent);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!current) return;
    setMessage(current.message);
    setAttention(current.attention);
    setTech(current.tech);
  }, [current]);

  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  const onSubmit = () => {
    if (message === "" || tech === "")
      return M.toast({ html: "Please enter a message and tech" });

    const updatedLog = {
      _id: current._id,
      message,
      tech,
      attention,
      date: Date.now(),
    };

    dispatch(editLog(updatedLog));
    M.toast({ html: `Edited by ${tech} ` });

    // Clear fields
    setMessage("");
    setAttention(false);
    setTech("");
  };

  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className="browser-default"
              onChange={(e) => setTech(e.target.value)}
            >
              <option value="" disabled>
                Select Technician
              </option>
              <TechOption />
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={attention}
                  value={attention}
                  onChange={(e) => setAttention(!attention)}
                />
                <span>Need Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect waves-light blue
        btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: "75%",
  height: "75%",
};
export default EditLogModal;
