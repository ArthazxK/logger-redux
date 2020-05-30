import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logSearched } from "../../store/logs";

export const SeachBar = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleInputChange = async ({ target: { value } }) => {
    await setInput(value);
    dispatch(logSearched(value));
  };

  return (
    <nav style={{ marginBottom: "30px" }} className="blue">
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input
              id="search"
              type="search"
              value={input}
              onChange={handleInputChange}
              placeholder="Search..."
              required
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};
