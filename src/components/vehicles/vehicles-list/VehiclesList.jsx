import { useEffect, useState } from "react";
import { getLoggedUser } from "../../../utils/services/user-requests";
import { deleteVehicle, getAllVehicles } from '../../../utils/services/vehicle-requests';
import { VehicleCard } from "../vehicle-card/VehicleCard";
import './VehiclesList.scss';

export function VehiclesList() {

    const loggedUser = getLoggedUser();
    const [vehicles, setVehicles] = useState([]);
    const countUnavailable = vehicles.filter(vehicle => vehicle.count === '0' || vehicle.count === '').length;

    useEffect(() => {
        getAllVehicles().then((response) => {
            setVehicles(response.data);
        });
    }, []);

    const deleteVehicleHandler = async(id) => {
        await deleteVehicle(id);
        setVehicles(prevState => {
            return prevState.filter(vehicle => vehicle.id !== id);
        });
    }

    return(
        <div>
            <h2>Currently available vehicles:</h2>
            <div className="vehicles-list-wrapper">      
                { vehicles.filter(vehicle => vehicle.count > 0).map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} deleteVehicle={deleteVehicleHandler} />)}
           </div>

            {
                loggedUser.isAdmin && countUnavailable > 0 ?
                <div>
                    <h2>Unavailable vehicles:</h2>                    
                    <div className="vehicles-list-wrapper">  
                        { vehicles.filter(vehicle => vehicle.count === '0' || vehicle.count === '').map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} deleteVehicle={deleteVehicleHandler} />)}
                    </div>
                </div> : ''
            }
        </div>      
    );
}