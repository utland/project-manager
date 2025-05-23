import "../../styles/Project.scss";
import { useSelector } from 'react-redux';
import { IRootState } from '../../interfaces/reduxDefault';
import UserCard from './UserCard';
import BarProgress from './BarProgress';

function ProjectInfo() {
    const { project} = useSelector((state: IRootState) => state.project);

    return (
      <div className="project-info">
        <BarProgress project={project}/>
        <div>Key: {project.id}</div>
        <div className="project-text">Name: {project.name}</div>
        <div className="project-text">Description: {project.description}</div>
        <p>Users:</p>
        <div className="user-list">
          {project.users.map(item => 
          (<UserCard userCard={item}/>))}
        </div>
      </div>
    );
};

export default ProjectInfo;