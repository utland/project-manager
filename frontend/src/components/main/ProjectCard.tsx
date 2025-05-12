import IProject from "../../interfaces/project.model.i";
import { router } from "../../main";
import "../../styles/ProjectCard.scss";

interface propsType {
    data: IProject
}

function ProjectCard({data}: propsType) {
    const handlerClick = () => {
        router.navigate(`/project/${data.id}`)
    }

    return (
        <div className="project-card" onClick={handlerClick}>
            <h3>{data.name}</h3>
            <p>{data.description}</p>
        </div>
    )
}

export default ProjectCard;