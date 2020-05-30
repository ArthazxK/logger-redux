import React, { useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { techLoggedIn } from "../../store/techs";
import { useDispatch } from "react-redux";

const TechLoginModal = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    if (username === "" || password === "")
      return M.toast({ html: "Please enter username and password" });

    const tech = {
      username,
      password,
    };
    dispatch(techLoggedIn(tech));

    M.toast({ html: "Tech added to the list." });

    setUsername("");
    setPassword("");
  };

  return (
    <div id="login-tech-modal" className="modal">
      <div className="modal-content">
        <h4>Login</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username" className="active">
              Username
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password" className="active">
              Password
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

export default TechLoginModal;
