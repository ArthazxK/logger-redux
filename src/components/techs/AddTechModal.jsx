import React from "react";
import Joi from "joi-browser";
import { addTech } from "../../store/techs";
import { useDispatch } from "react-redux";
import { validate } from "../../utils/validation";
import useForm from "../common/useForm";

const AddTechModal = () => {
  const dispatch = useDispatch();

  const schema = {
    username: Joi.string().email().min(5).max(30).required().label("Username"),
    password: Joi.string().min(5).max(30).required().label("Password"),
    name: Joi.string().min(5).max(30).required().label("Name"),
  };

  const { data, handleSubmit, handleChange, errors } = useForm({
    initialData: {
      username: "",
      password: "",
      name: "",
    },
    onSubmit(data) {
      dispatch(addTech(data));
    },
    schema,
  });

  const { username, password, name } = data;

  return (
    <div id="add-tech-modal" className="modal">
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
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
            <label htmlFor="name" className="active">
              Name
            </label>
            {errors && errors.name && <div>{errors.name}</div>}
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

export default AddTechModal;
