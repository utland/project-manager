import { useDispatch } from "react-redux";
import { ThunkDispatch } from "../../interfaces/reduxDefault";
import IBlock from "../../interfaces/block.model.i";
import "../../styles/Table.scss";
import Task from "./Task";
import client from "../../api/client";
import { removeBlock, updateBlock } from "../../redux/slices/projectSlice";
import { useState } from "react";
import Proxy from "./Proxy";


interface IBlockProps {
    data: IBlock
    isEditable?: boolean
}

function Block({data, isEditable = false}: IBlockProps) {
    const {id, key, name, description, projectId, status, tasks} = data;
    const [isTasks, setIsTasks] = useState<boolean>(false);
    const [newTask, createTask] = useState<boolean>(false);
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
        <div className={isTasks ? 'table-item open' : 'table-item'}>
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
            <button className="edit">E</button>
            <button className="delete" onClick={handlerDelete}>D</button>
            <button className="toggle" onClick={() => setIsTasks(!isTasks)}>
              {isTasks ? "↓" : "↑"}
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
    )
}

export default Block;
