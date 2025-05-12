import { PrismaClient } from "../../node_modules/.prisma/client/index.js";
import PrismaService from "../service/prisma.service.js";

abstract class Service {
  prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaService().prisma;
  }
}

export default Service;
