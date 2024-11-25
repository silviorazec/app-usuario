import axios from 'axios';

// Base URL para a API
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_FACT_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;
