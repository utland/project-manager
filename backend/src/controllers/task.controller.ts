import { RequestApi } from "api-server";
import { ResponseApi } from "api-server";
import Controller from "../common/controller.js";
import TaskService from "../service/task.service.js";
import { injectable } from "tsyringe";

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
    const { projectId, blockId, name } = req.body;
    const project = await this.service.createTask(projectId, blockId, name);
    res.status(201).json(project);
  };

  public delete = async (req: RequestApi, res: ResponseApi) => {
    const { key, projectId } = req.body;
    const deleted = await this.service.deleteTask(key, projectId);
    res.status(201).json(deleted);
  };

  public update = async (req: RequestApi, res: ResponseApi) => {
    const { key, projectId, name } = req.body;
    const updated = await this.service.updateName(key, projectId, name);
    res.status(201).json(updated);
  };

  public updateStatus = async (req: RequestApi, res: ResponseApi) => {
    const { key, projectId, status } = req.body;
    const updated = await this.service.updateStatus(key, projectId, status);
    res.status(201).json(updated);
  };
}

export default TaskController;
