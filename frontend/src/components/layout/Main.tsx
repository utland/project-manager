import { Outlet } from "react-router-dom";
import IUser from "../../interfaces/user.model.i";
import Header from "../common/Header";
import { useSelector } from "react-redux";
import { IRootState } from "../../interfaces/reduxDefault";

interface IMain {
    user: IUser
}

function Main() {
    const {user} = useSelector((state: IRootState) => state.user);

    return (
        <>
          <Header user={user} />
          <Outlet />
        </>
    )
}

export default Main;