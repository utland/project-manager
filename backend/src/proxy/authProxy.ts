import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";
import jwt from "jsonwebtoken";
import { IServerAPI, RequestApi, ResponseApi, ReturnType, Router, ServerAPI, transformParametrs } from "api-server";
import { IMiddleware } from "../../../../api-server/dist/interfaces/handler.i.js";

interface IPayload {
  login: string;
  id: string;
}

class AuthProxy implements IServerAPI {
  app: ServerAPI;

  constructor(app: ServerAPI) {
    this.app = app;
  }

  setCors(originUrl: string, credentials: boolean) {
    this.app.corsOptions = {originUrl, credentials};
  };

  listen(port: number, callback: () => void) {
    this.app.setListener(this.handler.bind(this));
    this.app.listen(port, callback);
  }

  useRouter(path: string, router: Router): void {
    this.app.useRouter(path, router);
  }

  use(callback: IMiddleware) {
    this.app.middlewares.push(callback);
  }

  handler(req: RequestApi, res: ResponseApi) {
    const authHeader = req.headers.authorization as string;

    if (req.path === "/user/login" || req.path === "/user/register") {
      return this.app.handler(req, res);
    }

    if (!authHeader) {
      return res.json({message: "Token is not provided", status: 401});
    }
    
    const token = authHeader.split(" ")[1];
    const secretKey = process.env.SECRET_KEY as string;
    
    try {
      const payload = jwt.verify(token, secretKey) as IPayload;
      res.locals.user = payload;
    } catch {
      const refreshRes = this.refresh(req, res, secretKey);
      if (refreshRes === ReturnType.ERROR) return;
    }

    this.app.handler(req, res);
  }

  private refresh(req: RequestApi, res: ResponseApi, secretKey: string): ReturnType {
    try {
      const refreshToken = req.cookies['refreshToken'];
      const decoded = jwt.verify(refreshToken, secretKey) as IPayload;
      const accessToken = jwt.sign({id: decoded.id, login: decoded.login}, secretKey, {expiresIn: "5m"});
      res.locals.user = decoded;
      
      res.header("Access-Control-Expose-Headers", "Authorization").header('Authorization', accessToken);
      return ReturnType.OK;
    } catch (error) {
      res.status(401).json({message: "Refresh token is expired", status: 401, type: "token"});
      return ReturnType.ERROR;
    }
  }
}

export default AuthProxy;

