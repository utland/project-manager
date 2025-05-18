import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import client from "../../api/client";
import IProject from "../../interfaces/project.model.i";
import { nullProject } from "../../interfaces/layout";
import Status from "../../interfaces/statusSlice";
import ITask from "../../interfaces/task.model.i";

interface IUserConfig {
    project: IProject,
    status: Status
}

export const fetchProject = createAsyncThunk("users/fetchproject", async (id: string) => {
    const { data } = await client.get(`/project/${id}`);
    return data;
})

const initialState: IUserConfig = {
    project: nullProject,
    status: "loading"
}

const projectSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setProject: (state, action) => {
            state.project = action.payload;
        },
        setUsers: (state, action) => {
            state.project.users = action.payload;
        },
        addBlock: (state, action) => {
            state.project.blocks.push(action.payload);
        },
        removeBlock: (state, action) => {
            const blocks = state.project.blocks;
            state.project.blocks = blocks.filter(item => item.id !== action.payload)
        },
        addTask: (state, action: PayloadAction<ITask>) => {
            const {blockId} = action.payload;
            if (!blockId) {
                state.project.tasks.push(action.payload);
            } else {
                const block = state.project.blocks.find(item => item.id === blockId);
                block?.tasks.push(action.payload);
            } 
        }, 
        removeTask: (state, action: PayloadAction<ITask>) => {
            const {blockId, id, key} = action.payload;
            console.log(action.payload)
            if (!blockId) {
                const tasks = state.project.tasks;
                state.project.tasks = tasks.filter(item => item.id !== id)
            } else {
                const block = state.project.blocks.find(item => item.id === blockId);
                if (!block) return;

                block.tasks = block.tasks.filter(item => item.key !== key);
            } 
        },
        setInvites: (state, action) => {
            state.project.invites = action.payload;
        },
        updateProject: (state, action) => {
            const {name, desc} = action.payload;
            state.project.name = name;
            state.project.description = desc;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProject.pending, (state) => {
            state.status = "loading"
        });
        builder.addCase(fetchProject.rejected, (state) => {
            state.status = "error";
        });
        builder.addCase(fetchProject.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.project = action.payload;
            state.status = "completed";
        });
    }
})

export const {setProject, setUsers, setInvites, updateProject, addBlock, addTask, removeBlock, removeTask} = projectSlice.actions;

export default projectSlice.reducer;