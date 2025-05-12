import IBlock from "./block.model.i.js";
import ITask from "./task.model.i.js";
import IUser from "./user.model.i.js";

interface IProject {
  id: string;
  name: string;
  description: string;
  adminId: string;
  users: IUser[];
  invites: IUser[];
  blocks: IBlock[];
  tasks: ITask[];
  globalKey: number;
}

export default IProject;
