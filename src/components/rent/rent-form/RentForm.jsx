import { useEffect, useState } from 'react';
import Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { checkVIP, getLoggedUser } from '../../../utils/services/user-requests';
import { getVehicleById, saveVehicle } from '../../../utils/services/vehicle-requests';
import { VehicleCard } from '../../vehicles/vehicle-card/VehicleCard';
import './RentForm.scss';
import { saveRent } from '../../../utils/services/rent-requests';

export function RentForm() {

    const navigate = useNavigate();
    let currentDate = new Date().toJSON().slice(0, 10);
    const loggedUser = getLoggedUser();
    const params = useParams();
    const [vehicle, setVehicle] = useState({});
    const [rent, setRent] = useState({
        userId: loggedUser.id,
        vehicleId: '',
        startDate: '',
        endDate: '',
        total: 0
    });

    useEffect(() => {
        getVehicleById(params.id).then((response) => {
            setVehicle(response.data);
        });
    }, [params.id]);

    function datediff(first, second) {        
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }

    function findDiscount(days){
        if(days > 10){
            return 0.9;
        }else if(days > 5){
            return 0.93;
        }else if(days > 3){
            return 0.95;
        }

        return 1;
    }

    const onInputChange = (event) => {
        let currentName = event.target.name;
        let currentValue = event.target.value;

        setRent((prevState) => ({
            ...prevState,
            [currentName]: currentValue,
            vehicleId: vehicle.id
        }));

        setRent((prevState) => {
            
            checkVIP(loggedUser);
            let totalCost = prevState.total;

            if((currentName === 'startDate' || currentName === 'endDate')
              && prevState.startDate && prevState.endDate){

                let diffInDays = datediff(new Date(prevState.startDate), new Date(prevState.endDate));
                if(diffInDays === 0){
                    diffInDays = 1;
                }

                let discount = findDiscount(diffInDays);

                if(loggedUser.isVIP){
                    discount = (discount - 0.15).toFixed(2);
                }

                totalCost = parseFloat(vehicle.pricePerDay * diffInDays * discount).toFixed(2);
            }

            return {
                ...prevState,
                total:totalCost
            };
        })
        
    }

    const onRentSubmit = (event) => {
        event.preventDefault();
        vehicle.count--;

        saveVehicle(vehicle).then(() =>{
            saveRent(rent).then(() => {
                navigate('/vehicles-list');
            });
        });
    }

    return (
        <div>
            <h2>Rent info</h2>
            <div className='rent-form-wrapper'>
                <VehicleCard vehicle={vehicle} isInRentInfo={true}/>         
                <Form onSubmit={onRentSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicBrand">
                        <Form.Label>Start date:</Form.Label>
                        <Form.Control type="date" name='startDate'  min={currentDate} onChange={onInputChange} required/>
                    </Form.Group>

                    {
                        rent.startDate &&
                        <Form.Group className="mb-3" controlId="formBasicBrand">
                            <Form.Label>End date:</Form.Label>
                            <Form.Control type="date" name='endDate'  min={rent.startDate} onChange={onInputChange} required/>
                        </Form.Group>
                    }

                    <Form.Group className="mb-3 total-wrapper" controlId="formBasicBrand">
                        <Form.Label className='totalLabel'>Total price:</Form.Label>
                        <p>{`${rent.total}€`}</p>
                    </Form.Group>

                    <Button variant="dark" type="submit"> Rent </Button>
                </Form>

                
            </div>
        </div>       
    );
}