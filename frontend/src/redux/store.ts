import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice";
import project from "./slices/projectSlice";


const store = configureStore({
    reducer: {
        user,
        project
    }
})

export default store;