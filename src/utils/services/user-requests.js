import axios from 'axios';
import { getUserRentsById } from './rent-requests';

const apiUrl = 'http://localhost:3005/users';
const loggedUserKey = 'loggedUser';

export function getLoggedUser() {
    return JSON.parse(localStorage.getItem(loggedUserKey));
}

export async function logout() {
    localStorage.removeItem(loggedUserKey);
}

export function getAllUsers() {
    return axios.get(apiUrl);
}

export function getUserById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export function deleteUser(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

export async function saveUser(user){

    if (!user.picture) {
        user.picture = `https://picsum.photos/200/300?random=${Math.random()}`
    }

    const response = await getAllUsers();
    const users = response.data;
    const existingUser = users.find(u => u.email === user.email && u.id !== user.id);

    if (existingUser) {
        throw new Error('Email already taken.');
    }

    if (user.id) {
        return axios.put(`${apiUrl}/${user.id}`, user);
    }

    return axios.post(`${apiUrl}`, user);
}

export async function registerUser(user) {

    const response = await getAllUsers();
    const users = response.data;
    const existingUser = users.find(u => u.email === user.email && u.id !== user.id);

    if (existingUser) {
        throw new Error('Email already taken.');
    }

    return saveUser(user);
}

export async function login(user) {
    const allUsers = (await getAllUsers()).data;

    const foundUser = allUsers.find(u => u.email === user.email && u.password === user.password);

    if(!foundUser) {
        throw new Error('Invalid username or password');
    }

    localStorage.setItem(loggedUserKey, JSON.stringify(foundUser));

    return foundUser;
}

export async function checkVIP (user){

    const today = new Date();
    const daysAgo = new Date(today.getTime());
    daysAgo.setDate(today.getDate() - 60);

    const userRents = (await getUserRentsById(user.id)).data;

    const userRentsLast60days = userRents.filter((rent) =>
        new Date(rent.startDate) >= daysAgo &&
        new Date(rent.endDate) <= new Date()
        );

        if(userRentsLast60days.length >= 3){
            user.isVIP = true;
        }else {
            user.isVIP = false;
        }
    await saveUser(user);
    logout();
    localStorage.setItem(loggedUserKey, JSON.stringify(user));
}