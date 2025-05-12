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
  const tokenKey = process.env.SECRET_KEY as string;

  try {
    const payload = jwt.verify(token, tokenKey) as IPayload;
    res.locals.user = payload;
    return ReturnType.OK;
  } catch {
    return errorHandler({message: "Token is incorrect", status: 402, type: "token"})
  }
};

export { validateToken };
