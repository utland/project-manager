import client from "../../api/client";
import "../../styles/Modal.scss";
import "../../styles/Project.scss";
import { IRootState, ThunkDispatch } from "../../interfaces/reduxDefault";
import { useDispatch, useSelector } from "react-redux";
import { addBlock, setInvites, setUsers } from "../../redux/slices/projectSlice";
import { useContext, useState } from "react";
import ModalContext from "../../context/ModalContext";
  
function ModalAddBlock() {
    const dispatch = useDispatch<ThunkDispatch>();
    const {closeModal} = useContext(ModalContext);
    const [component, setComponent] = useState<"task" | "block">("block");
    const { project } = useSelector((state: IRootState) => state.project)

    const handleSubmitAdd = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const elements = e.currentTarget.elements;
        const name = elements.namedItem("name") as HTMLInputElement;
        const desc = elements.namedItem("desc") as HTMLInputElement;
        
        try {
          const {data} = await client.post("/block", {
              name: name.value,
              description: desc.value,
              projectId: project.id
          });

          dispatch(addBlock(data));

          closeModal();
        } catch (error: any) {
          console.log(error)
        };
    }
    
    return (
      <>
        <h2>Add user</h2>
        <div className="type">{component}</div>
        <form onSubmit={handleSubmitAdd}>
          <input placeholder="Name" name="name" />
          <input placeholder="Description" name="desc" />
          <button type="submit">Add {component}</button>
        </form>
      </>
    );
};
  
  export default ModalAddBlock;