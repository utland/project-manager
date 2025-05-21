import { injectable } from "tsyringe";
import { Status, TaskModel } from "../../node_modules/.prisma/client/index.js";
import Service from "../common/service.js";
import ProjectService from "./project.service.js";

@injectable()
class TaskService extends Service {
  constructor() {
    super();
  }

  async createTask(projectId: string, blockId: number, name: string, id: string): Promise<TaskModel> {
    const key = await ProjectService.getKey(this.prismaClient, projectId);
    const task = this.prismaClient.taskModel.create({
      data: {
        key,
        name,
        parentProject: {connect: { id: projectId }},
        subtasks: {create: []},
        ...(id && {user: {connect: {id}}}),
        ...(blockId && {
          parentBlock: { connect: { id: blockId } }
        })
      },
      include: {
        subtasks: true,
        user: {
          select: {
            id: true,
            photoUrl: true,
            login: true,
            name: true
          }
        }
      }
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
    if (status === Status.Done) {
      await this.prismaClient.subtaskModel.updateMany({where: {taskId: id}, data: {status}})
    }

    const task = await this.prismaClient.taskModel.update({
      where: {
        id,
        projectId,
      },
      data: {
        status,
      },
      include: {
        subtasks: true
      }
    });


    return task;
  }

  async updateTask(id: number, projectId: string, name: string, userId: string): Promise<TaskModel> {
    const task = this.prismaClient.taskModel.update({
      where: {
        id,
        projectId,
      },
      data: {
        name,
        user: {
          connect: {id: userId}
        }
      },
      include: {
        subtasks: true,
        user: {
          select: {
            id: true,
            photoUrl: true,
            login: true,
            name: true
          }
        }
      }
    });

    return task;
  }
}

export default TaskService;
