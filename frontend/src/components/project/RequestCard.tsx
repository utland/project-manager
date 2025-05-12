import client from "../../api/client"
import IProject from "../../interfaces/project.model.i";
import IUser from "../../interfaces/user.model.i";

interface IRequestProps {
    user: IUser,
    setProject: (project: IProject) => void,
    projectId: string
}

function RequestCard({user, setProject, projectId}: IRequestProps) {
  const {login, name, photoUrl} = user;
  const handlerAccept = async () => {
    try {
      const project = await client.post("/project/user", {
        projectId,
        login
      });
      setProject(project.data);
    } catch (error) {
      console.log(error)
    }
  }

  const handlerReject = async () => {
    try {
      const project = await client.post("/project/remove", {
        projectId,
        login
      });
      setProject(project.data);
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <div className="request-item">
      <img src={photoUrl} alt="Фото пользователя" className="user-photo" />
      <div className="item-info">
        <p className="user-name">{name}</p>
        <p className="user-login">@{login}</p>
      </div>
      <div className="action-buttons">
        <button className="accept" onClick={handlerAccept}>✔</button>
        <button className="reject" onClick={handlerReject}>✖</button>
      </div>
    </div>
  )
}

export default RequestCard;