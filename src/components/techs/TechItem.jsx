import React from "react";
import { useDispatch } from "react-redux";
import { deleteTech } from "../../store/techs";
import M from "materialize-css/dist/js/materialize.min.js";

const TechItem = ({ tech }) => {
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(deleteTech(tech.id));
    M.toast({ html: "Tech deleted." });
  };
  return (
    <li className="collection-item">
      <div>
        {tech.firstName} {tech.lastName}
        <a href="#!" className="secondary-content">
          {" "}
          <i onClick={onDelete} className="material-icons grey-text">
            delete
          </i>
        </a>
      </div>
    </li>
  );
};

export default TechItem;
