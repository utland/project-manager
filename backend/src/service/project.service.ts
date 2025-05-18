import Service from "../common/service.js";
import { PrismaClient, ProjectModel, UserModel } from "../../node_modules/.prisma/client/index.js";
import { nanoid } from "../../node_modules/nanoid/index.js";
import { injectable } from "tsyringe";

@injectable()
class ProjectService extends Service {
  constructor() {
    super();
  }

  static async getKey(prisma: PrismaClient, id: string): Promise<number> {
    const project = (await prisma.projectModel.findFirst({ where: { id } })) as ProjectModel;
    await prisma.projectModel.update({
      where: { id },
      data: {
        globalKey: { increment: 1 },
      },
    });

    return project.globalKey;
  }

  async createProject(name: string, description: string, adminId: string): Promise<ProjectModel> {
    const project = await this.prismaClient.projectModel.create({
      data: {
        id: nanoid(),
        name,
        description,
        adminId,
        blocks: { create: [] },
        tasks: { create: [] },
        users: {
          connect: { id: adminId },
        },
        invites: { create: [] }
      },
    });

    return project;
  }

  async addInvite(userId: string, projectId: string): Promise<ProjectModel | null> {
    const isExisted = await this.prismaClient.projectModel.findFirst({where: {id: projectId}});
    if (!isExisted) return null;

    const project = await this.prismaClient.projectModel.update({
      where: { id: projectId },
      data: {
        invites: {
          connect: {
            id: userId
          }
        }
      }
    })

    return project
  }

  async removeInvite(projectId: string, userId: string): Promise<ProjectModel> {
    const project = await this.prismaClient.projectModel.update({
      where: { id: projectId },
      data: {
        invites: {
          disconnect: { id: userId}
        }
      },
      include: {
        invites: true
      }
    })

    return project;
  }

  async getProject(projectId: string, userId: string): Promise<ProjectModel | null> {
    const project = await this.prismaClient.projectModel.findFirst({
      where: { 
        id: projectId,
        users: {
          some: {
            id: userId
          }
        }
      },
      include: {
        users: {
          select: {
            id: true,
            login: true,
            name: true,
            email: true,
            photoUrl: true,
          },
        },
        blocks: {
          include: {
            tasks: {
              include: {
                subtasks: true,
              },
            },
          },
        },
        tasks: {
          where: { blockId: null },
          include: {
            subtasks: true,
          },
        },
        invites: {
          select: {
            id: true,
            photoUrl: true,
            name: true,
            login: true
          }
        }
      },
    });

    return project;
  }

  async deleteProject(id: string): Promise<ProjectModel> {
    const project = await this.prismaClient.projectModel.delete({ where: { id } });

    return project;
  }

  async updateProject(id: string, name: string, description: string): Promise<ProjectModel> {
    const project = await this.prismaClient.projectModel.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });

    return project;
  }

  async addUser(projectId: string, login: string): Promise<ProjectModel | null> {
    const user = await this.prismaClient.userModel.findUnique({where: { login }, select: { id: true }});

    if (!user) return null;

    const project = await this.prismaClient.projectModel.update({
      where: {
        id: projectId,
      },
      data: {
        users: {
          connect: { id: user.id },
        },
        invites: {
          disconnect: { id: user.id }
        }
      },
      include: {
        users: true,
        invites: true
      }
    });

    return project;
  }

  async removeUser(idProject: string, idUser: string): Promise<ProjectModel> {
    const project = await this.prismaClient.projectModel.update({
      where: {
        id: idProject,
      },
      data: {
        users: {
          disconnect: { id: idUser },
        },
      },
      include: {
        users: true
      }
    });

    return project;
  }
}

export default ProjectService;
