import { injectable } from "tsyringe";
import { Status, TaskModel } from "../../node_modules/.prisma/client/index.js";
import Service from "../common/service.js";
import ProjectService from "./project.service.js";

@injectable()
class TaskService extends Service {
  constructor() {
    super();
  }

  async createTask(
    projectId: string,
    blockId: number | undefined,
    name: string,
  ): Promise<TaskModel> {
    const key = await ProjectService.getKey(this.prismaClient, projectId);
    const task = this.prismaClient.taskModel.create({
      data: {
        key,
        name,
        parentProject: {
          connect: { id: projectId },
        },
        ...(blockId && {
          parentBlock: {
            connect: { key: blockId },
          },
        }),
      },
    });

    return task;
  }

  async deleteTask(key: number, projectId: string): Promise<TaskModel> {
    const task = this.prismaClient.taskModel.delete({
      where: {
        key,
        projectId,
      },
    });

    return task;
  }

  async updateStatus(key: number, projectId: string, status: Status): Promise<TaskModel> {
    const task = this.prismaClient.taskModel.update({
      where: {
        key,
        projectId,
      },
      data: {
        status,
      },
    });

    return task;
  }

  async updateName(key: number, projectId: string, name: string): Promise<TaskModel> {
    const task = this.prismaClient.taskModel.update({
      where: {
        key,
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
