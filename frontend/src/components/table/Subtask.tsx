import { useDispatch, useSelector } from "react-redux";
import { IRootState, ThunkDispatch } from "../../interfaces/reduxDefault";
import ISubtask from "../../interfaces/subTask.model.i";
import "../../styles/Table.scss";

interface ISubtaskProps {
    data: ISubtask
}

function Subtask({data}: ISubtaskProps) {
    const { project, status } = useSelector((state: IRootState) => state.project);
    const dispatch = useDispatch<ThunkDispatch>();
    
    return (
        <>
          {project.blocks}
        </>
    )
}

export default Subtask;