import React from "react";
import { useSelector } from "react-redux";
import { selectTechsList } from "../../store/techs";

const TechOption = () => {
  const techs = useSelector(selectTechsList);
  console.log(techs);
  return techs.map((tech) => (
    <option key={tech._id} value={`${tech.name}`}>
      {tech.name}
    </option>
  ));
};

export default TechOption;
