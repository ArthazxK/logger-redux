import React, { useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { addTech } from "../../store/techs";
import { useDispatch } from "react-redux";

const AddTechModal = () => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmit = () => {
    if (firstName === "" || lastName === "")
      return M.toast({ html: "Please enter firts and last name" });

    const tech = {
      firstName,
      lastName,
    };

    dispatch(addTech(tech));
    M.toast({ html: "Tech added to the list." });

    setFirstName("");
    setLastName("");
  };

  return (
    <div id="add-tech-modal" className="modal">
      <div className="modal-content">
        <h4>New Technician</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="firstName" className="active">
              First Name
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="lastName" className="active">
              Last Name
            </label>
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

export default AddTechModal;
