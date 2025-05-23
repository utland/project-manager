import IBlock from "./block.model.i.js";
import IProject from "./project.model.i.js";
import Status from "./status.i.js";
import ISubtask from "./subTask.model.i.js";
import IUser from "./user.model.i.js";

interface ITask {
  id: number;
  key: number;
  name: string;
  subtasks: ISubtask[];
  status: Status;
  parentBlock?: IBlock;
  parentProject: IProject;
  projectId: string;
  blockId?: number;
  user: IUser;
}

export default ITask;
