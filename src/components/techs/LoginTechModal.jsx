import React from "react";
import useForm from "../common/useForm";
import { useDispatch } from "react-redux";
import Joi from "joi-browser";
import { loggingTech } from "../../store/techs";
import { validate } from "../../utils/validation";

const LoginTechModal = () => {
  const dispatch = useDispatch();
  const schema = {
    username: Joi.string().email().min(5).max(30).required().label("Username"),
    password: Joi.string().min(5).max(30).required().label("Password"),
  };
  const { data, handleChange, handleSubmit, errors } = useForm({
    initialData: {
      username: "",
      password: "",
    },
    onSubmit(data) {
      dispatch(loggingTech(data));
    },
    schema,
  });

  const { username, password } = data;

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
          onClick={handleSubmit}
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

export default LoginTechModal;
