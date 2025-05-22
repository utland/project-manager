import { useDispatch } from "react-redux";
import client from "../../api/client";
import IBlock from "../../interfaces/block.model.i";
import { ThunkDispatch } from "../../interfaces/reduxDefault";
import ISubtask from "../../interfaces/subTask.model.i";
import ITask from "../../interfaces/task.model.i";
import { updateBlock, updateSubtask, updateTask } from "../../redux/slices/projectSlice";
import "../../styles/Table.scss";

type IComponent = "block" | "task" | "subtask";

interface IProps {
    data: IBlock | ITask | ISubtask
    type: IComponent
    closeEdit: () => void
    desc?: string
}

const getReducer = (type: IComponent) => {
    switch(type) {
        case "block": return updateBlock;
        case "task": return updateTask;
        default: return updateSubtask;
    }
} 

function Edit({data, type, desc, closeEdit}: IProps) {
    const {key, name, id, projectId} = data;
    const dispatch = useDispatch<ThunkDispatch>();

    const handlerUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const elements = e.currentTarget.elements;
            const name = elements.namedItem("name") as HTMLInputElement;
            const desc = elements.namedItem("desc") as HTMLInputElement;

            const body = {id, projectId, name: name.value, ...(desc && {description: desc.value})};
            const {data} = await client.post(`/${type}/update`, body);
    
            const updateDOM = getReducer(type);
            dispatch(updateDOM(data));
        } catch (error) {
           console.log(error); 
        }

        closeEdit();
    }

    return(
    <form className={'edit-row open table-item'} onSubmit={handlerUpdate}>
        <div className="key">{key}</div>
        <div className="info">
            <input className="name" defaultValue={name} name="name"/>
            {desc && <input className="desc" defaultValue={desc} name={"desc"}/>}
        </div>
        <div className="actions">
            <button className="save" type="submit">S</button>
            <button className="cancel" onClick={closeEdit}>C</button>
        </div>
    </form>
    )
}

export default Edit;