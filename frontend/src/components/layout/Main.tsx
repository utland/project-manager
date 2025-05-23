import Header from "../common/Header";
import { useSelector } from "react-redux";
import { IRootState } from "../../interfaces/reduxDefault";
import Loader from "../common/Loader";
import { ReactNode } from "react";
import Status from "../../interfaces/statusSlice";

const getStatus = (status1: Status, status2: Status | null): Status => {
    if (!status2) return status1;
    if (status1 === "error" || status2 === "error") return "error";
    if (status1 === "loading" || status2 === "loading") return "loading";
    return "completed";
}

function Main({children}: {children: ReactNode}) {
    const userSlice = useSelector((state: IRootState) => state.user);
    const projectSlice = useSelector((state: IRootState) => state.user);
    const status = getStatus(userSlice.status, projectSlice.status);

    return (
        <div className="main">
          {status === "loading" ? <Loader />:
          <>
            <Header user={userSlice.user} />
            {children}
          </>}
        </div>
    )
}

export default Main;