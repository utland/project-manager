import "../../styles/Home.scss";
import ProjectCard from "./ProjectCard";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../interfaces/reduxDefault";
import Modal from "../modal/Modal";
import ModalContext from "../../context/ModalContext";

function Home() {
    const {setModal} = useContext(ModalContext);
    const {user} = useSelector((state: IRootState) => state.user);

    return(
    <div className="main-page">
        <Modal />
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