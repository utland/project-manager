import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";
import jwt from "jsonwebtoken";
import setCorsWrapper from "../middleware/setCors.js";
import { RequestApi, ResponseApi, ReturnType, ServerAPI, transformParametrs } from "api-server";

type HandlerType = (httpReq: IncomingMessage, httpRes: ServerResponse) => void;

interface IPayload {
  login: string;
  id: string;
}

interface ICorsOptions {
  originUrl: string, 
  credentials: boolean
}

class AuthProxy {
  app: ServerAPI;
  corsOptions: ICorsOptions;

  constructor(app: ServerAPI) {
    this.app = app;
    this.corsOptions = {
      originUrl: "*",
      credentials: false
    }
  }

  listen(port: number, callback: () => void) {
    this.app.setListener(this.handler.bind(this));
    this.app.listen(port, callback);
  }

  useCors(originUrl: string, credentials: boolean) {
    this.corsOptions = {
      originUrl,
      credentials
    };
  }

  private handler(req: RequestApi, res: ResponseApi) {
    const {originUrl, credentials} = this.corsOptions;
    const reply = setCorsWrapper(originUrl, credentials)(req, res);
    if (reply !== ReturnType.OK) return;

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
      const accessToken = jwt.sign({id: decoded.id, login: decoded.login}, secretKey, {expiresIn: "30m"});
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

