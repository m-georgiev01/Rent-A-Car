import { useEffect, useState } from "react";
import { getVehicleById } from "../../../utils/services/vehicle-requests";
import { VehicleCard } from "../../vehicles/vehicle-card/VehicleCard";
import './RentCard.scss';

export function RentCard({ rent }) {
    const [vehicle, setVehicle] = useState({});

    useEffect(() => {
        getVehicleById(rent.vehicleId).then((response) => {
            setVehicle(response.data);
        });
    }, [rent.vehicleId]);

    return(
        <div className="rent-card-wrapper">
            <VehicleCard vehicle={vehicle} isInRentInfo={true}/>
            <div>
                <p className="key">Start date: </p>
                <p>{ `${rent.startDate}` }</p>
                <p className="key">End date: </p>
                <p>{ `${rent.endDate}` }</p>
                <p className="key">Total:</p>
                <p>{ `${rent.total}€` }</p>
            </div>
        </div>
    );
}