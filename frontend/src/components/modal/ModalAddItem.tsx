import client from "../../api/client";
import "../../styles/Modal.scss";
import "../../styles/Project.scss";
import { IRootState, ThunkDispatch } from "../../interfaces/reduxDefault";
import { useDispatch, useSelector } from "react-redux";
import { addBlock, addTask } from "../../redux/slices/projectSlice";
import { useContext, useState } from "react";
import ModalContext from "../../context/ModalContext";
  
type IType = "task" | "block"; 

function ModalAddItem() {
    const dispatch = useDispatch<ThunkDispatch>();
    const {closeModal} = useContext(ModalContext);
    const [type, setType] = useState<IType>("block");
    const { project } = useSelector((state: IRootState) => state.project)

    const handleSubmitAdd = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const elements = e.currentTarget.elements;
        const name = elements.namedItem("name") as HTMLInputElement;
        const desc = elements.namedItem("desc") as HTMLInputElement;
        
        try {
          const body: object = {
            name: name.value,
            projectId: project.id,
            ...(desc && {
              description: desc.value
            })
          }

          const {data} = await client.post(`/${type}`, body);

          dispatch(type === "block" ? addBlock(data) : addTask(data));
          closeModal();
        } catch (error: any) {
          console.log(error)
        };
    }
    
    return (
      <>
        <h2>Create new cmponent</h2>
        <select id="cities" onChange={(e) => setType(e.currentTarget.value as IType)}>
          <option value="block">Block</option>
          <option value="task">Task</option>
        </select>
        <form onSubmit={handleSubmitAdd}>
          <input placeholder="Name" name="name" autoComplete="off" maxLength={20}/>
          {type === "block" ? <textarea rows={2} placeholder="Description" name="desc" autoComplete="off" maxLength={80}/> : ""}
          <button type="submit">Add {type}</button>
        </form>
      </>
    );
};
  
  export default ModalAddItem;