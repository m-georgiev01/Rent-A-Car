import axios from "axios";

const apiUrl = 'http://localhost:3005/rents';

export function saveRent(rent){ 
    
    return axios.post(`${apiUrl}`, rent);
}

export async function getUserRentsById(userId){
    return axios.get(`${apiUrl}?userId=${userId}`);
}