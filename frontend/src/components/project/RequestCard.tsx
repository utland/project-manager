import { useDispatch } from "react-redux";
import client from "../../api/client"
import IUser from "../../interfaces/user.model.i";
import { ThunkDispatch } from "../../interfaces/reduxDefault";
import { setInvites, setProject, setUsers } from "../../redux/slices/projectSlice";

interface IRequestProps {
    user: IUser,
    projectId: string
}

function RequestCard({user, projectId}: IRequestProps) {
  const {login, name, photoUrl} = user;

  const dispatch = useDispatch<ThunkDispatch>();

  const handlerAccept = async () => {
    try {
      const {data} = await client.post("/project/user", {
        projectId,
        login
      });
      
      dispatch(setInvites(data.invites));
      dispatch(setUsers(data.users));

    } catch (error) {
      console.log(error)
    }
  }

  const handlerReject = async () => {
    try {
      const {data} = await client.post("/project/remove", {
        projectId,
        login
      });
      dispatch(setInvites(data.invites));
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