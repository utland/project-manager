import client from "../../api/client";
import "../../styles/Modal.scss";
import "../../styles/Project.scss";

import { IRootState, ThunkDispatch } from "../../interfaces/reduxDefault";
import { useDispatch, useSelector } from "react-redux";
import { setInvites, setUsers } from "../../redux/slices/projectSlice";
import RequestCard from "../project/RequestCard";
import { useContext } from "react";
import ModalContext from "../../context/ModalContext";

interface ModalProps {
  type: "add" | "requests"
}
  
function ModalAction({ type }: ModalProps) {
    const dispatch = useDispatch<ThunkDispatch>();
    const {closeModal} = useContext(ModalContext);
    const { project } = useSelector((state: IRootState) => state.project)

    const handleSubmitAdd = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const elements = e.currentTarget.elements;
        const login = elements.namedItem("login") as HTMLInputElement;
        
        try {
          const {data} = await client.post("/project/user", {
              login: login.value,
              projectId: project.id
          });
          
          dispatch(setInvites(data.invites));
          dispatch(setUsers(data.users));

          closeModal();
        } catch (error: any) {
          console.log(error)
        };
    }
    
    return (
      <>
        {type === "add" ?
        <>
          <h2>Add user</h2>
          <form onSubmit={handleSubmitAdd}>
            <input placeholder="Login of user" name="login" />

            <button type="submit">Add User</button>
          </form>
        </> :
        <>
          <h2>Requests</h2>
          {project.invites.length ?
            <div className="request-list">
              {project.invites.map(item => <RequestCard user={item} projectId={project.id}/>)}
            </div> : <div>No requests</div>
          }
        </>
        }
      </>
    );
};
  
  export default ModalAction;