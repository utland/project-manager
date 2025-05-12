import "../../styles/Home.scss";
import ProjectCard from "./ProjectCard";
import IProject from "../../interfaces/project.model.i";
import Modal from "./MainModal";
import IUser from "../../interfaces/user.model.i";
import { useState } from "react";

interface Iprops {
    user: IUser,
    addProject: (project: IProject) => void;
}

function Home({ user, addProject }: Iprops) {
    const [modal, setModal] = useState<"create" | "join" | null>(null);

    return(
    <div className="main-page">
        <Modal type={modal} onClose={() => setModal(null)} addProject={addProject}/>
        <div className="content">
            <div className="actions">
                <button id="create" onClick={() => setModal("create")}>Create</button>
                <button id="join" onClick={() => setModal("join")}>Join</button>
            </div>
            <div className="project-list">
                {user.projects.map((item) => <ProjectCard data={item}/>)}
            </div>
        </div>
    </div>
    )
}

export default Home;