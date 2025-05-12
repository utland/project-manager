import { PrismaClient } from "../../node_modules/.prisma/client/index.js";

class PrismaService {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
    this.prisma.$connect();
  }
}

export default PrismaService;
