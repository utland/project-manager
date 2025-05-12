import IProject from "./project.model.i.js";

interface IUser {
  id: string;
  login: string;
  password: string;
  name: string;
  email: string;
  info: string;
  projects: IProject[];
  photoUrl: string;
}

export default IUser;
