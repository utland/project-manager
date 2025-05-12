import UserService from "../service/user.service.js";
import Controller from "../common/controller.js";
import { UserModel } from "../../node_modules/.prisma/client/index.js";
import { injectable } from "tsyringe";
import jwt from "jsonwebtoken";
import IPayload from "../interfaces/payload.js";
import bcrypt from "bcrypt";
import { RequestApi } from "api-server";
import { ResponseApi } from "api-server";
import { ErrorFn } from "api-server";

@injectable()
class UserController extends Controller<UserService> {
  constructor(service: UserService) {
    super(service);
    this.router.post("/login", this.login);
    this.router.post("/register", this.register);
    this.router.post("/refresh", this.refresh);
  
    this.router.get("/", this.getUser);
    this.router.post("/update", this.updateUser);
    this.router.delete("/", this.deleteUser);
    this.router.post("/update-password", this.setNewPassword);
  
    this.router.post("/project", this.addProject);
    this.router.post("/project/remove", this.removeProject);
  }

  public register = async (req: RequestApi, res: ResponseApi, error: ErrorFn) => {
    const { login, name, password, email } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await this.service.createUser(login, name, hash, email);
    if (!user) {
      return error({message: "This login is already existed", status: 406, type: "login"})
    } else {
      res.status(201).json(user);
    }
  };

  public login = async (req: RequestApi, res: ResponseApi, error: ErrorFn) => {
    const { login, password } = req.body;
    if (!login || !password) return error({message: "Necessary input data is absent", status: 406})

    const user: UserModel | null = await this.service.auth(login);
    if (!user) return error({message: "Login is incorrect", status: 406, type: "login"})
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return error({message: "Password is wrong", status: 406, type: "password"})
    } else {
      const secretKey = process.env.SECRET_KEY as string;
      const accessToken = jwt.sign({ id: user.id, login }, secretKey, { expiresIn: "30m" });
      const refreshToken = jwt.sign({ id: user.id, login }, secretKey, { expiresIn: "1h" });

      const { password, ...others } = user;
      res
        .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 3600 * 1000 })
        .header("Access-Control-Expose-Headers", "Authorization")
        .header('Authorization', accessToken)
        .json(others);
    }
  };

  public refresh = async (req: RequestApi, res: ResponseApi, error: ErrorFn) => {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) return error({message: "Refresh token is not provided", status: 401})
    try {
      const secretKey = process.env.SECRET_KEY as string;
      const decoded = jwt.verify(refreshToken, secretKey) as IPayload;
      const {id, login} = decoded;
      const accessToken = jwt.sign({id, login}, secretKey, { expiresIn: "5m"});
  
      res.json({accessToken});
    } catch {
      return error({message: "Refresh token is expired", status: 401, type: "refresh"})
    }
  };

  public getUser = async (req: RequestApi, res: ResponseApi, error: ErrorFn) => {
    const { id } = res.locals.user;

    const user: UserModel | null = await this.service.getUser(id);
    if (!user) {
      return error({message: "User is not found", status: 404})
    } else {
      const { password, ...others } = user;
      res.status(200).json(others);
    }
  };

  public setNewPassword = async (req: RequestApi, res: ResponseApi) => {
    const { id } = res.locals.user;
    const {password} = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await this.service.setHash(id, hash);
    res.status(201).json(user);
  };

  public updateUser = async (req: RequestApi, res: ResponseApi) => {
    const { id, name, info, photoUrl } = req.body;
    const user = await this.service.updateUser(id, name, info, photoUrl);
    res.status(201).json(user);
  };

  public getAllUsers = async (req: RequestApi, res: ResponseApi) => {
    const users = await this.service.getUsers();
    res.status(200).json(users);
  };

  public deleteUser = async (req: RequestApi, res: ResponseApi) => {
    const { id } = req.query;
    const deleted = await this.service.deleteUser(id);
    res.status(201).json(deleted);
  };

  public addProject = async (req: RequestApi, res: ResponseApi) => {
    const { userId, projectId } = req.body;
    const user = await this.service.addProject(userId, projectId);
    res.status(201).json(user);
  };

  public removeProject = async (req: RequestApi, res: ResponseApi) => {
    const { userId, projectId } = req.body;
    const user = await this.service.removeProject(userId, projectId);
    res.status(201).json(user);
  };
}

export default UserController;
