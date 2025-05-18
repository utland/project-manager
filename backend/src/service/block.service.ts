import { injectable } from "tsyringe";
import { BlockModel, Status } from "../../node_modules/.prisma/client/index.js";
import Service from "../common/service.js";
import ProjectService from "./project.service.js";

@injectable()
class BlockService extends Service {
  constructor() {
    super();
  }

  async createBlock(projectId: string, name: string, description: string): Promise<BlockModel> {
    const key = await ProjectService.getKey(this.prismaClient, projectId);
    const block = this.prismaClient.blockModel.create({
      data: {
        key,
        name,
        description,
        tasks: { create: [] },
        parentProject: {
          connect: { id: projectId },
        },
      },
      include: {
        tasks: true
      }
    });

    return block;
  }

  async deleteBlock(id: number, projectId: string): Promise<BlockModel> {
    const block = this.prismaClient.blockModel.delete({
      where: {
        id,
        projectId,
      },
    });

    return block;
  }

  async updateStatus(id: number, projectId: string, status: Status): Promise<BlockModel> {
    const block = this.prismaClient.blockModel.update({
      where: {
        id,
        projectId,
      },
      data: {
        status,
      },
    });

    return block;
  }

  async updateBlock(
    id: number,
    projectId: string,
    name: string,
    description: string,
  ): Promise<BlockModel> {
    const block = this.prismaClient.blockModel.update({
      where: {
        id,
        projectId,
      },
      data: {
        name,
        description,
      },
    });

    return block;
  }
}

export default BlockService;
