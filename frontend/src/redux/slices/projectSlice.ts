import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import client from "../../api/client";
import IProject from "../../interfaces/project.model.i";
import { nullProject } from "../../interfaces/layout";
import Status from "../../interfaces/statusSlice";
import ITask from "../../interfaces/task.model.i";
import IBlock from "../../interfaces/block.model.i";
import ISubtask from "../../interfaces/subTask.model.i";
import { memoize } from "../../utils/memoize";

interface IUserConfig {
    project: IProject,
    status: Status,
}

const findState = (arr: any[], id: number) => arr.find(item => item.id === id);

const memoizedFind = memoize(findState);

export const fetchProject = createAsyncThunk("users/fetchproject", async (id: string) => {
    const { data } = await client.get(`/project/${id}`);
    return data;
})

const initialState: IUserConfig = {
    project: nullProject,
    status: "loading",
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
        updateBlock: (state, action: PayloadAction<IBlock>) => {
            const {id, status, name, description, tasks} = action.payload;
            const block = state.project.blocks.find(item => item.id === id);
            if (!block) return;

            block.status = status;
            block.name = name;
            block.description = description;
            block.tasks = tasks;
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
            if (!blockId) {
                const tasks = state.project.tasks;
                state.project.tasks = tasks.filter(item => item.id !== id)
            } else {
                const block = state.project.blocks.find(item => item.id === blockId);
                if (!block) return;

                block.tasks = block.tasks.filter(item => item.key !== key);
            } 
        },
        updateTask: (state, action: PayloadAction<ITask>) => {
            const {key, blockId, name, subtasks, status} = action.payload;
            let task;
            if (!blockId) {
                task = state.project.tasks.find(item => item.key === key);
            } else {
                task = state.project.blocks.find(item => item.id === blockId)?.tasks.find(item => item.key === key);
            }
            if (!task) return;

            task.subtasks = subtasks;
            task.name = name;
            task.status = status;
        },
        updateSubtask: (state, action: PayloadAction<ISubtask>) => {
            const {blockId, name, status, id, taskId} = action.payload;
            let subtask;
            if (!blockId) {
                const task = state.project.tasks.find(item => item.id === taskId);
                subtask = task?.subtasks.find(item => item.id === id);
            } else {
                const block = state.project.blocks.find(item => item.id === blockId);
                const task = block?.tasks.find(item => item.id === taskId);
                subtask = task?.subtasks.find(item => item.id === id);
            }
            if (!subtask) return;

            subtask.status = status;
            subtask.name = name;
        },
        addSubtask: (state, action: PayloadAction<ISubtask>) => {
            const {blockId, taskId} = action.payload;
            if (!blockId) {
                const task = state.project.tasks.find(item => item.id === taskId);
                task?.subtasks.push(action.payload);
            } else {
                const block = state.project.blocks.find(item => item.id === blockId);
                const task = block?.tasks.find(item => item.id === taskId);
                task?.subtasks.push(action.payload);
            }
        },
        removeSubtask: (state, action: PayloadAction<ISubtask>) => {
            const {blockId, taskId} = action.payload;
            if (!blockId) {
                state.project.tasks = state.project.tasks.filter(item => item.id !== taskId);
            } else {
                const block = state.project.blocks.find(item => item.id === blockId);
                if (!block) return;

                block.tasks = block?.tasks.filter(item => item.id !== taskId);
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
            state.project = action.payload;
            state.status = "completed";
        });
    }
})

export const {
    setProject, setUsers, setInvites, updateProject,
    addBlock, removeBlock, updateBlock,
    addTask, removeTask, updateTask,
    addSubtask, removeSubtask, updateSubtask
} = projectSlice.actions;

export default projectSlice.reducer;