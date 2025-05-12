import IUser from "../../interfaces/user.model.i";
import { router } from "../../main";
import "../../styles/Header.scss";

interface propsType {
    user: IUser,
}

function Header({ user }: propsType) {
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        localStorage.removeItem("token");
        router.navigate("/login");
    }

    return(
        <div className="topbar">
            <div>Id: {user.id}</div>
            <div>Login: {user.login}</div>
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
            <div>Info: {user.info}</div>
            <button onClick={handleClick}>Exit</button>
        </div>
    )
}

export default Header;