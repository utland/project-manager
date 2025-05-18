import UserController from "./controllers/user.controller.js";
import ProjectController from "./controllers/project.controller.js";
import BlockController from "./controllers/block.controller.js";
import TaskController from "./controllers/task.controller.js";
import SubtaskController from "./controllers/subtask.controller.js";
import { singleton } from "tsyringe";
import Controller from "./common/controller.js";
import Service from "./common/service.js";
import { validateToken}  from "./middleware/validateToken.js";
import {ServerAPI} from "api-server";
import AuthProxy from "./proxy/authProxy.js";
import setCorsWrapper from "./middleware/setCors.js";

@singleton()
class App {
  app: ServerAPI;
  proxy: AuthProxy;
  port: number;
  private controllers: Record<string, Controller<Service>>

  constructor(
    userController: UserController,
    projectController: ProjectController,
    blockController: BlockController,
    taskController: TaskController,
    subtaskController: SubtaskController,
  ) {
    this.app = new ServerAPI();
    this.proxy = new AuthProxy(this.app);
    this.port = 3000;
    this.controllers = {
      user: userController,
      project: projectController,
      block: blockController,
      task: taskController,
      subtask: subtaskController
    }
  }

  useMiddlewares() {
    this.app.use(setCorsWrapper("http://localhost:5173", true));
    this.app.use(validateToken);
  }

  useRouters() {
    for (const key in this.controllers) {
      this.app.useRouter(`/${key}`, this.controllers[key].router);
    }
  }

  async init(): Promise<void> {
    this.proxy.useCors("http://localhost:5173", true);
    this.useRouters();

    // this.app.listen(this.port, () => {
    //   console.log("Server started at " + this.port);
    // });

    this.proxy.listen(this.port, () => {
      console.log(`Server started at ${this.port}`);
    })
  }
}

export default App;
