import { injectable } from "tsyringe";
import { SubtaskModel, Status } from "../../node_modules/.prisma/client/index.js";
import Service from "../common/service.js";
import ProjectService from "./project.service.js";

@injectable()
class SubtaskService extends Service {
  constructor() {
    super();
  }

  async createSubtask(name: string, projectId: string, taskId: number, blockId: number): Promise<SubtaskModel> {
    const key = await ProjectService.getKey(this.prismaClient, projectId);
    const subtask = this.prismaClient.subtaskModel.create({
      data: {
        key,
        name,
        projectId,
        parentTask: {
          connect: { id: taskId },
        },
        ...(blockId && {blockId})
      },
    });

    return subtask;
  }

  async deleteSubtask(id: number, projectId: string): Promise<SubtaskModel> {
    const subtask = this.prismaClient.subtaskModel.delete({
      where: {
        id,
        projectId,
      },
    });

    return subtask;
  }

  async updateStatus(id: number, projectId: string, status: Status): Promise<SubtaskModel> {
    const subtask = this.prismaClient.subtaskModel.update({
      where: {
        id,
        projectId,
      },
      data: {
        status,
      },
    });

    return subtask;
  }

  async updateSubtask(id: number, projectId: string, name: string): Promise<SubtaskModel> {
    const subtask = this.prismaClient.subtaskModel.update({
      where: {
        id,
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
