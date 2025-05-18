import "reflect-metadata";
import dotenv from "dotenv";
import App from "./app.js";
import { container } from "tsyringe";
import PrismaService from "./service/prisma.service.js";
import CacheMap from "./utils/cacheMap.js";

export const cachedMap = new CacheMap(60000);
export const prisma = new PrismaService().prisma;

const bootstrap = async (): Promise<void> => {
  dotenv.config();
  const app = container.resolve(App);
  await app.init();
};

bootstrap();
