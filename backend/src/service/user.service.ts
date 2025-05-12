import { UserModel } from "../../node_modules/.prisma/client/index.js";
import IUser from "../interfaces/user.model.i.js";
import Service from "../common/service.js";
import { nanoid } from "../../node_modules/nanoid/index.js";
import { injectable } from "tsyringe";

type deletedMany = { count: number };

@injectable()
class UserService extends Service {
  constructor() {
    super();
  }

  async createUser(
    login: string,
    name: string,
    password: string,
    email?: string,
  ): Promise<UserModel | null> {
    const existedUser = await this.prismaClient.userModel.findFirst({ where: { login } });
    if (existedUser) return null;

    const user = this.prismaClient.userModel.create({
      data: {
        id: nanoid(),
        login,
        name,
        password,
        email: email ?? "",
        info: "",
        projects: { create: [] },
      },
    });

    return user;
  }

  async auth(login: string): Promise<UserModel | null> {
    const user = this.prismaClient.userModel.findFirst({
      where: {
        login
      },
      include: {
        projects: {
          select: {
            id: true,
            name: true,
            description: true,
            users: {
              select: {
                photoUrl: true,
              },
            },
          },
        },
      },
    });

    return user;
  }

  async getUser(id: string): Promise<UserModel | null> {
    const user = this.prismaClient.userModel.findUnique({
      where: { id },
      include: {
        projects: {
          select: {
            id: true,
            name: true,
            description: true,
            users: {
              select: {
                photoUrl: true,
              },
            },
          },
        },
      },
    });

    return user;
  }

  async setHash(id: string, hash: string): Promise<UserModel> {
    const user = this.prismaClient.userModel.update({
      where: {
        id
      },
      data: {
        password: hash
      }
    })

    return user;
  }

  async updateUser(id: string, name: string, info: string, photoUrl: string): Promise<UserModel> {
    const user = this.prismaClient.userModel.update({
      where: {
        id,
      },
      data: {
        name,
        info,
        photoUrl,
      },
    });

    return user;
  }


  async getUsers(): Promise<UserModel[]> {
    const users = this.prismaClient.userModel.findMany();

    return users;
  }

  async deleteUser(id: string): Promise<deletedMany> {
    const deletedUser = this.prismaClient.userModel.deleteMany({
      where: {
        id,
      },
    });

    return deletedUser;
  }

  async addProject(idUser: string, idProject: string): Promise<UserModel> {
    const user = this.prismaClient.userModel.update({
      where: {
        id: idUser,
      },
      data: {
        projects: {
          connect: { id: idProject },
        },
      },
    });

    return user;
  }

  async removeProject(idUser: string, idProject: string): Promise<UserModel> {
    const user = this.prismaClient.userModel.update({
      where: {
        id: idUser,
      },
      data: {
        projects: {
          disconnect: { id: idProject },
        },
      },
    });

    return user;
  }
}

export default UserService;
