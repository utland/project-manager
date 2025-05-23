import { useParams } from "react-router-dom";
import "../../styles/Project.scss";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, ThunkDispatch } from "../../interfaces/reduxDefault";
import { fetchProject } from "../../redux/slices/projectSlice";
import Modal from "../modal/Modal";
import ModalContext from "../../context/ModalContext";
import ProjectInfo from "./ProjectInfo";
import Table from "../table/Table";
import { MdDeleteForever } from "react-icons/md";
import { FaBell, FaInfo } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import Loader from "../common/Loader";

type idProject = {
    id: string
}

type windowType = "info" | "table";

function Project() {
    const { id } = useParams<idProject>();
    
    const {user} = useSelector((state: IRootState) => state.user);
    const { project, status } = useSelector((state: IRootState) => state.project);
    const dispatch = useDispatch<ThunkDispatch>();
    
    const [window, setWindow] = useState<windowType>("info");
    const {setModal} = useContext(ModalContext);

    useEffect(() => {
        dispatch(fetchProject(id as string))
    }, []);

    return (
        status === "completed" ? (
        <div className="project-page">
            <Modal />

            {user.id === project.adminId ? 
            <div className="project-actions">
                <button className="add-user" onClick={() => setModal("add")}><IoPersonAdd /></button>
                <button className="users" onClick={() => setModal("requests")}><FaBell /></button>
                <button className="advanced-info" onClick={() => setModal("info")}><FaInfo /></button>
                <button className="delete" onClick={() => setModal("delete")}><MdDeleteForever /></button>
            </div> : ""}
            <div className="project-main">
                <div className="window-switch">
                    <button 
                        className={`switch-btn ${window === "info" ? "active" : ""}`}
                        onClick={() => setWindow("info")}>
                        Info
                    </button>
                    <button 
                        className={`switch-btn ${window === "table" ? "active" : ""}`}
                        onClick={() => setWindow("table")}>
                        Table
                    </button>
                    <div className={`switch-indicator ${window}`}></div>
                </div>
                {window === "info" ? <ProjectInfo /> : <Table />}
            </div>
        </div>) : <Loader />
    )
}

export default Project;