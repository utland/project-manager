import { useDispatch} from "react-redux";
import { ThunkDispatch } from "../../interfaces/reduxDefault";
import ISubtask from "../../interfaces/subTask.model.i";
import "../../styles/Table.scss";
import { removeSubtask, updateSubtask } from "../../redux/slices/projectSlice";
import client from "../../api/client";
import { useState } from "react";
import Edit from "./Edit";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import getStatusStyle from "../../utils/getStatusStyle";

interface ISubtaskProps {
    data: ISubtask
}

function Subtask({data}: ISubtaskProps) {
    const {id, key, name, projectId, status} = data;
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const dispatch = useDispatch<ThunkDispatch>();

    const handlerDelete = async () => {
        try {
          const {data} = await client.post("/subtask/delete", {
            id,
            projectId
          });

          dispatch(removeSubtask(data));
        } catch (error: any) {
          console.log(error)
        };
    }

    const handlerStatus = async (status: string) => {
      try {
        const {data} = await client.post("/subtask/status", {
          id,
          projectId,
          status
        });

        dispatch(updateSubtask(data));
      } catch (error: any) {
        console.log(error);
      };
    }
    
    return (
      <>{isEdit ? <Edit data={data} type="subtask" closeEdit={() => setIsEdit(false)}/> :
        <div className={`table-item open ${getStatusStyle(status)}`}>
          <div className="key">{key}</div>
          <div className="name">{name}</div>
          <select id="status" value={status} onChange={(e) => handlerStatus(e.target.value)}>
            <option value={"ToDo"}>ToDo</option>
            <option value={"InProcess"}>In Process</option>
            <option value={"Done"}>Done</option>
          </select>
          <div className="actions">
            <button className="edit" onClick={() => setIsEdit(true)}><FaEdit /></button>
            <button className="delete" onClick={handlerDelete}><MdDeleteForever /></button>
          </div>
        </div>
        }
      </>
    )
}

export default Subtask;