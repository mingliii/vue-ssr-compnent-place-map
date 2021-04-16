import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/', // should be set based on env
});

export const getUsers = () => instance.get('/users');

export const fetchItem = () => instance.get('/users');

export const fetchPlaces = () => instance.get('/users');

