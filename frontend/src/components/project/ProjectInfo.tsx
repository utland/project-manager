import React, { useState } from 'react';
import "../../styles/Project.scss";
import { useSelector } from 'react-redux';
import { IRootState } from '../../interfaces/reduxDefault';
import UserCard from './UserCard';

const ProjectInfo: React.FC = () => {
    const { project} = useSelector((state: IRootState) => state.project);

    return (
      <div className="project-info">
        <div>{project.id}</div>
        <div className="project-text">{project.name}</div>
        <div className="project-text">{project.description}</div>
        Users:
        <div className="user-list">
          {project.users.map(item => 
          (<UserCard userCard={item}/>))}
        </div>
      </div>
    );
};

export default ProjectInfo;