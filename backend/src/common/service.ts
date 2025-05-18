import { PrismaClient } from "../../node_modules/.prisma/client/index.js";
import { prisma } from "../main.js";
import PrismaService from "../service/prisma.service.js";

abstract class Service {
  prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = prisma;
  }
}

export default Service;
