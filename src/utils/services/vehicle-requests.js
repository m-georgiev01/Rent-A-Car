import axios from 'axios';

export const VehicleType = {
    ECONOMY: 'Economy',
    ESTATE: 'Estate',
    LUXURY: 'Luxury',
    SUV: 'SUV',
    CARGO: 'Cargo'
}

export const VehicleFuelType = {
    PETROL: 'Petrol',
    DIESEL: 'Diesel',
    HYBRID: 'Hybrid',
    ELECTRIC: 'Electric'
}

const apiUrl = 'http://localhost:3005/vehicles';

export function getAllVehicles(){
    return axios.get(apiUrl);
}

export function getVehicleById(id){
    return axios.get(`${apiUrl}/${id}`);
}

export function deleteVehicle(id){
    return axios.delete(`${apiUrl}/${id}`);
}

export function saveVehicle(vehicle){

    if (vehicle.id){
      return axios.put(`${apiUrl}/${vehicle.id}`, vehicle);
    }
    
    return axios.post(`${apiUrl}`, vehicle);
}