import React, { useState, useEffect } from "react";
import TechItem from "./TechItem";
import { useDispatch, useSelector } from "react-redux";
import { getTechs, selectTechs } from "../../store/techs";
import Preloader from "../layout/Preloader";

const TechListModal = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectTechs);
  const { loading, list: techs } = data;

  useEffect(() => {
    dispatch(getTechs());
  }, []);

  return (
    <div id="tech-list-modal" className="modal">
      <div className="modal-content">
        <h4>Technician List</h4>
        <ul className="collection">
          {!loading &&
            techs.map((tech) => <TechItem key={tech.id} tech={tech} />)}
        </ul>
      </div>
    </div>
  );
};

export default TechListModal;
