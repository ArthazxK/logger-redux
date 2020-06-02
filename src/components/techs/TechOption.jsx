import React from "react";
import { useSelector } from "react-redux";
import { selectTechsList } from "../../store/techs";

const TechOption = () => {
  const techs = useSelector(selectTechsList);

  return techs.map((tech) => (
    <option key={tech._id} value={tech._id}>
      {tech.name}
    </option>
  ));
};

export default TechOption;
