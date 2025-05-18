import { useDispatch, useSelector } from "react-redux";
import { IRootState, ThunkDispatch } from "../../interfaces/reduxDefault";
import "../../styles/Table.scss";
import { useRef } from "react";
import client from "../../api/client";
import { addTask } from "../../redux/slices/projectSlice";

interface IProps {
    blockId: number,
    setProxy: (value: boolean) => void
}

function TaskProxy({blockId, setProxy}: IProps) {
    const { project } = useSelector((state: IRootState) => state.project);
    const dispatch = useDispatch<ThunkDispatch>();
    const ref = useRef<any>(null);

    const handlerAdd = async () => {
        try {
          const name = ref.current ? ref.current.value : "name"
          const {data} = await client.post("/task", {
            blockId: blockId,
            projectId: project.id,
            name
          });

          dispatch(addTask(data));
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

export default TaskProxy;