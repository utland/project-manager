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
        parentProject: {
          connect: { id: projectId },
        },
      },
    });

    return block;
  }

  async deleteBlock(key: number, projectId: string): Promise<BlockModel> {
    const block = this.prismaClient.blockModel.delete({
      where: {
        key,
        projectId,
      },
    });

    return block;
  }

  async updateStatus(key: number, projectId: string, status: Status): Promise<BlockModel> {
    const block = this.prismaClient.blockModel.update({
      where: {
        key,
        projectId,
      },
      data: {
        status,
      },
    });

    return block;
  }

  async updateBlock(
    key: number,
    projectId: string,
    name: string,
    description: string,
  ): Promise<BlockModel> {
    const block = this.prismaClient.blockModel.update({
      where: {
        key,
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
