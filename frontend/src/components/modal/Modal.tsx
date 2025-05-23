import "../../styles/Modal.scss";
import ModalAction from "./ModalAction";
import ModalInfo from "./ModalInfo";
import ModalHome from "./ModalHome";
import { useContext } from "react";
import ModalContext from "../../context/ModalContext";
import ModalDelete from "./ModalDelete";
import ModalAddItem from "./ModalAddItem";

const modalsElement = {
    "add": <ModalAction type="add"/>,
    "requests": <ModalAction type="requests"/>,
    "info": <ModalInfo />,
    "create": <ModalHome type="create"/>,
    "join": <ModalHome type="join"/>,
    "delete": <ModalDelete />,
    "addBlock": <ModalAddItem />,
}
  
function Modal() {
    const {closeModal, modal} = useContext(ModalContext);
    if (!modal) return;

    return (
      <div className="modal-overlay">
        <div className="modal">
            {modalsElement[modal] ?? ""}
          <button className="close-btn" onClick={closeModal}>×</button>
        </div>
      </div>
    );
};
  
export default Modal;