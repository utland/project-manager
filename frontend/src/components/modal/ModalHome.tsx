import { useDispatch } from "react-redux";
import client from "../../api/client";
import "../../styles/Modal.scss";
import { ThunkDispatch } from "../../interfaces/reduxDefault";
import ModalContext from "../../context/ModalContext";
import { useContext } from "react";
import { addProject } from "../../redux/slices/userSlice";

interface ModalProps {
    type: "create" | "join";
}
  
function ModalHome({ type }: ModalProps) {
    const {closeModal} = useContext(ModalContext);
    const dispatch = useDispatch<ThunkDispatch>();
    
    const handleSubmitCreate = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const elements = e.currentTarget.elements;
        const name = elements.namedItem("name") as HTMLInputElement;
        const description = elements.namedItem("description") as HTMLInputElement;
        
        try {
            const project = await client.post("/project", {
                name: name.value,
                description: description.value
            });

            closeModal();
            dispatch(addProject(project.data));
        } catch (error: any) {
            console.log(error);
            closeModal();
        };
    }
    
    const handleSubmitJoin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const elements = e.currentTarget.elements;
        const id = elements.namedItem("invite") as HTMLInputElement;
        
        try {
            await client.put("/project/invite", {
                idInvite: id.value,
            });

            closeModal();
        } catch (error: any) {
            console.log(error);
            closeModal();
        };
    }
    
    return (
      <>
        <h2>{type === "create" ? "Create Project" : "Join Project"}</h2>
        <form onSubmit={type === "create" ? handleSubmitCreate : handleSubmitJoin}>
          {type === "create" ?
          <>
            <input placeholder="Project Name" name="name" autoComplete="off" maxLength={18}/>
            <textarea id="auto-textarea" rows={3} placeholder="Description" name="description" maxLength={150}></textarea>
          </>
          : 
          <input placeholder={"Invite Code"} name="invite" autoComplete="off"/>}
          <button type="submit">{type === "create" ? "Create" : "Join"}</button>
        </form>
      </>
    );
};
  
  export default ModalHome;