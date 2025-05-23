import "reflect-metadata";
import dotenv from "dotenv";
import App from "./app.js";
import { container } from "tsyringe";
import PrismaService from "./service/prisma.service.js";

export const prisma = new PrismaService().prisma;

const bootstrap = async (): Promise<void> => {
  dotenv.config();
  const app = container.resolve(App);
  await app.init();
};

bootstrap();
