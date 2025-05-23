import { useState } from "react";
import client from "../../api/client";
import { router } from "../../main";
import "../../styles/Register.scss"
import IError from "../../interfaces/error.i";
import { NavLink } from "react-router-dom";

function Register() {
    if (localStorage.getItem("token")) window.location.href = "/";

    const [error, setError] = useState<IError>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        
        const elements = e.currentTarget.elements;
        const login = elements.namedItem("login") as HTMLInputElement;
        const password = elements.namedItem("password") as HTMLInputElement;
        const name = elements.namedItem("name") as HTMLInputElement;
        const email = elements.namedItem("email") as HTMLInputElement;

        if (!login.value) return setError({message: "Empty login", type: "login"});
        if (!password.value) return setError({message: "Empty password", type: "password"});
        if (!name.value) return setError({message: "Empty name", type: "name"});
        if (!email.value) return setError({message: "Empty email", type: "email"});
        
        try {
            await client.post("/user/register", {
                login: login.value,
                password: password.value,
                name: name.value,
                email: email.value
            });
            
            router.navigate("/");
        } catch (error: any) {
            setError(error);
            console.log(error)
        };
    }

    return(
        <div className="register-container">
            <div className="register-box">
                {error ? <h2>{error.message}</h2> : ""}
                <form action="" onSubmit={handleSubmit}>
                    <div className="register-block">
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
                        className={`${error?.type === "password" ? "red" : ""}`}/>
                    </div>
                    <div className="register-block">
                        <input 
                        type="text" 
                        name="name" 
                        placeholder="Your name" 
                        autoComplete="off" 
                        className={`${error?.type === "name" ? "red" : ""}`}
                        />
                        <input 
                        type="email" 
                        name="email" 
                        placeholder="Your email" 
                        autoComplete="off" 
                        className={`${error?.type === "email" ? "red" : ""}`}/>
                    </div>
                    <button type="submit">Register</button>
                    <NavLink to={"/login"} className="link">Log In</NavLink>
                </form>
            </div>
        </div>
    )
}

export default Register;