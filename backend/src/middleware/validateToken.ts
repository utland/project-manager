import jwt from "jsonwebtoken";
import IPayload from "../interfaces/payload.js";
import { RequestApi } from "api-server";
import { ResponseApi } from "api-server";
import { ErrorFn, ReturnType } from "api-server";


const validateToken = (req: RequestApi, res: ResponseApi, errorHandler: ErrorFn): ReturnType => {
  const authHeader = req.headers.authorization as string;

  if (req.path === "/user/login" || req.path === "/user/refresh" || req.path === "/user/register") return ReturnType.OK;
  if (!authHeader) {
    return errorHandler({message: "Token is not provided", status: 401})
  }

  const token = authHeader.split(" ")[1];
  const secretKey = process.env.SECRET_KEY as string;

  try {
    const payload = jwt.verify(token, secretKey) as IPayload;
    res.locals.user = payload;
    return ReturnType.OK;
  } catch {
    const refreshRes = refresh(req, res, secretKey);
    return refreshRes;
  }
};

const refresh = (req: RequestApi, res: ResponseApi, secretKey: string): ReturnType => {
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

export { validateToken };
