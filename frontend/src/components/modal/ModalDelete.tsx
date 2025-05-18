import { useContext, useState } from "react";
import client from "../../api/client";
import "../../styles/Modal.scss";
import { useSelector } from "react-redux";
import { IRootState } from "../../interfaces/reduxDefault";
import ModalContext from "../../context/ModalContext";
import { router } from "../../main";
  
function ModalDelete() {
  const {closeModal} = useContext(ModalContext);
  const { project } = useSelector((state: IRootState) => state.project)
  const [error, setError] = useState<boolean>(false);
  
  const handleDelete = async (): Promise<void> => { 
      try {
        await client.delete(`/project/${project.id}`);
        router.navigate("../");
        closeModal();
      } catch (error: any) {
        setError(error);
      };
  }
  
  return (
    <>
      <h2>Are you sure to delete this project</h2>
      <div>
        <button type="submit" onClick={handleDelete}>Yes</button>
        <button onClick={closeModal}>No</button>
      </div>
    </>
  );
};
  
export default ModalDelete;