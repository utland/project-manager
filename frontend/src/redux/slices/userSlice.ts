import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../api/client";
import { nullUser } from "../../interfaces/layout";
import IUser from "../../interfaces/user.model.i";
import Status from "../../interfaces/statusSlice";
import sortByDate from "../../utils/sortByDate";

interface IUserConfig {
    user: IUser,
    status: Status
}

export const fetchUser = createAsyncThunk("users/fetchuser", async () => {
    const { data } = await client.get(`/user`);
    return data;
})

const initialState: IUserConfig = {
    user: nullUser,
    status: "loading"
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        addProject: (state, action) => {
            state.user.projects = [...state.user.projects, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.status = "loading"
        });
        builder.addCase(fetchUser.rejected, (state) => {
            state.status = "error";
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.user.projects.sort(sortByDate);
            state.status = "completed";
        });
    }
})

export const {setUser, addProject} = userSlice.actions;

export default userSlice.reducer;