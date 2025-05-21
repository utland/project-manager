import Status from "./status.i.js";
import ITask from "./task.model.i.js";

interface ISubtask {
  id: number;
  key: number;
  name: string;
  status: Status;
  taskId: number;
  projectId: string;
  blockId: number
}

export default ISubtask;
