import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getVehicleById, saveVehicle, VehicleFuelType, VehicleType } from '../../../utils/services/vehicle-requests';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './VehicleForm.scss';

export function VehicleForm() {
    const navigate = useNavigate();
    const params = useParams();

    const [vehicle, setVehicle] = useState({
        vehicleType: '',
        brand: '',
        model: '',
        constructionYear: '',
        fuelType: '',
        seats: '',
        picture: '',
        pricePerDay: '',
        count: ''
    });

    useEffect(() => {
        if(params.id){
            getVehicleById(params.id).then((response) =>{
                setVehicle(response.data);
            })
        }
    }, [params.id]);

    const onInputChange = (event) => {
        setVehicle((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onVehicleSubmit = (event) => {
        event.preventDefault();

        saveVehicle(vehicle).then(() => {
            navigate('/vehicles-list');
        });
    }

    return (
        <div className="vehicle-form-wrapper">
             <Form onSubmit={onVehicleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicBrand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" placeholder="Enter brand" name='brand' value={vehicle.brand} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicModel">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" placeholder="Enter model" name='model' value={vehicle.model} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicVehicleType">
                    <Form.Label>Vehicle type</Form.Label>
                    <Form.Select placeholder="Select vehicle type" name='vehicleType' value={vehicle.vehicleType} onChange={onInputChange}>
                        {Object.keys(VehicleType).map(vT => <option key={vT} value={VehicleType[vT]}>{VehicleType[vT]}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="number" placeholder="Enter construction year" name='constructionYear'  min="1980" max="2022" value={vehicle.constructionYear} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicVehicleFuelType">
                    <Form.Label>Fuel type</Form.Label>
                    <Form.Select placeholder="Select fuel type" name='fuelType' value={vehicle.fuelType} onChange={onInputChange}>
                        {Object.keys(VehicleFuelType).map(vFT => <option key={vFT} value={VehicleFuelType[vFT]}>{VehicleFuelType[vFT]}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSeats">
                    <Form.Label>Number of seats</Form.Label>
                    <Form.Control type="number" placeholder="Enter the number of seats" name='seats'  min="1" max="15" value={vehicle.seats} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPicture">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="text" placeholder="Enter picture url" name="picture" value={vehicle.picture} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPPD">
                    <Form.Label>Price per day</Form.Label>
                    <Form.Control type="number" placeholder="Enter price per day" name='pricePerDay'  min="1" step="any" value={vehicle.pricePerDay} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCount">
                    <Form.Label>Count</Form.Label>
                    <Form.Control type="number" placeholder="Enter count" name='count'  min="0" value={vehicle.count} onChange={onInputChange} required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    {vehicle.id ? 'Edit Vehicle' : 'Create Vehicle'}
                </Button>
             </Form>
        </div>
    );
}