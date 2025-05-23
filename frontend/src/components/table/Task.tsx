import { useDispatch, useSelector } from "react-redux";
import { IRootState, ThunkDispatch } from "../../interfaces/reduxDefault";
import ITask from "../../interfaces/task.model.i";
import "../../styles/Table.scss";
import { useState } from "react";
import client from "../../api/client";
import { removeTask, updateTask } from "../../redux/slices/projectSlice";
import Subtask from "./Subtask";
import TaskProxy from "./Proxy";
import Edit from "./Edit";
import { FaEdit, FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import getStatusStyle from "../../utils/getStatusStyle";

interface ITaskProps {
    data: ITask,
}

function Task({data}: ITaskProps) {
    console.log(data)
    const {id, key, name, projectId, status, subtasks, blockId} = data;
    const [isTasks, setIsTasks] = useState<boolean>(false);
    const [newTask, createTask] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
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

    const handlerStatus = async (status: string) => {
      try {
        const {data} = await client.post("/task/status", {
          id,
          projectId,
          status
        });

        dispatch(updateTask(data));
      } catch (error: any) {
        console.log(error)
      };
    }
    
    return (
      <>
      {isEdit ? <Edit data={data} type="task" closeEdit={() => setIsEdit(false)}/> :
        <div className={`table-item task-item ${isTasks ? 'open' : ''} ${getStatusStyle(status)}`}>
          <div className="key">{key}</div>
          <div className="name">{name}</div>
          <select id="status" value={status} onChange={(e) => handlerStatus(e.target.value)}>
            <option value={"ToDo"}>ToDo</option>
            <option value={"InProcess"}>In Process</option>
            <option value={"Done"}>Done</option>
          </select>
          <div className="actions">
              <button  className="edit" onClick={() => setIsEdit(true)}><FaEdit /></button>
              <button className="delete" onClick={handlerDelete}><MdDeleteForever /></button>
              <button className="toggle" onClick={() => setIsTasks(!isTasks)}>
                {isTasks ? <FaLongArrowAltDown /> : <FaLongArrowAltUp />}
              </button>
          </div>
          {isTasks && 
          <div className="task-list">
            {subtasks.map(item => <Subtask data={item}/>)}
            {newTask ?
              <TaskProxy blockId={blockId} taskId={id} setProxy={(value: boolean) => createTask(value)} component={"subtask"}/> : 
              <button className="add-row" onClick={() => createTask(true)}>+</button>
            }
          </div>}
        </div>
        }
      </>
    )
}

export default Task;