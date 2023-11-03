import axios from "axios";

export default axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers: {
        'accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
})