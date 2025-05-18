import { useDispatch, useSelector } from 'react-redux';
import IUser from '../../interfaces/user.model.i';
import { IRootState, ThunkDispatch } from '../../interfaces/reduxDefault';
import { useState } from 'react';
import client from '../../api/client';
import { setUsers } from '../../redux/slices/projectSlice';

interface IUserCardProps {
    userCard: IUser,
}

function UserCard({userCard}: IUserCardProps) {
    const {id, name, login, photoUrl} = userCard;

    const {user} = useSelector((state: IRootState) => state.user);
    const { project } = useSelector((state: IRootState) => state.project);
    const dispatch = useDispatch<ThunkDispatch>();
    const [miniModal, setMiniModal] = useState<boolean>(false);
    
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
            {miniModal ? 
            <div className="mini-modal">
                <button name='delete' onClick={handleDelete}>Delete</button>
            </div> : ""}
            <div className="user-photo">
                <img src={photoUrl ? photoUrl : "/avatar.png"} className="user-photo" />
            </div>
            <div className="item-info">
              <p className="user-name">{name}</p>
              <p className="user-login">@{login}</p>
            </div>
            {user.id !== id ? <button className='user-card-button' onClick={() => setMiniModal(!miniModal)}>︙</button> : ""}
        </div>
    );
};

export default UserCard;