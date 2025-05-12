import IProject from "./project.model.i.js";
import ITask from "./task.model.i.js";
import { Status } from "../../node_modules/.prisma/client/index.js";

interface IBlock {
  key: number;
  name: string;
  description: string;
  tasks: ITask[];
  status: Status;
  parentProject: IProject;
  projectId: string;
}

export default IBlock;
