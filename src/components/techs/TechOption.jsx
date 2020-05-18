import React from "react";
import { useSelector } from "react-redux";
import { selectTechsList } from "../../store/techs";

const TechOption = () => {
  const techs = useSelector(selectTechsList);
  return techs.map((tech) => (
    <option key={tech.id} value={`${tech.firstName} ${tech.lastName}`}>
      {tech.firstName} {tech.lastName}
    </option>
  ));
};

export default TechOption;
