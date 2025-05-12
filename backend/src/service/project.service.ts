import Service from "../common/service.js";
import { PrismaClient, ProjectModel } from "../../node_modules/.prisma/client/index.js";
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
    const project = this.prismaClient.projectModel.create({
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
    const project = this.prismaClient.projectModel.update({
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
    const project = this.prismaClient.projectModel.update({
      where: { id: projectId },
      data: {
        invites: {
          disconnect: { id: userId}
        }
      }
    })

    return project
  }

  async getProject(id: string): Promise<ProjectModel | null> {
    const project = this.prismaClient.projectModel.findFirst({
      where: { id },
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

  async deleteProject(adminId: string, idProject: string): Promise<ProjectModel> {
    const project = this.prismaClient.projectModel.delete({
      where: {
        adminId,
        id: idProject,
      },
    });

    return project;
  }

  async updateProject(id: string, name: string, description: string): Promise<ProjectModel> {
    const project = this.prismaClient.projectModel.update({
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
    console.log("add user");
    const user = await this.prismaClient.userModel.findUnique({where: { login }, select: { id: true }});

    if (!user) return null;

    const project = this.prismaClient.projectModel.update({
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
    });

    return project;
  }

  async removeUser(idProject: string, idUser: string): Promise<ProjectModel> {
    const project = this.prismaClient.projectModel.update({
      where: {
        id: idProject,
      },
      data: {
        users: {
          disconnect: { id: idUser },
        },
      },
    });

    return project;
  }
}

export default ProjectService;
