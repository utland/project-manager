import { Status } from "../../node_modules/.prisma/client/index.js";
import ITask from "./task.model.i.js";

interface ISubtask {
  key: number;
  name: string;
  status: Status;
  parentTask: ITask;
  projectId: string;
}

export default ISubtask;
