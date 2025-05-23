import { RequestApi } from "api-server";
import { ResponseApi } from "api-server";
import Controller from "../common/controller.js";
import BlockService from "../service/block.service.js";
import { injectable } from "tsyringe";
import getStatus from "../utils/getStatus.js";

@injectable()
class BlockController extends Controller<BlockService> {
  constructor(service: BlockService) {
    super(service);
    this.router.post("/", this.create);
    this.router.post("/delete", this.delete);
    this.router.post("/update", this.update);
    this.router.post("/status", this.updateStatus);
  }

  public create = async (req: RequestApi, res: ResponseApi) => {
    const { projectId, description, name} = req.body;
    const block = await this.service.createBlock(projectId, name, description);
    res.status(201).json(block);
  };

  public delete = async (req: RequestApi, res: ResponseApi) => {
    const { id, projectId } = req.body;
    const deleted = await this.service.deleteBlock(id, projectId);
    res.status(201).json(deleted);
  };

  public update = async (req: RequestApi, res: ResponseApi) => {
    const { id, projectId, name, description} = req.body;
    const updated = await this.service.updateBlock(id, projectId, name, description);
    res.status(201).json(updated);
  };

  public updateStatus = async (req: RequestApi, res: ResponseApi) => {
    const { id, projectId, status } = req.body;
    const statusEnum = getStatus(status);
    const updated = await this.service.updateStatus(id, projectId, statusEnum);
    res.status(201).json(updated);
  };
}

export default BlockController;
