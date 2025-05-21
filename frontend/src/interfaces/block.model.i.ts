import IProject from "./project.model.i.js";
import Status from "./status.i.js";
import ITask from "./task.model.i.js";
import IUser from "./user.model.i.js";

interface IBlock {
  id: number;
  key: number;
  name: string;
  description: string;
  tasks: ITask[];
  status: Status;
  parentProject: IProject;
  projectId: string;
  users: IUser[];
}

export default IBlock;
