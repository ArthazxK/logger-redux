import React, { useState } from "react";
import Joi from "joi-browser";
import M from "materialize-css/dist/js/materialize.min.js";
import { techLoggedIn } from "../../store/techs";
import { useDispatch } from "react-redux";
import { validate, validateProperty } from "../../utils/validation";

const TechLoginModal = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { username, password } = data;

  const schema = {
    username: Joi.string().email().min(5).max(30).required().label("Username"),
    password: Joi.string().min(5).max(30).required().label("Password"),
  };

  const handleChange = ({ target: { name, value } }) => {
    const error = { ...errors };
    const errorMessage = validateProperty(name, value, schema);
    if (errorMessage) error[name] = errorMessage;
    else delete error[name];
    setData({ ...data, [name]: value });
    setErrors(error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = validate(data, schema);

    if (errors !== null) return setErrors(errors);

    dispatch(techLoggedIn(data));

    M.toast({ html: "Logged In" });

    setData({
      username: "",
      password: "",
    });
    setErrors(null);
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
              onChange={handleChange}
            />
            <label htmlFor="username" className="active">
              Username
            </label>
            {errors && errors.username && <div>{errors.username}</div>}
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <label htmlFor="password" className="active">
              Password
            </label>
            {errors && errors.password && <div>{errors.password}</div>}
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button
          onClick={onSubmit}
          className="btn waves-effect waves-light blue modal-close"
          type="submit"
          name="action"
          disabled={validate(data, schema)}
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
      </div>
    </div>
  );
};

export default TechLoginModal;
