import { useDispatch } from "react-redux";
import { ThunkDispatch } from "../../interfaces/reduxDefault";
import IBlock from "../../interfaces/block.model.i";
import "../../styles/Table.scss";
import Task from "./Task";
import client from "../../api/client";
import { removeBlock } from "../../redux/slices/projectSlice";
import { useState } from "react";
import TaskProxy from "./TaskProxy";


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

    return (
        <div className={isTasks ? 'block-item open' : 'block-item'}>
            <div className="key">{key}</div>
            <div className="name">{name}</div>
            <div className="status">{status}</div>
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
              <TaskProxy blockId={id} setProxy={(value: boolean) => createTask(value)}/> : 
              <button className="add-row" onClick={() => createTask(true)}>+</button>
            }
          </div>
          }
        </div>
    )
}

export default Block;
