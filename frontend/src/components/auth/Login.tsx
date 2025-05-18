import { useState } from "react";
import client from "../../api/client";
import "../../styles/Login.scss";
import IError from "../../interfaces/error.i";
import IUser from "../../interfaces/user.model.i";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "../../interfaces/reduxDefault";
import { setUser } from "../../redux/slices/userSlice";

function Login() {
    if (localStorage.getItem("token")) {
        window.location.href = "/";
        return;
    };

    const [error, setError] = useState<IError>();
    const dispatch = useDispatch<ThunkDispatch>();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const elements = e.currentTarget.elements;
        const login = elements.namedItem("login") as HTMLInputElement;
        const password = elements.namedItem("password") as HTMLInputElement;
        console.log({login: login.value, password: password.value})
        
        try {
            const user = await client.post("/user/login", {
                login: login.value,
                password: password.value
            });
            dispatch(setUser(user.data));
        } catch (error: any) {
            setError(error);
            console.log(error)
        };
    }

    return(
        <div className="login-container">
            <div className="login-box">
                {error ? <h2>{error.message}</h2> : ""}
                <form action="" onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    name="login" 
                    placeholder="Login" 
                    autoComplete="off" 
                    className={`${error?.type === "login" ? "red" : ""}`}
                    />
                    <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    autoComplete="off" 
                    className={`${error?.type === "password" ? "red" : ""}`}
                    />
                    <button type="submit">Log in</button>
                </form>
                <NavLink to={"/register"} className="link">Create a new account</NavLink>
            </div>
        </div>
    )
}

export default Login;