import Card  from 'react-bootstrap/Card';
import  Button  from 'react-bootstrap/Button';
import './UserCard.scss'
import { useNavigate} from 'react-router-dom';
import { getLoggedUser } from '../../../utils/services/user-requests';
 
export function UserCard ({ user, deleteUser, isInDetails}) {

    const loggedUser = getLoggedUser();
    const navigate = useNavigate();
    const redirectToDetails = () => {
        navigate(`/user/${user.id}`);
    }

    const redirectToEdit = () =>{
        navigate(`/user/edit/${user.id}`);
    }

    if(!user) {
        return <p>No user!</p>;
    }

    const renderAdminDbInfo = () => {
        if (user.isAdmin) {
            return <span className="value yes">Yes</span>
        }
        else {
            return <span className="value no">No</span>
        }
    }

    const renderVIPDbInfo = () => {
        if (user.isVIP) {
            return <span className="value yes">Yes</span>
        }
        else {
            return <span className="value no">No</span>
        }
    }

    return (
        <div className="user-card">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={ user.picture } />
                <Card.Body>
                    <Card.Title>{ user.name }</Card.Title>
                    <Card.Text>
                        <span className="key">Address: </span>
                        <span className="value">{ user.address }</span>
                    </Card.Text>

                    <Card.Text>
                        <span className="key">Email: </span>
                        <span className="value">{ user.email }</span>
                    </Card.Text>

                    <Card.Text>
                        <span className="key">Phone: </span>
                        <span className="value">{ user.phone }</span>
                    </Card.Text>

                    <Card.Text>
                        <span className="key">Admin: </span>
                        { renderAdminDbInfo() }
                    </Card.Text>

                    <Card.Text>
                        <span className="key">VIP: </span>
                        { renderVIPDbInfo() }
                    </Card.Text>


                    <div className="btn-holder">
                        { loggedUser.id === user.id || loggedUser.isAdmin ? <Button variant="primary" onClick={redirectToEdit}>Edit</Button> : '' }
                        { loggedUser.isAdmin && loggedUser.id !== user.id ? <Button variant="danger" onClick={() => deleteUser(user.id)} >Delete</Button> : '' }
                        { isInDetails === true  ? '' :<Button variant="info" onClick={redirectToDetails}>Details</Button> }
                    </div>
               </Card.Body>
            </Card>
        </div>
    )
}