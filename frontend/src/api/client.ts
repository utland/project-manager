import axios, { AxiosResponse } from "axios";
import { router } from "../main";

const client  = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

client.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");
    if (config.url === "/user/login" || config.url === "/user/register") return config;
    if (!token) {
        router.navigate("/login");   
        throw new axios.Cancel("Token is null");
    } else {
        config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
})

client.interceptors.response.use((res) => {
    if (res.config.url === "/user/login") {
        const token = res.headers["authorization"];
        localStorage.setItem("token", token);
        router.navigate("/");
    }

    return res;
}, async (error) => {
    if (!error.response) {
        return Promise.reject("Network error");
    }

    const { data } = error.response as AxiosResponse;
    if (data.type === "token") {
        localStorage.setItem("token", "");
        router.navigate("/login");  
    }
    
    return Promise.reject(data);
})

export default client;

