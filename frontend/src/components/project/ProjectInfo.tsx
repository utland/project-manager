import React, { useState } from 'react';
import "../../styles/Project.scss";
import { useSelector } from 'react-redux';
import { IRootState } from '../../interfaces/reduxDefault';
import UserCard from './UserCard';

const ProjectInfo: React.FC = () => {
    const { project} = useSelector((state: IRootState) => state.project);

    return (
      <div className="project-info">
        <div>Key: {project.id}</div>
        <div className="project-text">Name: {project.name}</div>
        <div className="project-text">Description: {project.description}</div>
        Users:
        <div className="user-list">
          {project.users.map(item => 
          (<UserCard userCard={item}/>))}
        </div>
      </div>
    );
};

export default ProjectInfo;