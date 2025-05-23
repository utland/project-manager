import { useDispatch } from "react-redux";
import { ThunkDispatch } from "../../interfaces/reduxDefault";
import IBlock from "../../interfaces/block.model.i";
import "../../styles/Table.scss";
import Task from "./Task";
import client from "../../api/client";
import { removeBlock, updateBlock } from "../../redux/slices/projectSlice";
import { useState } from "react";
import Proxy from "./Proxy";
import Edit from "./Edit";
import { FaEdit, FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Status from "../../interfaces/status.i";
import getStatusStyle from "../../utils/getStatusStyle";


interface IBlockProps {
    data: IBlock
    isEditable?: boolean
}

function Block({data, isEditable = false}: IBlockProps) {
    const {id, key, name, description, projectId, status, tasks} = data;
    const [isTasks, setIsTasks] = useState<boolean>(false);
    const [newTask, createTask] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const dispatch = useDispatch<ThunkDispatch>();

    const handlerDelete = async () => {
        try {
          const {data} = await client.post("/block/delete", {
            id,
            projectId
          });

          dispatch(removeBlock(data.id));
        } catch (error: any) {
        };
    }

    const handlerStatus = async (status: string) => {
      try {
        const {data} = await client.post("/block/status", {
          id,
          projectId,
          status
        });

        dispatch(updateBlock(data));
      } catch (error: any) {
        console.log(error)
      };
    }

    return (
      <>
        {isEdit ? <Edit data={data} type="block" closeEdit={() => setIsEdit(false)} desc={description}/> :
          <div className={`table-item ${isTasks ? 'open' : ''} ${getStatusStyle(status)}`}>
            <div className="key">{key}</div>
            <div className="info">
              <div className="name">{name}</div>
              <div className="desc">{description}</div>
            </div>
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
              {tasks.map(item => <Task data={item}/>)}
              {newTask ?
                <Proxy component={"task"} blockId={id} setProxy={(value: boolean) => createTask(value)}/> : 
                <button className="add-row" onClick={() => createTask(true)}>+</button>
              }
            </div>
            }
          </div>
        }
      </>
    )
}

export default Block;
