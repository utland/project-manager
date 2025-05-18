import { useDispatch, useSelector } from "react-redux";
import { IRootState, ThunkDispatch } from "../../interfaces/reduxDefault";
import ITask from "../../interfaces/task.model.i";
import "../../styles/Table.scss";
import { useState } from "react";
import client from "../../api/client";
import { removeTask } from "../../redux/slices/projectSlice";

interface ITaskProps {
    data: ITask,
}

function Task({data}: ITaskProps) {
    const {id, key, name, projectId, status} = data;
    const { project } = useSelector((state: IRootState) => state.project);
    const [isTasks, setIsTasks] = useState<boolean>(false);
    const dispatch = useDispatch<ThunkDispatch>();

    const handlerDelete = async () => {
        try {
          const {data} = await client.post("/task/delete", {
            id,
            projectId
          });

          dispatch(removeTask(data));
        } catch (error: any) {
          console.log(error)
        };
    }
    
    return (
        <div className="task-item">
          <div className="name">{name}</div>
          <div className="status">{status}</div>
          <div className="actions">
                <button className="edit">E</button>
                <button className="delete" onClick={handlerDelete}>D</button>
                <button className="toggle" onClick={() => setIsTasks(!isTasks)}>
                    {isTasks ? "↓" : "↑"}
                </button>
            </div>
        </div>
    )
}

export default Task;