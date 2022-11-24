import Card  from 'react-bootstrap/Card';
import  Button  from 'react-bootstrap/Button';
import './VehicleCard.scss'
import { getLoggedUser } from '../../../utils/services/user-requests';
import { useNavigate } from 'react-router-dom';

export function VehicleCard ({ vehicle, deleteVehicle }) {

    const loggedUser = getLoggedUser();
    const navigate = useNavigate();

    if(!vehicle) {
        return <p>No vehicle!</p>;
    }

    const redirectToEdit = () =>{
        navigate(`/vehicle/edit/${vehicle.id}`);
    }

    return (
        <div className="vehicle-card">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={ vehicle.picture } />
                <Card.Body>
                    <Card.Title className='title'>{ `${vehicle.brand} ${vehicle.model}`}</Card.Title>
                    <Card.Text>
                        <span className="key">Type: </span>
                        <span className="value">{ vehicle.vehicleType }</span>
                    </Card.Text>

                    <Card.Text>
                        <span className="key">Year: </span>
                        <span className="value">{ vehicle.constructionYear }</span>
                    </Card.Text>

                    <Card.Text>
                        <span className="key">Fuel: </span>
                        <span className="value">{ vehicle.fuelType }</span>
                    </Card.Text>

                    <Card.Text>
                        <span className="key">Seats: </span>
                        <span className="value">{ vehicle.seats }</span>
                    </Card.Text>

                    <Card.Text>
                        <span className="key">Price per day: </span>
                        <span className="value">{ `${vehicle.pricePerDay}€` }</span>
                    </Card.Text>

                    <Card.Text>
                        <span className="key">Currently available: </span>
                        <span className="value">{ vehicle.count }</span>
                    </Card.Text>

                    <div className="btn-holder">
                        { loggedUser.isAdmin ? <Button variant="primary" onClick={redirectToEdit}>Edit</Button> : '' } 
                        { loggedUser.isAdmin ? <Button variant="danger" onClick={() => deleteVehicle(vehicle.id)}>Delete</Button> : ''}
                        <Button variant="dark">Rent</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}