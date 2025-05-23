import IProject from "../interfaces/project.model.i";
import Status from "../interfaces/status.i";

export type TypeRate = {
    done: number,
    inProcess: number
}

const countRate = ({blocks, tasks}: IProject): TypeRate => {
    if (!blocks.length && !tasks.length) return {done: 0, inProcess: 0};

    let size = blocks.length + tasks.length;
    let completed = 0;
    let inProgress = 0;
    
    for (const block of blocks) {
        size += block.tasks.length;
        if (block.status === Status.InProcess) inProgress += 1;
        if (block.status === Status.Done) completed += 1;

        for (const task of block.tasks) {
            size += task.subtasks.length;
            if (task.status === Status.InProcess) inProgress += 1;
            if (task.status === Status.Done) completed += 1;

            for (const subtask of task.subtasks) {
                if (subtask.status === Status.InProcess) inProgress += 1;
                if (subtask.status === Status.Done) completed += 1;
            }
        }
    }

    for (const task of tasks) {
        if (task.status === Status.Done) completed += 1;
    }

    return {
        done: completed / size,
        inProcess: (inProgress + completed) / size
    }
}

export default countRate;