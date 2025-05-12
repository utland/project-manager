import "reflect-metadata";
import dotenv from "dotenv";
import App from "./app.js";
import { container } from "tsyringe";

const bootstrap = async (): Promise<void> => {
  dotenv.config();
  const app = container.resolve(App);
  await app.init();
};

bootstrap();
