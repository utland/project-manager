import { useState } from "react";
import client from "../../api/client";
import IProject from "../../interfaces/project.model.i";
import "../../styles/Modal.scss";

interface ModalProps {
  isClosed: boolean
  onClose: () => void;
  projectId: string
  }
  
function ModalInfo({ isClosed, onClose, projectId }: ModalProps) {
    if (isClosed) return;

    const [error, setError] = useState<boolean>(false);
    
    const handleSubmitAdd = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const elements = e.currentTarget.elements;
        const login = elements.namedItem("login") as HTMLInputElement;
        
        try {
            await client.post("/project/user", {
                login: login.value,
                id: projectId
            });

            onClose();
        } catch (error: any) {
            setError(error);
        };
    }
    
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2>Add user</h2>
          <form onSubmit={handleSubmitAdd}>
            <input placeholder="Login of user" name="login" />

            <button type="submit">Add User</button>
          </form>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
      </div>
    );
};
  
export default ModalInfo;