import { useState } from "react";
import client from "../../api/client";
import IProject from "../../interfaces/project.model.i";
import "../../styles/Modal.scss";
import "../../styles/Project.scss";
import RequestCard from "./RequestCard";
import { IProjectModal } from "./Project";

interface ModalProps {
  modal: IProjectModal
  onClose: () => void;
  project: IProject,
  setProject: (project: IProject) => void
}
  
function ModalAction({ modal, onClose, project, setProject }: ModalProps) {
    if (!modal) return;

    const [error, setError] = useState<boolean>(false);
    
    const handleSubmitAdd = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const elements = e.currentTarget.elements;
        const login = elements.namedItem("login") as HTMLInputElement;
        
        try {
          await client.post("/project/user", {
              login: login.value,
              projectId: project.id
          });
          
          onClose();
        } catch (error: any) {
          console.log(error)
          setError(error);
        };
    }
    
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          {modal === "add" ?
          <>
            <h2>Add user</h2>
            <form onSubmit={handleSubmitAdd}>
              <input placeholder="Login of user" name="login" />
  
              <button type="submit">Add User</button>
            </form>
          </> :
          <>
            <h2>Requests</h2>
            <div className="request-list">
              {project.invites.map(item => <RequestCard user={item} setProject={setProject} projectId={project.id}/>)}
            </div>
          </>

          }
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
      </div>
    );
};
  
  export default ModalAction;