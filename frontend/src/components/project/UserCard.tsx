import { useDispatch, useSelector } from 'react-redux';
import IUser from '../../interfaces/user.model.i';
import { IRootState, ThunkDispatch } from '../../interfaces/reduxDefault';
import { useState } from 'react';
import client from '../../api/client';
import { setUsers } from '../../redux/slices/projectSlice';
import { MdOutlineDeleteOutline } from 'react-icons/md';

interface IUserCardProps {
    userCard: IUser,
}

function UserCard({userCard}: IUserCardProps) {
    const {id, name, login, photoUrl} = userCard;

    const {user} = useSelector((state: IRootState) => state.user);
    const { project } = useSelector((state: IRootState) => state.project);
    const dispatch = useDispatch<ThunkDispatch>();
    const [img, setImg] = useState(photoUrl || "/avatar.png");
    
    const handleDelete = async () => {
        try {
            const {data} = await client.post("/project/user/remove", {
                projectId: project.id,
                userId: id
            });

            dispatch(setUsers(data.users))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="user-card">
            <div className="user-photo">
                <img src={img} className="user-photo" onError={() => setImg("/avatar.png")}/>
            </div>
            <div className="item-info">
              <p className="user-name">{name}</p>
              <p className="user-login">@{login}</p>
            </div>
            {user.id !== id && user.id === project.adminId ? 
            <MdOutlineDeleteOutline onClick={handleDelete} className='user-card-button'/> : ""}
        </div>
    );
};

export default UserCard;