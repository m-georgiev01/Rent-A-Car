import { useEffect, useState } from "react";
import { UserCard } from "../user-card/UserCard";
import { getAllUsers, deleteUser } from '../../../utils/services/user-requests';
import './UsersList.scss';

export function UsersList () {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then((response) => {
          setUsers(response.data);
        });
      }, []);

      const deleteUserHandler = async(id) => {
        await deleteUser(id);
        setUsers(prevState => {
            return prevState.filter(user => user.id !== id);
        });
    }

    return (
        <div className="users-list-wrapper">
            { users.map(user => <UserCard key={user.id} user={user} deleteUser={deleteUserHandler} />)}
        </div>
    );
}