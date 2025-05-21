import { Provider, useDispatch, useSelector } from "react-redux";
import { IRootState, ThunkDispatch } from "../../interfaces/reduxDefault";
import "../../styles/Table.scss";
import Task from "./Task";
import { useContext, useState } from "react";
import ProxyContext from "../../context/ProxyContext";
import Block from "./Block";
import ModalContext from "../../context/ModalContext";

function Table() {
    const { project } = useSelector((state: IRootState) => state.project);
    const [proxy, setProxy] = useState<boolean>(false);
    const {setModal} = useContext(ModalContext)

    return (
      <ProxyContext.Provider value={{proxy, setProxy: (value: boolean) => setProxy(value)}}>
        <div className="table">
          <div className="list">
            {/* {proxy ? <Proxy /> : ""} */}
            {project.blocks.map((item) => <Block data={item}/>)}
            {project.tasks.map((item) => <Task data={item}/>)}
          </div>
          <button className="add-row" onClick={() => setModal("addBlock")}>+</button>
        </div>
      </ProxyContext.Provider>
    )
}

export default Table;