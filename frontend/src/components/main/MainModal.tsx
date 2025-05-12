import client from "../../api/client";
import IProject from "../../interfaces/project.model.i";
import "../../styles/Modal.scss";

interface ModalProps {
    type: "create" | "join" | null;
    onClose: () => void;
    addProject: (project: IProject) => void;
  }
  
function Modal({ type, onClose, addProject }: ModalProps) {
    if (!type) return;
    
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
            onClose();
            addProject(project.data);
        } catch (error: any) {
            console.log(error)
        };
    }
    
    const handleSubmitJoin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const elements = e.currentTarget.elements;
        const id = elements.namedItem("invite") as HTMLInputElement;
        
        try {
            const project = await client.put("/project/invite", {
                idInvite: id.value,
            });
            onClose();
            // addPro`ject(project.data);
            console.log("Request is sent");
            console.log(project);
        } catch (error: any) {
            console.log(error)
        };
    }
    
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>{type === "create" ? "Create Project" : "Join Project"}</h2>
          <form onSubmit={type === "create" ? handleSubmitCreate : handleSubmitJoin}>
            {type === "create" ?
            <>
              <input placeholder="Project Name" name="name"/>
              <input placeholder="Description" name="description"/>
            </>
            : 
            <input placeholder={"Invite Code"} name="invite"/>}

            <button type="submit">{type === "create" ? "Create" : "Join"}</button>
          </form>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
      </div>
    );
};
  
  export default Modal;