import { injectable } from "tsyringe";
import { Status, TaskModel } from "../../node_modules/.prisma/client/index.js";
import Service from "../common/service.js";
import ProjectService from "./project.service.js";

@injectable()
class TaskService extends Service {
  constructor() {
    super();
  }

  async createTask(projectId: string, blockId: number, name: string): Promise<TaskModel> {
    const key = await ProjectService.getKey(this.prismaClient, projectId);
    const task = this.prismaClient.taskModel.create({
      data: {
        key,
        name,
        parentProject: {
          connect: { id: projectId },
        },
        ...(blockId && {
          parentBlock: { connect: { id: blockId } }
        })
      },
    });

    return task;
  }

  async deleteTask(id: number, projectId: string): Promise<TaskModel> {
    const task = this.prismaClient.taskModel.delete({
      where: {
        id,
        projectId,
      },
    });

    return task;
  }

  async updateStatus(id: number, projectId: string, status: Status): Promise<TaskModel> {
    const task = this.prismaClient.taskModel.update({
      where: {
        id,
        projectId,
      },
      data: {
        status,
      },
    });

    return task;
  }

  async updateName(id: number, projectId: string, name: string): Promise<TaskModel> {
    const task = this.prismaClient.taskModel.update({
      where: {
        id,
        projectId,
      },
      data: {
        name,
      },
    });

    return task;
  }
}

export default TaskService;
