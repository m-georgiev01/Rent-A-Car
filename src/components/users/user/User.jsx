import { useEffect, useState } from "react";
import { UserCard } from "../user-card/UserCard";
import { getUserById } from '../../../utils/services/user-requests';
import { getUserRentsById } from "../../../utils/services/rent-requests";
import { RentCard } from "../../rent/rent-card/RentCard";
import { useParams } from "react-router-dom";
import './User.scss';

export function User () {

    const [user, setUser] = useState({});
    const params = useParams();
    const [userRents, setUserRents] = useState([]);

    useEffect(() => {   
        getUserById(params.id).then((res) => setUser(res.data)); 
        getUserRentsById(params.id).then((response) => {
            setUserRents(response.data);
        });
      }, [params.id]);

    return (
        <div className="user">
            <UserCard user={user} isInDetails={true}/>
            <div className="user-rents-holder">
                { userRents.map(rent => <RentCard key={rent.id} rent={rent}/>)}
            </div>       
        </div>
    );
}