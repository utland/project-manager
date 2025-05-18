import IProject from "./project.model.i";
import IUser from "./user.model.i";

export const nullUser: IUser = {
  id: '',
  login: '',
  password: '',
  name: '',
  email: '',
  info: '',
  projects: [],
  photoUrl: ''
}

export const nullProject: IProject = {
    id: "",
    name: "",
    description: "",
    adminId: "",
    users: [],
    invites: [],
    blocks: [],
    tasks: [],
    globalKey: 0
}