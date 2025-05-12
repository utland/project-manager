import { Outlet } from "react-router-dom";
import IUser from "../../interfaces/user.model.i";
import Header from "../common/Header";

interface IMain {
    user: IUser
}

function Main({user}: IMain) {
    return (
        <>
          <Header user={user} />
          <Outlet />
        </>
    )
}

export default Main;