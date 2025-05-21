import client from "../../api/client";
import "../../styles/Modal.scss";
import "../../styles/Project.scss";
import { IRootState, ThunkDispatch } from "../../interfaces/reduxDefault";
import { useDispatch, useSelector } from "react-redux";
import { addBlock, setInvites, setUsers } from "../../redux/slices/projectSlice";
import { useContext, useState } from "react";
import ModalContext from "../../context/ModalContext";
  
type IComponent = "task" | "block"; 

function ModalAddBlock() {
    const dispatch = useDispatch<ThunkDispatch>();
    const {closeModal} = useContext(ModalContext);
    const [component, setComponent] = useState<IComponent>("block");
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

          const {data} = await client.post(`/${component}`, body);

          dispatch(addBlock(data));
          closeModal();
        } catch (error: any) {
          console.log(error)
        };
    }
    
    return (
      <>
        <h2>Create new cmponent</h2>
        <select id="cities" onChange={(e) => setComponent(e.currentTarget.value as IComponent)}>
          <option value="block">Block</option>
          <option value="task">Task</option>
        </select>
        <button></button>
        <form onSubmit={handleSubmitAdd}>
          <input placeholder="Name" name="name" autoComplete="off"/>
          {component === "block" ? <input placeholder="Description" name="desc" autoComplete="off"/> : ""}
          <button type="submit">Add {component}</button>
        </form>
      </>
    );
};
  
  export default ModalAddBlock;