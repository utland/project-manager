import { useDispatch, useSelector } from "react-redux";
import { IRootState, ThunkDispatch } from "../../interfaces/reduxDefault";
import "../../styles/Table.scss";
import { useRef } from "react";
import client from "../../api/client";
import { addSubtask, addTask } from "../../redux/slices/projectSlice";

interface IProps {
    blockId: number | undefined,
    taskId?: number,
    setProxy: (value: boolean) => void,
    component: "task" | "subtask";
}

function Proxy({taskId, setProxy, component, blockId}: IProps) {
    const { project } = useSelector((state: IRootState) => state.project);
    const dispatch = useDispatch<ThunkDispatch>();
    const ref = useRef<any>(null);

    const handlerAdd = async () => {
        try {
          const name = ref.current ? ref.current.value : "name";
          const body = {name, projectId: project.id, blockId};
          const {data} = await client.post(`/${component}`, {...body, ...(taskId && {taskId})});

          dispatch(component === "task" ? addTask(data) : addSubtask(data));
          setProxy(false);
        } catch (error: any) {
          console.log(error)
        };
    }
    
    return (
        <div className="task-proxy">
          <input type="text" ref={ref}/>
          <div className="actions">
                <button className="add" onClick={handlerAdd}>E</button>
                <button className="delete" onClick={() => setProxy(false)}>D</button>
            </div>
        </div>
    )
}

export default Proxy;