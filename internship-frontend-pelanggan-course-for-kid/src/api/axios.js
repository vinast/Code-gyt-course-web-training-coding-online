import axios from "axios";
const instance = axios.create({
    baseURL:'http://localhost:5000',
    // baseURL:'https://pure-tundra-56047.herokuapp.com',
    withCredentials: true,
});

export default instance;