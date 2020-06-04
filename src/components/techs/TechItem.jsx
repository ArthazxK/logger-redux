import React from "react";
import { useDispatch } from "react-redux";
import { deleteTech } from "../../store/techs";
import { getCurrentTech } from "../../store/techs.js";

const TechItem = ({ tech }) => {
  const dispatch = useDispatch();

  const currentTech = getCurrentTech();
  const onDelete = () => {
    dispatch(deleteTech(tech._id));
  };
  return (
    <li className="collection-item">
      <div>
        {tech.name}
        {currentTech && currentTech.isAdmin && (
          <a href="#!" className="secondary-content">
            {" "}
            <i onClick={onDelete} className="material-icons grey-text">
              delete
            </i>
          </a>
        )}
      </div>
    </li>
  );
};

export default TechItem;
