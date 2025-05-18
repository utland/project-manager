import Status from "./statusSlice.js";
import ITask from "./task.model.i.js";

interface ISubtask {
  id: number;
  key: number;
  name: string;
  status: Status;
  parentTask: ITask;
  projectId: string;
}

export default ISubtask;
