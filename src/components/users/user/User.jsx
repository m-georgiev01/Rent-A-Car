import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { UserCard } from "../user-card/UserCard";
import { getUserById } from '../../../utils/services/user-requests';

export function User () {

    const params = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserById(params.id).then((res) => setUser(res.data));
      }, [params.id]);

    return (
        <div className="user">
            <UserCard user={user}/>
        </div>
    );
}