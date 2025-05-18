import { useContext, useState } from "react";
import client from "../../api/client";
import "../../styles/Modal.scss";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, ThunkDispatch } from "../../interfaces/reduxDefault";
import { updateProject } from "../../redux/slices/projectSlice";
import ModalContext from "../../context/ModalContext";
  
function ModalInfo() {
  const {closeModal} = useContext(ModalContext);

  const { project } = useSelector((state: IRootState) => state.project)
  const dispatch = useDispatch<ThunkDispatch>();

  const {id, name, description} = project;
  const [error, setError] = useState<boolean>(false);
  
  const handleSubmitSave = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      const elements = e.currentTarget.elements;
      const name = elements.namedItem("name") as HTMLInputElement;
      const desc = elements.namedItem("desc") as HTMLInputElement;
      
      try {
          await client.post(`/project/${id}`, {
              name: name.value,
              description: desc.value
          });

          dispatch(updateProject({name: name.value, desc: desc.value}));
          closeModal();
      } catch (error: any) {
          setError(error);
      };
  }
  
  return (
    <>
      <h2>Update project</h2>
      <form onSubmit={handleSubmitSave}>
        <input name="name" defaultValue={name}/>
        <input name="desc" defaultValue={description}/>
        <button type="submit">Save</button>
      </form>
    </>
  );
};
  
export default ModalInfo;