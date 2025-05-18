import { useDispatch, useSelector } from "react-redux";
import { IRootState, ThunkDispatch } from "../../interfaces/reduxDefault";
import Block from "./Block";
import "../../styles/Table.scss";
import Task from "./Task";
import { useContext } from "react";
import ModalContext from "../../context/ModalContext";

interface AddingState {
  type: 'block' | 'task' | 'subtask';
  parentId?: string;
}

function Table() {
    const { project } = useSelector((state: IRootState) => state.project);
    const {setModal} = useContext(ModalContext);

    return (
        <div className="table">
          <div className="block-list">
            {project.blocks.map((item) => <Block data={item}/>)}
          </div>
          <div className="task-list">
            {project.tasks.map((item) => <Task data={item}/>)}
          </div>
          <button className="add-row" onClick={() => setModal("addBlock")}>+</button>
        </div>
    )
}

export default Table;