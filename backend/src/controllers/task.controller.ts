import { RequestApi } from "api-server";
import { ResponseApi } from "api-server";
import Controller from "../common/controller.js";
import TaskService from "../service/task.service.js";
import { injectable } from "tsyringe";
import getStatus from "../utils/getStatus.js";

@injectable()
class TaskController extends Controller<TaskService> {
  constructor(service: TaskService) {
    super(service);
    this.router.post("/", this.create);
    this.router.post("/delete", this.delete);
    this.router.post("/update", this.update);
    this.router.post("/status", this.updateStatus);
  }

  public create = async (req: RequestApi, res: ResponseApi) => {
    const { projectId, blockId, name} = req.body;
    const task = await this.service.createTask(projectId, blockId, name);
    res.status(201).json(task);
  };

  public delete = async (req: RequestApi, res: ResponseApi) => {
    const {id, projectId } = req.body;
    const deleted = await this.service.deleteTask(id, projectId);
    res.status(201).json(deleted);
  };

  public update = async (req: RequestApi, res: ResponseApi) => {
    const { id, projectId, name} = req.body;
    const updated = await this.service.updateTask(id, projectId, name);
    res.status(201).json(updated);
  };

  public updateStatus = async (req: RequestApi, res: ResponseApi) => {
    const { id, projectId, status } = req.body;
    const statusEnum = getStatus(status);
    const updated = await this.service.updateStatus(id, projectId, statusEnum);
    res.status(201).json(updated);
  };
}

export default TaskController;
