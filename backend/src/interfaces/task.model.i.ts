import { Status } from "../../node_modules/.prisma/client/index.js";
import IBlock from "./block.model.i.js";
import IProject from "./project.model.i.js";
import ISubtask from "./subTask.model.i.js";

interface ITask {
  key: number;
  name: string;
  subtasks: ISubtask[];
  status: Status;
  parentBlock?: IBlock;
  parentProject: IProject;
  projectId: string;
}

export default ITask;
