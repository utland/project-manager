import { injectable } from "tsyringe";
import { SubtaskModel, Status } from "../../node_modules/.prisma/client/index.js";
import Service from "../common/service.js";
import ProjectService from "./project.service.js";

@injectable()
class SubtaskService extends Service {
  constructor() {
    super();
  }

  async createSubtask(projectId: string, taskId: number, name: string): Promise<SubtaskModel> {
    const key = await ProjectService.getKey(this.prismaClient, projectId);
    const subtask = this.prismaClient.subtaskModel.create({
      data: {
        key,
        name,
        projectId,
        parentTask: {
          connect: { key: taskId },
        },
      },
    });

    return subtask;
  }

  async deleteSubtask(key: number, projectId: string): Promise<SubtaskModel> {
    const subtask = this.prismaClient.subtaskModel.delete({
      where: {
        key,
        projectId,
      },
    });

    return subtask;
  }

  async updateStatus(key: number, projectId: string, status: Status): Promise<SubtaskModel> {
    const subtask = this.prismaClient.subtaskModel.update({
      where: {
        key,
        projectId,
      },
      data: {
        status,
      },
    });

    return subtask;
  }

  async updateSubtask(key: number, projectId: string, name: string): Promise<SubtaskModel> {
    const subtask = this.prismaClient.subtaskModel.update({
      where: {
        key,
        projectId,
      },
      data: {
        name,
      },
    });

    return subtask;
  }
}

export default SubtaskService;
