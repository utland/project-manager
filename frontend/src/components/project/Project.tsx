import { useParams } from "react-router-dom";
import IProject from "../../interfaces/project.model.i";
import "../../styles/Project.scss";
import { useEffect, useState } from "react";
import client from "../../api/client";
import IError from "../../interfaces/error.i";
import IUser from "../../interfaces/user.model.i";
import ModalAction from "./ModalAction";

type idProject = {
    id: string
}

type ProjectProps = {
    user: IUser
}

export type IProjectModal = "add" | "requests" | "info" | null;

function Project({user}: ProjectProps) {
    const { id } = useParams<idProject>();
    const [project, setProject] = useState<IProject>();
    const [modal, setModal] = useState<IProjectModal>(null);

    useEffect(() => {
        const init = async () => {
          client.get(`/project/${id}`)
            .then(res => setProject(res.data))
            .catch((error: IError) => {
                console.log(error);
            })
        }
    
        init();
    }, []);

    return (
        project ? (
        <div className="project-page">
            <ModalAction 
              project={project} 
              onClose={() => setModal(null)}
              setProject={(project: IProject) => setProject(project)} 
              modal={modal}
            />
            <div className="project-actions">
                <button className="add-user" onClick={() => setModal("add")}>+</button>
                {user.id === project.adminId ? <button className="users" onClick={() => setModal("requests")}>0</button> : ""}
                <button className="advanced-info">I</button>
            </div>
            <div className="project-main">
                <div className="project-info">
                    <div className="project-text">{project.name}</div>
                    <div className="project-text">{project.description}</div>
                </div>
                {project.users.map(item => <div>{item.name}</div>)}
            </div>
        </div>) : "This project is not found"
    )
}

export default Project;