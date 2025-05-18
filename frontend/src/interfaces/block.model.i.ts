import IProject from "./project.model.i.js";
import Status from "./statusSlice.js";
import ITask from "./task.model.i.js";

interface IBlock {
  id: number;
  key: number;
  name: string;
  description: string;
  tasks: ITask[];
  status: Status;
  parentProject: IProject;
  projectId: string;
}

export default IBlock;
