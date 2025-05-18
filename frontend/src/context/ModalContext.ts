import { createContext } from "react";

export type IModal = "add" | "requests" | "info" | "create" | "join" | "delete" | "addBlock" | null;

interface IModalContext {
    modal: IModal,
    setModal: (modal: IModal) => void,
    closeModal: () => void
}

const ModalContext = createContext<IModalContext>({
    modal: null,
    setModal: () => "",
    closeModal: () => ""
});

export default ModalContext;