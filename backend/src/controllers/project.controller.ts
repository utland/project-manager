import Controller from "../common/controller.js";
import ProjectService from "../service/project.service.js";
import { injectable } from "tsyringe";
import { ErrorFn } from "api-server";
import { RequestApi } from "api-server";
import { ResponseApi } from "api-server";
import {extractParams} from "api-server";

@injectable()
class ProjectController extends Controller<ProjectService> {
  constructor(service: ProjectService) {
    super(service);
    this.router.post("/", this.create);
    this.router.delete("/", this.delete);
    this.router.put("/invite", this.addInvite)
    this.router.put("/remove", this.removeInvite)

    this.router.get("/:id", this.get);
    this.router.post("/:id", this.update);

    this.router.post("/user", this.addUser);
    this.router.post("/user/remove", this.removeUser);
  }

  public create = async (req: RequestApi, res: ResponseApi) => {
    const { id } = res.locals.user;
    console.log("create")
    const { description, name } = req.body;
    const project = await this.service.createProject(name, description, id);
    res.status(201).json(project);
  };

  public get = async (req: RequestApi, res: ResponseApi, error: ErrorFn) => {
    const id = extractParams(req.path);
    const project = await this.service.getProject(id);
    if (!project) {
      error({message: "Project is not found", status: 404})
    } else {
      res.status(200).json(project);
    }
  };

  public addInvite = async (req: RequestApi, res: ResponseApi, error: ErrorFn) => {
    const {idInvite} = req.body;
    const { id } = res.locals.user;

    const project = await this.service.addInvite(id, idInvite);
    if (!project) {
      error({message: "Project is not found", status: 404})
    } else {
      res.status(200).json(project);
    }
  }

  public removeInvite = async (req: RequestApi, res: ResponseApi, error: ErrorFn) => {
    const { projectId, userId } = req.body;

    const project = await this.service.removeInvite(projectId, userId);
    if (!project) {
      error({message: "Project is not found", status: 404})
    } else {
      res.status(200).json(project);
    }
  }

  public delete = async (req: RequestApi, res: ResponseApi) => {
    const { adminId, projectId } = req.query;
    const deleted = await this.service.deleteProject(adminId as string, projectId as string);
    res.status(201).json(deleted);
  };

  public update = async (req: RequestApi, res: ResponseApi) => {
    const id = extractParams(req.path);
    const { name, description } = req.body;
    const updated = await this.service.updateProject(id, name, description);
    res.status(201).json(updated);
  };

  public addUser = async (req: RequestApi, res: ResponseApi, error: ErrorFn) => {
    const { projectId, login } = req.body;
    const project = await this.service.addUser(projectId, login);
    if (!project) {
      error({message: "This login is not existed", status: 404})
    } else {
      res.status(201).json(project);
    }
  };

  public removeUser = async (req: RequestApi, res: ResponseApi) => {
    const { userId, projectId } = req.body;
    const project = await this.service.removeUser(projectId, userId);
    res.status(201).json(project);
  };
}

export default ProjectController;
